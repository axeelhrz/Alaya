#!/usr/bin/env python3
"""Knock out studio black from official Roberts PNGs and heal edge color."""

from __future__ import annotations

import time
from collections import defaultdict
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ASSETS = Path("/Users/axelhernandez/.cursor/projects/Users-axelhernandez-Alaya/assets")
CATALOG = Path(__file__).resolve().parents[1] / "public/images/boards/roberts/catalog"


def find_src(origs: dict[str, list], uid: str, w: int, h: int, kind: str) -> Path | None:
    cands = origs.get(uid, [])
    if kind == "composite":
        pool = [c for c in cands if c[0] >= 600]
    else:
        close = [c for c in cands if abs(c[0] - w) <= 3 and abs(c[1] - h) <= 3 and c[0] < 600]
        pool = close or [c for c in cands if c[0] < 600]
        if kind == "front" and pool:
            maxw = max(c[0] for c in pool)
            pool = [c for c in pool if c[0] == maxw]
        elif kind == "back" and pool:
            minw = min(c[0] for c in pool)
            pool = [c for c in pool if c[0] == minw]
    if not pool:
        return None
    pool.sort(key=lambda c: c[2], reverse=True)
    return pool[0][3]


def _expand_run(mx_row, ch_row, x0: int, x1: int, w: int, max_step: int = 16):
    L = x0
    for _ in range(max_step):
        if L <= 0:
            break
        pmx, pch = float(mx_row[L - 1]), float(ch_row[L - 1])
        if pmx <= 10 and pch <= 6:
            break
        if pch >= 8 or pmx >= 14:
            L -= 1
            continue
        break
    R = x1
    for _ in range(max_step):
        if R >= w:
            break
        pmx, pch = float(mx_row[R]), float(ch_row[R])
        if pmx <= 10 and pch <= 6:
            break
        if pch >= 8 or pmx >= 14:
            R += 1
            continue
        break
    return L, R


def _smooth_span(arr: np.ndarray, valid: np.ndarray, radius: int = 12) -> np.ndarray:
    out = arr.astype(np.float64)
    n = len(arr)
    for i in range(n):
        if not valid[i]:
            continue
        i0, i1 = max(0, i - radius), min(n, i + radius + 1)
        vals = arr[i0:i1][valid[i0:i1]]
        if vals.size:
            out[i] = vals.mean()
    return np.rint(out).astype(np.int32)


def _interp_spans(L: np.ndarray, R: np.ndarray) -> None:
    valid = np.where(L >= 0)[0]
    for i in range(len(valid) - 1):
        y0, y1 = int(valid[i]), int(valid[i + 1])
        if y1 - y0 <= 1:
            continue
        for y in range(y0 + 1, y1):
            t = (y - y0) / (y1 - y0)
            L[y] = int(round(L[y0] * (1 - t) + L[y1] * t))
            R[y] = int(round(R[y0] * (1 - t) + R[y1] * t))


def knockout(rgb: np.ndarray) -> Image.Image:
    """Cut from paint/core; drop studio fringe. No soft black halo."""
    h, w = rgb.shape[:2]
    rf = rgb[:, :, 0].astype(np.float32)
    gf = rgb[:, :, 1].astype(np.float32)
    bf = rgb[:, :, 2].astype(np.float32)
    mx = np.maximum(np.maximum(rf, gf), bf)
    mn = np.minimum(np.minimum(rf, gf), bf)
    chroma = mx - mn
    seed = (mx >= 40) | (chroma >= 18)

    keep = np.zeros((h, w), dtype=bool)
    L = np.full(h, -1)
    R = np.full(h, -1)
    for y in range(h):
        xs = np.where(seed[y])[0]
        if xs.size == 0:
            continue
        l, r = _expand_run(mx[y], chroma[y], int(xs[0]), int(xs[-1]) + 1, w)
        L[y], R[y] = l, r
    _interp_spans(L, R)
    valid = L >= 0
    L = _smooth_span(L, valid)
    R = _smooth_span(R, valid)
    for y in range(h):
        if L[y] >= 0 and R[y] > L[y]:
            keep[y, L[y] : R[y]] = True

    # Swallow tips only — never split the body (chevron / stringer lines).
    tail0 = int(h * 0.86)
    two = 0
    for y in range(tail0, h):
        xs = np.where(seed[y])[0]
        if xs.size >= 2 and np.sum(np.diff(xs) > 6) >= 1:
            two += 1
    if two > 5:
        for y in range(tail0, h):
            xs = np.where(seed[y])[0]
            if xs.size == 0:
                continue
            breaks = np.where(np.diff(xs) > 6)[0]
            if breaks.size == 0:
                continue
            starts = np.r_[0, breaks + 1]
            ends = np.r_[breaks + 1, xs.size]
            keep[y, :] = False
            for s, e in zip(starts, ends):
                l, r = _expand_run(mx[y], chroma[y], int(xs[s]), int(xs[e - 1]) + 1, w)
                keep[y, l:r] = True

    field = np.pad(np.where(keep, 0, 255).astype(np.uint8), 1, constant_values=255)
    fim = Image.fromarray(field).convert("L")
    ImageDraw.floodfill(fim, (0, 0), 64)
    keep = np.asarray(fim)[1:-1, 1:-1] != 64

    def _outer_ring(mask: np.ndarray) -> np.ndarray:
        trans = ~mask
        edge = np.zeros_like(mask)
        edge[1:] |= mask[1:] & trans[:-1]
        edge[:-1] |= mask[:-1] & trans[1:]
        edge[:, 1:] |= mask[:, 1:] & trans[:, :-1]
        edge[:, :-1] |= mask[:, :-1] & trans[:, 1:]
        return edge

    # Strip the studio-black crust / pin-line so the visible edge is paint.
    for _ in range(4):
        keep &= ~(_outer_ring(keep) & (mx <= 55) & (chroma <= 30))

    interior = np.asarray(Image.fromarray(keep.astype(np.uint8) * 255).filter(ImageFilter.MinFilter(7))) > 127
    if not interior.any():
        interior = keep

    out = np.zeros((h, w, 4), np.uint8)
    out[:, :, 0] = rgb[:, :, 0]
    out[:, :, 1] = rgb[:, :, 1]
    out[:, :, 2] = rgb[:, :, 2]
    out[:, :, 3] = np.where(keep, 255, 0)

    ring = _outer_ring(keep) & keep
    ys, xs = np.where(ring)
    cy, cx = (h - 1) / 2.0, (w - 1) / 2.0
    for y, x in zip(ys, xs):
        vy, vx = cy - y, cx - x
        n = (vy * vy + vx * vx) ** 0.5 or 1.0
        ir = int(rf[y, x])
        ig = int(gf[y, x])
        ib = int(bf[y, x])
        for dist in (3, 5, 8):
            yy = int(round(y + vy / n * dist))
            xx = int(round(x + vx / n * dist))
            if 0 <= yy < h and 0 <= xx < w and interior[yy, xx]:
                ir = int(rgb[yy, xx, 0])
                ig = int(rgb[yy, xx, 1])
                ib = int(rgb[yy, xx, 2])
                break
        if max(ir, ig, ib) <= 22:
            out[y, x, 3] = 0
            continue
        out[y, x, 0] = ir
        out[y, x, 1] = ig
        out[y, x, 2] = ib
        out[y, x, 3] = 255

    clear = out[:, :, 3] == 0
    out[:, :, 0][clear] = 0
    out[:, :, 1][clear] = 0
    out[:, :, 2][clear] = 0
    return Image.fromarray(out)


def index_originals() -> dict[str, list]:
    origs: dict[str, list] = defaultdict(list)
    for p in list(ASSETS.glob("*.png")) + list(ASSETS.glob("*.jpg")) + list(ASSETS.glob("*.jpeg")):
        name = p.name
        if name.startswith(".") or len(name) < 36:
            continue
        uid = name[:36].lower()
        if uid.count("-") != 4:
            continue
        try:
            im = Image.open(p)
            w, h = im.size
        except OSError:
            continue
        origs[uid].append((w, h, p.stat().st_mtime, p))
    return origs


def main() -> None:
    t0 = time.time()
    origs = index_originals()
    import sys

    only = None
    if "--front" in sys.argv:
        only = "front"
    elif "--back" in sys.argv:
        only = "back"
    elif "--composite" in sys.argv:
        only = "composite"
    targets = sorted(CATALOG.glob("*-*-*-*-*.png"))
    processed = 0
    missing = 0
    trans_sum = 0.0
    low = 0
    for dest in targets:
        stem = dest.stem
        if stem.endswith("-front"):
            uid, kind = stem[: -len("-front")], "front"
        elif stem.endswith("-back"):
            uid, kind = stem[: -len("-back")], "back"
        elif stem.endswith("-composite"):
            uid, kind = stem[: -len("-composite")], "composite"
        else:
            continue
        if only and kind != only:
            continue
        try:
            w, h = Image.open(dest).size
        except OSError:
            w = h = 0
        src = find_src(origs, uid, w, h, kind)
        if src is None:
            missing += 1
            print("missing", dest.name)
            continue
        src_im = Image.open(src)
        if "--copy-original" in sys.argv:
            src_im.convert("RGB").save(dest, format="PNG")
            frac = 0.0
        else:
            out = knockout(np.asarray(src_im.convert("RGB")))
            out.save(dest)
            arr = np.asarray(out)
            frac = float((arr[:, :, 3] == 0).mean())
        trans_sum += frac
        if frac < 0.08:
            low += 1
        processed += 1
        if processed % 20 == 0:
            print(f"… {processed}/{len(targets)}")
    dt = time.time() - t0
    avg = trans_sum / processed if processed else 0
    print(f"processed {processed} missing {missing} in {dt:.1f}s")
    print(f"low-transparent {low} avg transparent {avg:.4f}")


if __name__ == "__main__":
    main()
