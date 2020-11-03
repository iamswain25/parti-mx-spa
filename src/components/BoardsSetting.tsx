import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Container,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import HeaderBack from "./HeaderBack";
import { boardPermissionList } from "../helpers/options";
import { useGroupId } from "../store/useGlobalState";
import useBoards from "../store/useBoards";
import useEffectParams from "../store/useEffectParams";
import { Board } from "../types";
import { firestore } from "../config/firebase";
const useStyles = makeStyles((theme) => ({
  root: {
    "& div": {
      display: "flex",
      alignItems: "center",
    },
  },
  ml: {
    marginLeft: theme.spacing(2),
  },
  bb: {
    border: "1px solid " + theme.palette.grey[300],
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
}));
const deletingIds: string[] = [];
// interface Board {
//   id: string;
//   body: string;
//   title: string;
//   order: number;
//   type: string;
// }
interface BoardsForm {
  boards: Array<Board>;
}
export default function BoardsSetting() {
  useEffectParams();
  const classes = useStyles();
  const history = useHistory();
  const [group_id] = useGroupId();
  const [boards] = useBoards();
  const { handleSubmit, register, errors, control, reset, formState } = useForm<
    BoardsForm
  >();
  const { fields, append, remove } = useFieldArray<Board, "uid">({
    name: "boards",
    control,
    keyName: "uid",
  });
  React.useEffect(() => {
    if (boards) {
      reset({ boards });
    }
  }, [boards, reset]);
  function removeHandler(i: number) {
    if (fields.length <= 1)
      return alert("게시판이 적어도 하나는 있어야 합니다.");
    const id = fields[i].id;
    if (id) {
      deletingIds.push(id);
    }
    remove(i);
  }

  async function handleForm(form: BoardsForm) {
    console.log({ group_id });
    const updates = form.boards.map(async ({ id, ...b }) => {
      b.order = Number(b.order);
      return id
        ? firestore
            .collection("groups")
            .doc(group_id)
            .collection("boards")
            .doc(id)
            .set(b, { merge: true })
        : firestore
            .collection("groups")
            .doc(group_id)
            .collection("boards")
            .add(b);
    });
    await Promise.all(updates);
    const deletes = deletingIds.map(async (id: string) =>
      firestore
        .collection("groups")
        .doc(group_id)
        .collection("boards")
        .doc(id)
        .delete()
    );
    await Promise.all(deletes);
    history.push(`/${group_id}`);
  }

  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
      <Container component="main" className={classes.root}>
        <HeaderBack title="게시판 관리" submit="저장" />
        <Typography>
          {fields.map((field, i: number) => {
            const postCount = field.count_open || 0;
            const readOnly = postCount > 0;
            return (
              <Grid
                container
                alignItems="center"
                justify="space-between"
                key={field.uid}
                className={classes.bb}
              >
                <FormControl variant="filled">
                  <InputLabel>게시판 유형</InputLabel>
                  <Controller
                    control={control}
                    label="게시판 유형"
                    defaultValue={field.type}
                    name={`boards[${i}].type`}
                    render={(props) => (
                      <Select {...props} inputProps={{ readOnly }}>
                        <MenuItem value="notice">소식</MenuItem>
                        <MenuItem value="suggestion">제보</MenuItem>
                        <MenuItem value="event">모임</MenuItem>
                        <MenuItem value="vote">투표</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                <CustomTextField
                  type="number"
                  label="게시판 순서"
                  fullWidth={false}
                  name={`boards[${i}].order`}
                  defaultValue={field.order}
                  inputRef={register({
                    required: "필수 입력",
                    min: 0,
                  })}
                  error={!!errors?.boards?.[i]?.order}
                  required={true}
                  helperText={errors?.boards?.[i]?.order?.message}
                />
                <Controller
                  name={`boards[${i}].id`}
                  control={control}
                  defaultValue={field.id}
                  as={<input type="hidden" />}
                />
                <CustomTextField
                  label="게시판 제목"
                  name={`boards[${i}].title`}
                  defaultValue={field.title}
                  register={register}
                  error={!!errors?.boards?.[i]?.title}
                  required={!!errors?.boards?.[i]?.title}
                  helperText={errors?.boards?.[i]?.title?.message}
                />
                <CustomTextField
                  label="게시판 설명"
                  name={`boards[${i}].body`}
                  defaultValue={field.body}
                  register={register}
                  error={!!errors?.boards?.[i]?.body}
                  required={!!errors?.boards?.[i]?.body}
                  helperText={errors?.boards?.[i]?.body?.message}
                />
                <div>
                  <FormControl variant="filled">
                    <InputLabel>게시판 권한</InputLabel>
                    <Select
                      native
                      label="게시판 권한"
                      defaultValue={field.permission}
                      name={`boards[${i}].permission`}
                      inputRef={register({
                        required: "필수 입력",
                      })}
                    >
                      {boardPermissionList.map(({ label, value }) => (
                        <option value={value} key={value}>
                          {label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <div className={classes.ml}>
                    {postCount > 0 ? (
                      <div>{postCount}개의 포스트</div>
                    ) : (
                      <IconButton onClick={() => removeHandler(i)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
              </Grid>
            );
          })}
        </Typography>
        <Button
          disabled={formState.isSubmitting}
          onClick={() =>
            append({ title: "", body: "", type: "notice", id: undefined })
          }
        >
          <AddIcon />
          게시판 추가
        </Button>
        <BtnSubmitDesktop />
      </Container>
    </form>
  );
}
