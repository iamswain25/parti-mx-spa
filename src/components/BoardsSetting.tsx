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
import { Board } from "../types";
import { useHistory } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import BtnSubmitDesktop from "./BtnSubmitDesktop";
import HeaderBack from "./HeaderBack";
import { boardPermissionList } from "../helpers/options";
import { useGroupId } from "../store/useGlobalState";
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
const deletingIds: number[] = [];
interface BoardsForm {
  boards: Array<{
    id: string;
    body: string;
    title: string;
    order: number;
    type: string;
  }>;
}
export default function BoardsSetting() {
  const classes = useStyles();
  const history = useHistory();
  const [groupId] = useGroupId();

  const { handleSubmit, register, errors, control, reset } = useForm<
    BoardsForm
  >();
  const { fields, append, remove } = useFieldArray<Board>({
    name: "boards",
    control,
  });
  function removeHandler(i: number) {
    const id = fields[i].id;
    if (typeof id === "number") {
      deletingIds.push(id);
    }
    remove(i);
  }

  async function handleForm(form: BoardsForm) {
    const boards = form.boards.map((b) => {
      const { id, ...rest } = b;
      if (typeof id === "string") {
        return rest;
      }
      return b;
    });
    const variables = { boards, deletingIds };
    // return console.log(variables);
    // await updateBoardsAll({ variables });
    history.push("/home");
  }

  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
      <Container component="main" className={classes.root}>
        <HeaderBack title="게시판 관리" submit="저장" />
        <Typography>
          {fields.map((field, i) => {
            const postCount = field?.posts_aggregate?.aggregate?.count || 0;
            const readOnly = postCount > 0;
            return (
              <Grid
                container
                alignItems="center"
                justify="space-between"
                key={field.id}
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
                <Controller
                  name={`boards[${i}].group_id`}
                  control={control}
                  defaultValue={groupId}
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
        <Button onClick={() => append({ title: "", body: "", type: "notice" })}>
          <AddIcon />
          게시판 추가
        </Button>
        <BtnSubmitDesktop />
      </Container>
    </form>
  );
}
