import { useMutation } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import { useGlobalState, keys } from "../store/useGlobalState";
import { useHistory } from "react-router-dom";
import { denouncePost } from "../graphql/mutation";
interface AnnouncePost {
  update_mx_posts_by_pk: { board_id: number };
}
export default function usePostDenounce(id: number) {
  const { push } = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [denounce, { loading }] = useMutation<AnnouncePost>(denouncePost, {
    variables: { id },
  });
  useLoadingEffect(loading);
  async function handler() {
    const res = await denounce();
    const board_id = res.data?.update_mx_posts_by_pk.board_id;
    if (board_id) {
      setSuccess("공지 내립니다");
      push("/home/" + board_id);
    }
  }
  return function () {
    if (window.confirm("공지 내리겠습니까?")) {
      handler();
    }
  };
}
