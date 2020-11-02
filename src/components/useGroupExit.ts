import { useMutation } from "@apollo/client";
import { useStore } from "../store/store";
import { exitUsersGroup } from "../graphql/mutation";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import useEffectRefetch from "./useEffectRefetch";

export default function useGroupExit(cb?: Function) {
  const [{ user_id, group_id }] = useStore();
  const [exit, { loading, error }] = useMutation(exitUsersGroup, {
    variables: { group_id, user_id },
  });
  const trigger = useEffectRefetch();
  useLoadingEffect(loading);
  useErrorEffect(error);

  async function handler() {
    if (window.confirm("그룹을 나가시겠습니까?")) {
      await exit();
      trigger();
      cb && cb();
      // window.location.reload();
    }
  }
  return handler;
}
