import { Board, BoardPermission, Role } from "../types";
import { useBoardId, useBoards, useRole } from "./useGlobalState";
export default function usePermission(
  type: keyof BoardPermission
): [boolean, () => void, Role[], Role] {
  const [boardId] = useBoardId();
  const [boards] = useBoards();
  const [role] = useRole();
  const board = boards?.find((b) => b.id === boardId);
  const allowedRoles = board?.permission?.[type];
  function alertPermission() {
    if (allowedRoles && role)
      alert(
        `권한이 없습니다. 현재 당신의 권한은 ${role}이고, ${type}은 ${allowedRoles.join(
          ", "
        )} 만 가능합니다.`
      );
  }
  return [
    (role && allowedRoles?.includes(role)) ?? false,
    alertPermission,
    allowedRoles ?? [],
    role ?? "anonymous",
  ];
}
