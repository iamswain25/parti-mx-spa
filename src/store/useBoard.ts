import { Board } from "../types";
import { useBoardId, useBoards } from "./useGlobalState";
export default function useBoard(): [Board] {
  const [boardId] = useBoardId();
  const [boards] = useBoards();
  return [boards?.find((b) => b.id === boardId) || ({} as Board)];
}
