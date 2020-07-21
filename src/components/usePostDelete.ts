import { useMutation } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import { useGlobalState, keys } from "../store/useGlobalState";
import { useHistory } from "react-router-dom";
import { deletePost } from "../graphql/mutation";

export default function usePostDelete(id: number) {
  const { goBack } = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [del, { loading }] = useMutation(deletePost, {
    variables: { id },
  });
  useLoadingEffect(loading);
  async function handler() {
    await del();
    setSuccess("삭제 되었습니다");
    goBack();
  }

  return function () {
    if (window.confirm("삭제하겠습니까? 복구할 수 없습니다.")) {
      handler();
    }
  };
}
