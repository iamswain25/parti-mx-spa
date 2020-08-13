import { useMutation } from "@apollo/client";
import { useStore } from "../store/store";
import { deleteGroup } from "../graphql/mutation";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";

export default function useGroupDelete() {
  const [{ group_id }] = useStore();
  const [execute, { loading, error }] = useMutation(deleteGroup, {
    variables: { group_id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);

  async function handler() {
    if (window.confirm("그룹을 지우시겠습니까? 복구할 수 없습니다.")) {
      await execute();
      window.location.reload();
    }
  }
  return handler;
}
