import { filterBoards, type Board } from "../../content/boards";

export function boardSearchHaystack(
  board: Pick<Board, "name" | "shaper" | "slug">,
) {
  return [board.name, board.shaper, board.slug.replace(/-/g, " ")]
    .join(" ")
    .toLowerCase();
}

export function searchBoards(query: string, cat?: string) {
  const q = query.trim().toLowerCase();
  const base = filterBoards(cat);
  if (!q) return base;
  return base.filter((board) => boardSearchHaystack(board).includes(q));
}
