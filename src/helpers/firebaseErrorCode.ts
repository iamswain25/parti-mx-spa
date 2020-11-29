export const loginError = (error: any, setError: any) => {
  switch (error?.code) {
    case "auth/wrong-password":
      return setError(
        "비밀번호가 맞지 않거나, 유저에게 비밀번호가 없습니다.\n" +
          error?.message
      );
    case "auth/invalid-email":
      return setError("유효한 이메일 양식이 아닙니다.\n" + error?.message);
    case "auth/user-disabled":
      return setError(
        "해당 이메일의 사용자가 접근 금지 되었습니다. 관리자에게 문의 바랍니다.\n" +
          error?.message
      );
    case "auth/user-not-found":
      return setError(
        "해당 이메일을 가진 사용자를 찾을 수 없습니다.\n" + error?.message
      );
    case "auth/invalid-password":
      return setError("6자 이상이어야 합니다.\n" + error?.message);
    case "auth/weak-password":
      return setError("6자 이상이어야 합니다.\n" + error?.message);
    case "auth/email-already-exists":
      return setError("이미 가입된 이메일 주소입니다.\n" + error?.message);
    case "auth/email-already-in-use":
      return setError("이미 가입된 이메일 주소입니다.\n" + error?.message);
    default:
      return setError(JSON.stringify(error));
  }
};
