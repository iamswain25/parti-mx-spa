import { Board } from "../types";
import { useBoardId, useBoards } from "./useGlobalState";
export default function useBoard(): [Board | undefined] {
  const [boardId] = useBoardId();
  const [boards] = useBoards();
  if (boardId && boards) {
    return [boards?.find((b) => b.id === boardId)];
  } else {
    return [undefined];
  }
}
