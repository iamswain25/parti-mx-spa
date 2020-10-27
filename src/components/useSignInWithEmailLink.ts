import React from "react";
import { auth } from "../config/firebase";
import { useError, useSuccess } from "../store/useGlobalState";

export default function useSignInWithEmailLink() {
  const [, setError] = useError();
  const [, setSuccess] = useSuccess();
  React.useEffect(() => {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt(
          "메일의 로그인 링크를 통해 접근 하셨습니다. 확인을 위해 이메일을 입력해주세요."
        );
      }
      auth
        .signInWithEmailLink(email as string, window.location.href)
        .then(function (user) {
          setSuccess(
            "비밀번호 없이 로그인 성공했습니다! 일회용 이메일의 로그인 링크는 폐기 됩니다."
          );
        })
        .catch(function (error) {
          setError(error.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
