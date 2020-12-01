import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { auth } from "../config/firebase";
import { loginError } from "../helpers/firebaseErrorCode";
import { useError, useSuccess } from "./useGlobalState";

export default function useAccountDelete() {
  const [, setSuccess] = useSuccess();
  const [, setError] = useError();
  const history = useHistory();
  async function hadnler() {
    if (!auth?.currentUser?.email) {
      return alert("로그인 하셔야 합니다.");
    }
    const password = window.prompt(
      `탈퇴 하겠습니까? 돌이킬 수 없습니다.

회원 탈퇴 시 서비스 이용 정보를 아래와 같이 정리 합니다.
회원정보: 즉시 삭제 
가입 그룹 정보: 즉시 삭제 
작성된 글 및 댓글: 유지 작성한 게시물의 삭제를 원하시는 경우, 탈퇴 신청 전에 삭제를 진행해주세요.
탈퇴 처리가 완료된 후에는 작성 하신글과 댓글의 삭제를 요청할 수 없습니다.

탈퇴를 진행하시려면 비밀번호를 입력해주세요.`
    );
    if (!password) {
      return alert("비밀번호를 입력 하셔야 합니다.");
    }
    try {
      const { email } = auth.currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
      );
      await auth.currentUser.reauthenticateWithCredential(credential);
      await auth.currentUser.delete();
      setSuccess("회원탈퇴 하였습니다.");
      history.push("/");
    } catch (error) {
      loginError(error, setError);
    }
  }
  return hadnler;
}
