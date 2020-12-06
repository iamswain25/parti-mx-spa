import { Grid, makeStyles } from "@material-ui/core";
import partiLogo from "../assets/images/logo-parti.png";
import footer1 from "../assets/images/footer1.png";
import footer2 from "../assets/images/footer2.png";
import footer3 from "../assets/images/footer3.png";
import icon1 from "../assets/images/icon1.png";
import icon2 from "../assets/images/icon2.png";
import icon3 from "../assets/images/icon3.png";
import React from "react";
const useStyles = makeStyles((theme) => ({
  bgColor: {
    backgroundColor: theme.palette.primary.dark,
  },
  root: {
    overflow: "hidden",
    position: "relative",
    margin: `100px auto 0`,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    maxWidth: 1200,
    paddingLeft: 30,
    paddingRight: 30,
    "&>div": {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      fontSize: 14,
      color: theme.palette.common.white,
      lineHeight: 2,
      letterSpacing: 0.58,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: theme.spacing(1),
      },
    },
    "&>.powered": {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      position: "relative",
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
    "& .color-primary-main": {
      color: theme.palette.primary.main,
      fontWeight: "bold",
    },
    "& .mt": {
      marginTop: theme.spacing(2),
    },
  },
  right: {
    position: "absolute",
    right: -5,
    bottom: 30,
  },
}));
export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.bgColor}>
      <section className={classes.root}>
        <Grid spacing={3} container>
          <Grid item>
            <img src={footer1} alt="footer1" />
          </Grid>
          <Grid item>
            <img src={footer2} alt="footer2" />
          </Grid>
        </Grid>
        <Grid spacing={3} container className="mt">
          <Grid item>
            <a
              href="/post/m5AGcFMUhFLADV1rg9WX"
              target="_blank"
              rel="noopener noreferrer"
              className="color-primary-main"
            >
              이용약관
            </a>
          </Grid>
          <Grid item>
            <a
              href="/post/69bCfUCukUvs89Jfurj5"
              target="_blank"
              rel="noopener noreferrer"
              className="color-primary-main"
            >
              개인정보 처리방침
            </a>
          </Grid>
        </Grid>
        <Grid container>
          주 소 (11775)경기도 의정부시 청사로 5번길 8-7, 2층 (신곡동,
          씨티메디타운)
        </Grid>
        <Grid container spacing={3}>
          <Grid item>대표전화 031-852-2299</Grid>
          <Grid item>팩스 031-853-7673</Grid>
          <Grid item>이메일 center@ggmaeul.or.kr</Grid>
        </Grid>
        <Grid container spacing={3} className="mt">
          <Grid item>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.com"
            >
              <img src={icon1} alt="icon1" />
            </a>
          </Grid>
          <Grid item>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://youtube.com"
            >
              <img src={icon2} alt="icon2" />
            </a>
          </Grid>
          <Grid item>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://blog.naver.com"
            >
              <img src={icon3} alt="icon3" />
            </a>
          </Grid>
        </Grid>
        <section className="powered">
          <a
            href="https://parti.coop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>powered by</strong>
            <img src={partiLogo} alt="parti logo" />
          </a>
          <img src={footer3} alt="footer3" className={classes.right} />
        </section>
      </section>
    </footer>
  );
}
