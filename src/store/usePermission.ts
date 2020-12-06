import useGroupJoin from "../components/useGroupJoin";
import { BoardPermission, Role } from "../types";
import {
  useBoardId,
  useBoards,
  useCurrentUser,
  useLoginModal,
  useRole,
} from "./useGlobalState";
export default function usePermission(
  type: keyof BoardPermission
): [boolean, () => void, Role[], Role] {
  const [boardId] = useBoardId();
  const [boards] = useBoards();
  const join = useGroupJoin();
  const [role] = useRole();
  const [, setVisible] = useLoginModal();
  const [currentUser] = useCurrentUser();
  const board = boards?.find((b) => b.id === boardId);
  const allowedRoles = board?.permission?.[type];
  const hasPermission = (role && allowedRoles?.includes(role)) ?? false;
  function alertPermission() {
    if (allowedRoles && role && !hasPermission) {
      if (role === "anonymous" && !currentUser?.email) {
        return setVisible(true);
      } else if (role === "anonymous" && currentUser?.email) {
        const wannaJoin = window.confirm(
          `아직 그룹에 가입하지 않아 권한이 없습니다. 바로 유저로 가입하시겠습니까?`
        );
        if (wannaJoin && join) return join();
      } else {
        if (board && board.type === "suggestion") {
          return alert(`우수사례 전시관 심사가 종료되어 집계 중입니다.`);
        }
        return alert(
          `권한이 없습니다. 현재 당신의 권한은 ${role}이고, ${type}은 ${allowedRoles.join(
            ", "
          )} 만 가능합니다.`
        );
      }
    }
  }
  return [
    hasPermission,
    alertPermission,
    allowedRoles ?? [],
    role ?? "anonymous",
  ];
}
