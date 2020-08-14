import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import homepage from "../assets/images/homepage.png";
import facebook from "../assets/images/facebook.png";
import instagram from "../assets/images/instagram.png";
import youtube from "../assets/images/youtube.png";
import iseoulu from "../assets/images/iseoulu.png";
import kia from "../assets/images/kia.png";
import seoulmetropolitan from "../assets/images/seoulmetropolitan.png";
import sua from "../assets/images/sua.png";
import { Img } from "react-image";
import { Grid } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 20,
    paddingTop: 100,
    paddingBottom: 100,
  },
  first: {
    textAlign: "center",
  },
  second: {
    textAlign: "center",
    paddingTop: 48,
    paddingBottom: theme.spacing(2),
  },
  third: {
    textAlign: "center",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Grid
        container
        alignItems="center"
        justify="center"
        spacing={2}
        className={classes.first}
      >
        <Grid item>
          <Img src={[iseoulu]} style={{ height: 16 }} />
        </Grid>
        <Grid item>
          <Img src={[kia]} style={{ height: 16 }} />
        </Grid>
        <Grid item>
          <Img src={[seoulmetropolitan]} style={{ height: 16 }} />
        </Grid>
        <Grid item>
          <Img src={[sua]} style={{ height: 16 }} />
        </Grid>
      </Grid>
      <section className={classes.second}>
        <div>WHAT IS TO BE ASKED?</div>
        <div>Architecture and Urbanism Beyond COVID19</div>
        <div>Open Call for Collaborative Research & Proposal</div>
      </section>
      <section className={classes.third}>
        <div>
          Seoul Hall of Urbanism & Architecture | 119, Sejong-daero, Jung-gu,
          Seoul, Republic of Korea (04519) | Tel: +82-2-736-8050 | Email:
          sdk@kia.or.kr
        </div>
        <div>
          서울도시건축전시관 | (04519) 서울특별시 중구 세종대로 119 (태평로1가)
          | 전화: 02-736-8050 | 이메일: sdk@kia.or.kr
        </div>
      </section>
      <Grid
        container
        alignItems="center"
        justify="center"
        spacing={2}
        className={classes.second}
      >
        <Grid item>
          <a target="_blank" href="http://www.seoulhour.kr/main/ko/">
            <Img src={[homepage]} />
          </a>
        </Grid>
        <Grid item>
          <a
            target="_blank"
            href="https://www.facebook.com/seoulhour.kr/?modal=admin_todo_tour"
          >
            <Img src={[facebook]} />
          </a>
        </Grid>
        <Grid item>
          <a target="_blank" href="https://www.instagram.com/seoulhour/">
            <Img src={[instagram]} />
          </a>
        </Grid>

        <Grid item>
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCKLjFesxLmTcshZu-FlvrMw?view_as=subscriber"
          >
            <Img src={[youtube]} />
          </a>
        </Grid>
      </Grid>
    </footer>
  );
}
