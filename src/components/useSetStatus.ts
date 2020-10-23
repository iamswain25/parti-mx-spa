import { useGlobalState, keys } from "../store/useGlobalState";
export default function useSetStatus(callback?: (bool: boolean) => void) {
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  async function handler(variables: any) {
    // await set(variables);
    callback && callback(true);
    setSuccess("반영 하였습니다.");
  }
  return handler;
}
