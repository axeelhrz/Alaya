"use client";

import { useEffect, useId, useRef, useState } from "react";

export type SelectOption = { value: string; label: string };

type Props = {
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  required?: boolean;
  label?: string;
};

export function SelectMenu({
  name,
  value,
  onChange,
  options,
  placeholder,
  required,
  label,
}: Props) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <button
        type="button"
        className={`input-block flex w-full items-center justify-between gap-3 text-left ${
          selected ? "text-alaya-black" : "text-alaya-muted"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selected?.label ?? placeholder}</span>
        <span aria-hidden className="text-[0.65rem] tracking-normal">
          {open ? "↑" : "↓"}
        </span>
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={label ?? placeholder}
          className="absolute left-0 right-0 z-30 mt-1 max-h-64 overflow-auto border border-alaya-black bg-alaya-white py-1"
        >
          {options.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`flex w-full px-5 py-3 text-left text-[0.7rem] uppercase tracking-[0.16em] ${
                    active
                      ? "bg-alaya-black text-white"
                      : "text-alaya-black hover:bg-alaya-black hover:text-white"
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
