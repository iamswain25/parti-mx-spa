import { useMutation } from "@apollo/client";
import { setUserGroupStatus } from "../graphql/mutation";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { useGlobalState, keys } from "../store/useGlobalState";
export default function useSetStatus(callback?: () => void) {
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [set, { loading, error }] = useMutation(setUserGroupStatus);
  useLoadingEffect(loading);
  useErrorEffect(error);
  async function handler(variables: any) {
    await set(variables);
    callback && callback();
    setSuccess("반영 하였습니다.");
  }
  return handler;
}
