import { makeStyles } from "@material-ui/core";
import React from "react";
import partiLogo from "../assets/images/logo-parti.png";
import juminLogo from "../assets/images/logo-jeongukminju-color.png";
import { EMAIL, TELEPHONE } from "../helpers/options";
const useStyles = makeStyles((theme) => ({
  bgGrey: {
    backgroundColor: theme.palette.grey[100],
  },
  root: {
    margin: `0 auto`,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    maxWidth: 1200,
    paddingLeft: 30,
    paddingRight: 30,
    "&>div": {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: theme.spacing(1),
      },
      "&>div": {
        [theme.breakpoints.up("md")]: {
          marginLeft: theme.spacing(4),
        },
        "&>div": {
          margin: `${theme.spacing(1)}px 0`,
          display: "flex",
          flexWrap: "wrap",
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
          },
        },
      },
      "& strong": {
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: -0.7,
        color: "#a6a6a6",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center",
        },
      },
      "& span": {
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: -0.7,
        color: theme.palette.grey[900],
        marginRight: theme.spacing(2),
      },
      "& a": {
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: -0.7,
        color: theme.palette.grey[900],
        marginRight: theme.spacing(2),
        "&.underline": {
          textDecoration: "underline",
        },
      },
    },
    "&>.powered": {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      "&>a>strong": {
        fontSize: 12,
        color: theme.palette.grey[500],
      },
    },
    "& .margintop": {
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(1),
      },
    },
  },
}));
export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.bgGrey}>
      <section className={classes.root}>
        <div>
          <img src={juminLogo} alt="brand logo" />
          <div>
            <div>
              <span>
                <strong>주최/주관</strong>
              </span>
              <a
                href="https://www.mois.go.kr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                행정안전부
              </a>
              <a
                href="https://www.pcad.go.kr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                대통령소속 자치분권위원회
              </a>
              <a
                href="http://www.openc.or.kr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                (사)열린사회시민연합
              </a>
              <span className="margintop">
                <strong>문의</strong>
              </span>
              <a href={`tel:${TELEPHONE}`}>{TELEPHONE}</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <div>
              <a
                href="https://drive.google.com/file/d/1p9laSCxw_hmoMo-Iw_3P6YfvH_eF2Zhl/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                이용약관
              </a>
              <a
                href="https://drive.google.com/file/d/1p9laSCxw_hmoMo-Iw_3P6YfvH_eF2Zhl/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                개인정보 처리방침
              </a>
            </div>
          </div>
        </div>
        <section className="powered">
          <a
            href="https://parti.coop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>powered by</strong>
            <img src={partiLogo} alt="parti logo" />
          </a>
        </section>
      </section>
    </footer>
  );
}
