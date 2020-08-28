import React from "react";
import { auth } from "../config/firebase";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MenuItem } from "@material-ui/core";

export default function AccountDelete() {
  const history = useHistory();
  async function logoutHandler() {
    // try {
    //   await auth?.currentUser.reauthenticateWithCredential(credential);
    //   await auth?.currentUser.delete();
    //   showMessage({ type: "success", message: "회원탈퇴 하였습니다." });
    // } catch (error) {
    //   showMessage({ type: "danger", message: JSON.stringify(error) });
    // }
    history.replace("/");
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen} color="inherit">
        멤버 탈퇴
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">로그아웃</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            탈퇴 하겠습니까? 돌이킬 수 없습니다.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            회원 탈퇴 시 서비스 이용 정보를 아래와 같이 정리 합니다. {"\n"}회원
            정보: 즉시 삭제 {"\n"}가입 그룹 정보: 즉시 삭제 {"\n"}작성된 글 및
            댓글: 유지 작성한 게시물의 삭제를 원하시는 경우, 탈퇴 신청 전에
            삭제를 진행해주세요.
            {"\n"}탈퇴 처리가 완료된 후에는 작성 하신글과 댓글의 삭제를 요청할
            수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            아니요
          </Button>
          <Button onClick={logoutHandler} color="primary" autoFocus>
            네
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
