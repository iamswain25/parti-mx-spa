import { BoardPermission, UserStatus } from "../types";

export default function permissionBlocked(
  permission: BoardPermission,
  status: UserStatus
) {
  // console.log(permission, status);
  if (!status) {
    return true;
  }
  switch (permission) {
    case "member": {
      if (["exit", "requested", null].includes(status)) {
        return true;
      }
      break;
    }
    case "all":
      break;
    case "observer":
      if (!["participant", "organizer"].includes(status)) {
        return true;
      }
      break;
  }
  return false;
}
