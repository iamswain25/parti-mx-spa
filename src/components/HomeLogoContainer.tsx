import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import savethechildrenLogo from "../assets/images/logo@3x.png";
import sharentingLogo from "../assets/images/sTitle@3x.png";
import maintitle from "../assets/images/mainTitle@3x.png";
import maintitleMobile from "../assets/images/mainTitleMobile@3x.png";
import text1 from "../assets/images/text1@3x.png";
import text2 from "../assets/images/text2@3x.png";
import text3 from "../assets/images/text3@3x.png";
import illustRight from "../assets/images/illust@3x.png";
import illustLeft from "../assets/images/illustCopy@3x.png";
import illustMobile from "../assets/images/illustMobile@3x.png";
import ReactPlayer from "react-player";
import useDesktop from "./useDesktop";
const useStyles = makeStyles<Theme>((theme) => {
  return {
    root: {
      backgroundColor: theme.palette.grey["200"],
    },
    savethechildrenLogo: {
      float: "left",
      width: 170,
      marginTop: theme.spacing(4),
      marginLeft: `calc(8%)`,
      padding: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        width: 150,
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(2),
      },
    },
    sharentingLogo: {
      width: 400,
      paddingTop: theme.spacing(8),
      margin: theme.spacing(0, "auto"),
      [theme.breakpoints.down("sm")]: {
        maxWidth: 296,
        width: "90%",
      },
      "& > img": {},
    },
    contents: {
      paddingTop: theme.spacing(4),
      "& > .main-title": {
        maxWidth: 580,
        marginBottom: theme.spacing(4),
        [theme.breakpoints.down("sm")]: {
          maxWidth: 275,
          width: "90%",
        },
      },
    },
    video: {
      margin: theme.spacing(0, "auto"),
      marginBottom: theme.spacing(2),
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
    },
    text: {
      "& p": {
        marginBottom: theme.spacing(2),
        margin: 0,
        color: theme.palette.grey["500"],
        textAlign: "center",
      },
    },
    illustLeft: {
      float: "left",
      width: "30vw",
      marginTop: `calc(-5%)`,
    },
    illustRight: {
      float: "right",
      width: "30vw",
      marginTop: `calc(-5%)`,
    },
    illustMobile: {
      width: "100vw",
      marginTop: `calc(-15%)`,
    },
    footer: {
      marginTop: 45,
      backgroundColor: theme.palette.grey["800"],
      minHeight: 150,
      letterSpacing: "-0.26",
      padding: theme.spacing(4, 0),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(4, 4),
        paddingBottom: theme.spacing(16),
      },
      [theme.breakpoints.down("xs")]: {
        paddingBottom: theme.spacing(8),
      },
      "& p": {
        fontWeight: 600,
        color: "white",
        textAlign: "center",
      },
      "& span": {
        color: "#ffd400",
      },
    },
  };
});
export default function HomeLogoContainer() {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <div className={classes.root}>
      <a href="https://www.sc.or.kr/" target="_blank" rel="noopener noreferrer">
        <img
          className={classes.savethechildrenLogo}
          src={savethechildrenLogo}
          alt="save the children logo"
        />
      </a>
      <div className={classes.sharentingLogo}>
        <img src={sharentingLogo} alt="sharenting project logo" />
      </div>

      <Grid
        container
        className={classes.contents}
        direction="column"
        alignItems="center"
      >
        <img
          className="main-title"
          src={isDesktop ? maintitle : maintitleMobile}
          alt="main title"
        />
        <div className={classes.video}>
          <div className="player-wrapper">
            <ReactPlayer
              url={"https://youtu.be/XZcXKNmNcuU"}
              width="100%"
              height="100%"
              className="react-player"
              controls={true}
            />
          </div>
        </div>
        <div className={classes.text}>
          <img src={text1} style={{ width: "322px" }} alt="text" />
          <p>AVG, Digital Birth: Welcome to the Online World, 2010</p>
          <img src={text2} style={{ width: "350px" }} alt="text" />
          <p>Barclays PLC, 영국의 다국적 금융서비스 기업</p>
          <img src={text3} style={{ width: "320px" }} alt="text" />
          <p>뉴욕주립대학교, 미국 FBI</p>
        </div>
      </Grid>
      {isDesktop ? (
        <div>
          <img className={classes.illustLeft} src={illustLeft} alt="illust" />
          <img className={classes.illustRight} src={illustRight} alt="illust" />
        </div>
      ) : null}

      <div className={classes.footer}>
        <p>
          많은 아동이 아주 어린 나이부터 보호자가 올린 사진으로 디지털 세상에
          신고식을 치릅니다.
        </p>
        <p>
          아동이 12살이 되는 때면 이렇게 올려진 사진이 평균 1,165장에 달합니다.
        </p>
        <p>
          보호자가 아동의 일상이나 사진을 SNS에 공개하는 일을 일컬어
          <span> 셰어런팅(Sharenting)*</span>이라는 말도 생겼습니다.
        </p>
      </div>
      {!isDesktop ? (
        <img className={classes.illustMobile} src={illustMobile} alt="illust" />
      ) : null}
    </div>
  );
}
