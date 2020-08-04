import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField, Button, Select } from "@material-ui/core";
import { useStore } from "../store/store";
import { Redirect } from "react-router-dom";
import { useGlobalState, keys } from "../store/useGlobalState";
import { useForm } from "react-hook-form";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import { validateEmail } from "../helpers/emailValidator";
import { functions, secondAuth, auth } from "../config/firebase";
import { userGroupStatusList } from "../helpers/options";
import HeaderBack from "./HeaderBack";
const authInvite = functions.httpsCallable("authInvite");
const useStyles = makeStyles((theme) => ({
  texts: {
    "& textarea": {
      minHeight: 400,
    },
  },
}));
interface FormType {
  emails: string;
  status: string;
}
interface AuthResult {
  email: string;
  success: boolean;
}
export default function MemberNew() {
  const classes = useStyles();
  const [{ group_id }] = useStore();
  const [status] = useGlobalState(keys.PERMISSION);
  const [, setError] = useGlobalState(keys.ERROR);
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const { handleSubmit, register, errors } = useForm<FormType>();
  if (status !== "organizer") {
    return <Redirect to="/" />;
  }

  async function handleForm({ emails, status }: FormType) {
    const arr = emails.split(/[\r\n,;]+/).filter((e) => e);
    // const badEmail = arr.find((e) => !validateEmail(e));
    // if (badEmail) {
    //   console.log(arr);
    //   return setError(
    //     badEmail +
    //       " 이메일 형식이 잘못되었습니다. 이것은 빼고 다시 초대 해주세요"
    //   );
    // }
    setError(`${arr.length}명의 유저를 생성 중입니다.`);
    try {
      const { data } = await authInvite({
        emails: arr,
        groups: [{ group_id, status }],
      });
      const successed = data.filter((u: AuthResult) => u.success);
      const existing = data
        .filter((u: AuthResult) => !u.success)
        .map((u: AuthResult) => u.email);
      const registeredEmails = successed.map((u: AuthResult) => u.email);
      const actionCodeSettings = {
        url: "https://youthwagle.kr/home?group_id=" + group_id,
        handleCodeInApp: true,
      };
      let i = 0;
      for (const email of registeredEmails) {
        i++;
        setError(
          `${data.length}명의 유저를 생성했습니다. ${i}개의 초대 이메일을 보냈습니다.`
        );
        await auth.sendPasswordResetEmail(email, actionCodeSettings);
      }
      if (existing.length) {
        let i = 0;
        setError("이미 가입된 유저: \n" + existing.join("\n"));
        if (
          window.confirm(
            `이미 가입된 유저 ${existing.length}명 에게 로그인 링크 이메일을 전송하시겠습니까?`
          )
        ) {
          for (const email of existing) {
            i++;
            setError(
              `${existing.length}명의 이미 가입된 유저가 있습니다. ${i}개의 로그인 링크 이메일을 보냅니다.`
            );
            await auth.sendSignInLinkToEmail(email, actionCodeSettings);
          }
        }
      }
      setError(undefined);
      setSuccess(`이메일 전송을 완료했습니다.`);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <HeaderBack
          title="회원 초대"
          right={
            <Button
              type="submit"
              variant="contained"
              color="primary"
              children="초대"
            />
          }
        />
        <Select
          fullWidth
          native
          defaultValue="user"
          name="status"
          label="권한"
          inputRef={register({ required: "필수 입력" })}
        >
          {userGroupStatusList.map((l, i) => (
            <option value={l.value} key={i}>
              {l.label}
            </option>
          ))}
        </Select>
        <TextField
          multiline
          margin="normal"
          name="emails"
          variant="outlined"
          fullWidth
          inputRef={register({ required: "필수 입력" })}
          label="초대 이메일"
          helperText="쉼표(,)나 세미콜론(;)혹은 엔터(다음 줄)로 이메일을 구분해주세요."
          classes={{ root: classes.texts }}
          required={errors.emails ? true : false}
          error={errors.emails ? true : false}
        />
        <BtnSubmitDesktop text="초대" />
      </form>
    </Container>
  );
}
