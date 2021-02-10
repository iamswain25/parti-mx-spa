import React from "react";
import AddIcon from "@material-ui/icons/Add";
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
  makeStyles,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import { useGroupId } from "../store/useGlobalState";
import { useBoards } from "../store/useGlobalState";
import { Board } from "../types";
import { firestore } from "../config/firebase";
import SelectBoardPermission from "./SelectBoardPermission";
const newBoard: Partial<Board> = {
  title: "",
  body: "",
  type: "notice",
  view: "text",
  id: "",
  permission: {
    read: ["organizer", "member", "user", "anonymous"],
    create: ["organizer", "member", "user"],
    update: ["organizer"],
    delete: ["organizer"],
    comment: ["organizer", "member", "user"],
    like: ["organizer", "member", "user"],
  },
};
const useStyles = makeStyles(theme => ({
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
type FormBoard = Omit<Board, "updated_at" | "created_at">;
interface BoardsForm {
  boards: FormBoard[];
}
export default function BoardsSetting() {
  const classes = useStyles();
  const history = useHistory();
  const [group_id] = useGroupId();
  const [boards] = useBoards();
  const {
    handleSubmit,
    register,
    errors,
    control,
    reset,
    formState,
    watch,
  } = useForm<BoardsForm>();
  const { fields, append, remove } = useFieldArray<FormBoard, "uid">({
    name: "boards",
    control,
    keyName: "uid",
  });
  const watchingBoards = watch("boards");
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
        .delete(),
    );
    await Promise.all(deletes);
    history.push(`/${group_id}`);
  }

  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
      <Container component="main" className={classes.root}>
        <h2>게시판 관리</h2>
        <Typography>
          {fields.map((field, i: number) => {
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
                    render={props => (
                      <Select {...props} inputProps={{ readOnly: !!field.id }}>
                        <MenuItem value="notice">소식</MenuItem>
                        <MenuItem value="suggestion">제안</MenuItem>
                        <MenuItem value="event">모임</MenuItem>
                        <MenuItem value="vote">투표</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                {watchingBoards[i].type === "notice" && (
                  <FormControl>
                    <label>게시판 글 목록</label>
                    <Controller
                      control={control}
                      label="게시판 화면"
                      defaultValue={field.view}
                      name={`boards[${i}].view`}
                      render={props => (
                        <RadioGroup {...props} row>
                          <FormControlLabel
                            value="text"
                            control={<Radio />}
                            label="게시판"
                          />
                          <FormControlLabel
                            value="preview"
                            control={<Radio />}
                            label="미리보기"
                          />
                          <FormControlLabel
                            value="album"
                            control={<Radio />}
                            label="앨범"
                          />
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                )}
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
                  rules={{ required: false }}
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
                <SelectBoardPermission
                  label="글 작성 권한"
                  name={`boards[${i}].permission.create`}
                  defaultValue={field?.permission?.create || []}
                  control={control}
                />
                <SelectBoardPermission
                  label="글 조회 권한"
                  name={`boards[${i}].permission.read`}
                  defaultValue={field?.permission?.read || []}
                  control={control}
                />
                <SelectBoardPermission
                  label="글 수정 권한"
                  name={`boards[${i}].permission.update`}
                  defaultValue={field?.permission?.update || []}
                  control={control}
                />
                <SelectBoardPermission
                  label="글 삭제 권한"
                  name={`boards[${i}].permission.delete`}
                  defaultValue={field?.permission?.delete || []}
                  control={control}
                />
                <SelectBoardPermission
                  label="공감 권한"
                  name={`boards[${i}].permission.like`}
                  defaultValue={field?.permission?.like || []}
                  control={control}
                />
                <SelectBoardPermission
                  label="댓글 권한"
                  name={`boards[${i}].permission.comment`}
                  defaultValue={field?.permission?.comment || []}
                  control={control}
                />
                <div className={classes.ml}>
                  <IconButton onClick={() => removeHandler(i)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Grid>
            );
          })}
        </Typography>
        <Button
          disabled={formState.isSubmitting}
          onClick={() => append(newBoard)}
        >
          <AddIcon />
          게시판 추가
        </Button>
        <BtnSubmitDesktop />
      </Container>
    </form>
  );
}
