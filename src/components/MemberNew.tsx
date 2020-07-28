import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Select,
} from "@material-ui/core";
import { useStore } from "../store/store";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link, Redirect } from "react-router-dom";
import { useGlobalState, keys } from "../store/useGlobalState";
import { useForm } from "react-hook-form";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import { validateEmail } from "../helpers/emailValidator";
import { functions, secondAuth } from "../config/firebase";
import { userGroupStatusList } from "../helpers/options";
const authInvite = functions.httpsCallable("authInvite");
const useStyles = makeStyles((theme) => ({
  top: {
    height: theme.mixins.toolbar.minHeight,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    overflow: "hidden",
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.appBar,
    "& a": {
      color: "inherit",
    },
  },
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
  const { handleSubmit, register, errors } = useForm<FormType>({
    defaultValues: { emails: "swain@parti.xyz" },
  });
  if (status !== "organizer") {
    return <Redirect to="/" />;
  }

  async function handleForm({ emails, status }: FormType) {
    const arr = emails.split(/[\n,;]+/);
    const badEmail = arr.find((e) => !validateEmail(e));
    if (badEmail) {
      return setError(
        badEmail +
          " 이메일 형식이 잘못되었습니다. 이것은 빼고 다시 초대 해주세요"
      );
    }
    setError(`${arr.length}명의 유저를 생성 중입니다.`);
    const { data } = await authInvite({
      emails: arr,
      groups: [{ group_id, status }],
    });
    const registeredEmails = data
      .filter((u: AuthResult) => u.success)
      .map((u: AuthResult) => u.email);
    const actionCodeSettings = {
      url: "https://youthwagle.kr/home?group_id=" + group_id,
    };
    while (registeredEmails.length) {
      setError(
        `${data.length}명의 유저를 생성했습니다. 초대 이메일을 보냅니다. ${registeredEmails.length}개 남았습니다.`
      );
      const email = registeredEmails.shift();
      await secondAuth.sendPasswordResetEmail(email, actionCodeSettings);
    }
    setError(undefined);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <Grid
          container
          justify="space-between"
          alignItems="center"
          wrap="nowrap"
          className={classes.top}
        >
          <Link to={`/home?group_id=${group_id}`}>
            <ChevronLeftIcon />
          </Link>
          <Typography variant="h3" color="textPrimary">
            회원 초대
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            children="초대"
          />
        </Grid>
        <Select
          fullWidth
          native
          defaultValue="user"
          name="status"
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
