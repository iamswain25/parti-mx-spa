import { useMutation } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import { useGlobalState, keys } from "../store/useGlobalState";
import { useHistory } from "react-router-dom";
import { announcePost } from "../graphql/mutation";

export default function usePostAnnounce(id: number) {
  const { goBack } = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [announce, { loading }] = useMutation(announcePost, {
    variables: { id },
  });
  useLoadingEffect(loading);

  async function handler() {
    await announce();
    setSuccess("공지 했습니다");
    goBack();
  }
  return function () {
    if (window.confirm("공지 하겠습니까?")) {
      handler();
    }
  };
}
