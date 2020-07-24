import React from "react";
import { Select } from "@material-ui/core";
import { Board } from "../types";
import { useGlobalState, keys } from "../store/useGlobalState";

export default function SelectBoardPermission({
  board,
  update,
}: {
  board: Board;
  update: any;
}) {
  const { permission } = board;
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [, setError] = useGlobalState(keys.ERROR);
  async function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    const { value } = event.target;
    try {
      const res = await update({
        variables: { board_id: board.id, permission: value },
      });
      if (res.data?.update_mx_boards_by_pk?.id) {
        return setSuccess("반영 하였습니다.");
      }
    } catch (error) {
      setError(error);
    }
  }
  return (
    <Select native defaultValue={permission} onChange={handleChange}>
      <option value="all">전체공개</option>
      <option value="member">멤버공개</option>
      <option value="observer">
        멤버공개(보기,댓글,공감 가능, 글쓰기 제외)
      </option>
    </Select>
  );
}
