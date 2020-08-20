import React from "react";
import { Post } from "../types";
import { IconButton, Dialog, DialogTitle, Grid } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import CopyToClipboard from "react-copy-to-clipboard";
import { useGlobalState, keys } from "../store/useGlobalState";
import {
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
} from "react-share";
import {
  NaverBlogButton,
  KaKaoStoryButton,
  KaKaoTalkButton,
} from "react-social-kr";
import { Img } from "react-image";
import kakaotalk from "../assets/images/kakaotalk.png";
import kakaostory from "../assets/images/kakaostory.png";
import naverblog from "../assets/images/naverblog.png";
export default function ShareButtons({ post: p }: { post: Post }) {
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [open, setOpen] = React.useState(false);
  const url = window.location.href;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CopyToClipboard
        text={url}
        onCopy={() => setSuccess("Copied to clipboard!")}
      >
        <IconButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
          </svg>
        </IconButton>
      </CopyToClipboard>

      <IconButton onClick={handleClickOpen}>
        <ShareIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share</DialogTitle>
        <div style={{ padding: 16 }}>
          <Grid container spacing={2}>
            <Grid item>
              <EmailShareButton url={url} children={<EmailIcon round />} />
            </Grid>
            <Grid item>
              <FacebookShareButton
                url={url}
                children={<FacebookIcon round />}
              />
            </Grid>
            <Grid item>
              <KaKaoTalkButton
                id="kakaotalk"
                jsKey="21cd8a6129205163194430f64b6ce4ef"
                url={url}
                children={
                  <Img
                    src={[kakaotalk]}
                    style={{ width: 64, height: 64, borderRadius: 32 }}
                  />
                }
              />
            </Grid>
            <Grid item>
              <KaKaoStoryButton
                url={url}
                children={
                  <Img
                    src={[kakaostory]}
                    style={{ width: 64, height: 64, borderRadius: 32 }}
                  />
                }
              />
            </Grid>
            <Grid item>
              <NaverBlogButton
                url={url}
                children={
                  <Img
                    src={[naverblog]}
                    style={{ width: 64, height: 64, borderRadius: 32 }}
                  />
                }
              />
            </Grid>
            <Grid item>
              <TwitterShareButton url={url} children={<TwitterIcon round />} />
            </Grid>
            <Grid item>
              <LinkedinShareButton
                url={url}
                children={<LinkedinIcon round />}
              />
            </Grid>
            <Grid item>
              <TelegramShareButton
                url={url}
                children={<TelegramIcon round />}
              />
            </Grid>
            <Grid item>
              <LineShareButton url={url} children={<LineIcon round />} />
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </>
  );
}
