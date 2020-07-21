import { useMutation } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import { useGlobalState, keys } from "../store/useGlobalState";
import { useHistory } from "react-router-dom";
import { denouncePost } from "../graphql/mutation";

export default function usePostDenounce(id: number) {
  const { goBack } = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [denounce, { loading }] = useMutation(denouncePost, {
    variables: { id },
  });
  useLoadingEffect(loading);
  async function handler() {
    await denounce();
    setSuccess("공지 내립니다");
    goBack();
  }
  return function () {
    if (window.confirm("공지 내리겠습니까?")) {
      handler();
    }
  };
}
