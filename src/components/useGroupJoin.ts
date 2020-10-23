import useGroupId from "../store/useGroupId";
import { useGlobalState, keys } from "../store/useGlobalState";

import useEffectRefetch from "./useEffectRefetch";
import useUser from "../store/useUser";
export default function useGroupJoin(userCount = 1) {
  const [, setVisible] = useGlobalState(keys.SHOW_LOGIN_MODAL);
  const [user] = useUser();
  const trigger = useEffectRefetch();
  async function handler() {
    if (user) {
      // await client.mutate({
      //   mutation: insertUserGroup,
      //   variables: {
      //     group_id,
      //     status: userCount > 0 ? "user" : "organizer",
      //   },
      // });
      trigger();
    } else {
      setVisible(true);
    }
  }
  return handler;
}
