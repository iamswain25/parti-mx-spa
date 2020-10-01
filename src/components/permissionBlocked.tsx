import { BoardPermission, UserStatus } from "../types";

export default function permissionBlocked(
  permission: BoardPermission,
  status: UserStatus
) {
  if (!status) {
    return true;
  }
  switch (permission) {
    case "member": {
      if (["organizer", "user", "participant"].includes(status)) {
        break;
      }
      return true;
    }
    case "all":
      break;
    case "observer":
      if (["organizer"].includes(status)) {
        break;
      } else {
        return true;
      }
  }
  return false;
}
