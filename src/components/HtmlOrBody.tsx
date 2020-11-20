import React from "react";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core";
import LinkPreview from "./LinkPreview";
import Linkify from "./Linkify";
import draftToHtml from "draftjs-to-html";
const useStyles = makeStyles((theme) => {
  const colors = {
    emerald: theme.palette.primary.dark,
    grey900: theme.palette.grey[900],
  };
  return {
    label: {
      [theme.breakpoints.up("md")]: {
        fontSize: 14,
      },
      fontSize: 12,
      fontWeight: 500,
      color: colors.emerald,
      marginRight: theme.spacing(0.5),
    },
    body: {
      "& p": {
        margin: "1em 0",
      },
      whiteSpace: (isHtml) => (isHtml ? "normal" : "pre-wrap"),
      [theme.breakpoints.up("md")]: {
        fontSize: 16,
        letterSpacing: -0.4,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 14,
        letterSpacing: -0.3,
        marginTop: theme.spacing(1.5),
      },
    },
  };
});
export default function HtmlOrBody({ post: p }: { post: Post }) {
  const { body, html, type } = p;
  const isHtml = !!html;
  const classes = useStyles(isHtml);
  return (
    <>
      <div className={classes.body}>
        {type === "suggestion" && <div className={classes.label}>요약</div>}
        {html ? (
          <div
            className="draftjs"
            dangerouslySetInnerHTML={{ __html: draftToHtml(html) }}
          />
        ) : (
          <>
            <Linkify body={body} />
          </>
        )}
      </div>
      {!html && <LinkPreview text={body} />}
    </>
  );
}
