import { makeStyles } from "@material-ui/core";
import React from "react";
import partiLogo from "../assets/images/logo-parti.png";
import juminLogo from "../assets/images/logo-jeongukminju-color.png";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(5)}px auto`,
    maxWidth: 1200,
    paddingLeft: 30,
    paddingRight: 30,
    "&>div": {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      "&>div": {
        [theme.breakpoints.up("md")]: {
          marginLeft: theme.spacing(4),
        },
      },
      "&>div>div": {
        margin: `${theme.spacing(1)}px 0`,
        display: "flex",
        flexWrap: "wrap",
      },
      "& strong": {
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: -0.7,
        color: "#a6a6a6",
      },
      "& span": {
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: -0.7,
        color: theme.palette.grey[900],
        marginLeft: theme.spacing(2),
      },
      "& a": {
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: -0.7,
        color: theme.palette.grey[900],
        marginRight: theme.spacing(2),
        textDecoration: "underline",
      },
    },
    "&>.powered": {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      "&>a>strong": {
        fontSize: 12,
        color: theme.palette.grey[500],
      },
    },
  },
}));
export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <div>
        <img src={juminLogo} alt="brand logo" />
        <div>
          <div>
            <strong>주최/주관</strong>
            <span>행정안전부</span>
            <span>자치분권위원회</span>
            <span>자치분권위원회</span>
            <span>(사)열린사회시민연합</span>
            <span></span>
            <span></span>
            <strong>문의</strong>
            <span></span>
            <a href="tel:02-3676-6503">02-3676-6503</a>
            <a href="mailto:pvnet2011@gmail.com">pvnet2011@gmail.com</a>
          </div>
          <div>
            <a
              href="https://drive.google.com/file/d/1p9laSCxw_hmoMo-Iw_3P6YfvH_eF2Zhl/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              이용약관
            </a>
            <a
              href="https://drive.google.com/file/d/1p9laSCxw_hmoMo-Iw_3P6YfvH_eF2Zhl/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              개인정보 처리방침
            </a>
          </div>
        </div>
      </div>
      <section className="powered">
        <a href="https://parti.coop" target="_blank" rel="noopener noreferrer">
          <strong>powered by</strong>
          <img src={partiLogo} alt="parti logo" />
        </a>
      </section>
    </footer>
  );
}
