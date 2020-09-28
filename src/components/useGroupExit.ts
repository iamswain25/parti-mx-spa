import { useMutation } from "@apollo/client";
import { useStore } from "../store/store";
import { exitUsersGroup } from "../graphql/mutation";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";

export default function useGroupExit(refetch?: any) {
  const [{ user_id, group_id }] = useStore();
  const [exit, { loading, error }] = useMutation(exitUsersGroup, {
    variables: { group_id, user_id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);

  async function handler() {
    if (window.confirm("그룹을 나가시겠습니까?")) {
      await exit();
      refetch && refetch();
      // window.location.reload();
    }
  }
  return handler;
}
