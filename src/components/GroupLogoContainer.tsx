import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import useGroup from "../store/useGroup";
import { useRole } from "../store/useGlobalState";
import InfoGroup from "./InfoGroup";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import bg1 from "../assets/images/bg1.png";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("md")]: {
        padding: "0 30px",
        position: "relative",
      },
      backgroundColor: theme.palette.primary.main,
    },
    backgroundImg: {
      position: "absolute",
      width: "100%",
      height: "100%",
      background: `url(${bg1}) no-repeat right`,
      // backgroundImage: `linear-gradient(to left, rgba(143, 138, 191, 0) 74%, ${theme.palette.primary.main} 44%)`,
    },
    gradient: {
      position: "absolute",
      width: "100%",
      height: "100%",
      [theme.breakpoints.up("md")]: {
        backgroundImage: `linear-gradient(to left,  rgba(143, 138, 191, 0) 20%, ${theme.palette.primary.main} 70%)`,
      },
    },
    groupLogoContainer: {
      [theme.breakpoints.up("md")]: {
        height: 424,
        maxWidth: 1140,
      },
      [theme.breakpoints.down("sm")]: {
        display: "block",
        "& img": {
          width: "100%",
          objectFit: "cover",
        },
      },
      width: "100%",
      position: "relative",
    },
    groupLogoOverlay: {
      color: theme.palette.common.white,
      display: "flex",
      flexDirection: "column",
      "&> .title": {
        marginTop: 71,
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: "-0.5px",
      },
      "&> .subtitle": {
        marginTop: 19,
        fontSize: "34px",
        fontWeight: "bold",
        letterSpacing: "-1.8px",
      },
      "&> .date": {
        marginTop: 40,
        fontSize: 18,
        letterSpacing: "-0.5px",
      },
      "&> .caption": {
        marginTop: 8,
        fontSize: 12,
        letterSpacing: "-0.6px",
      },
      "&> .boxes": {
        marginTop: 40,
        "& > div": {
          overflow: "hidden",
        },
      },
    },
    gridbox: {
      backgroundColor: theme.palette.background.paper,
      // width: 267,
      height: 84,
      padding: theme.spacing(2),
      display: "flex",
      "&> .title": {
        flex: 1,
        height: 52,
        marginRight: 6,
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: "-0.5px",
        color: "#544f85",
      },
      "&> .link": {
        display: "flex",
        width: 70,
        alignSelf: "flex-end",
        alignItems: "center",
        fontSize: 11,
        color: theme.palette.primary.main,
        "&> .svg": {
          width: 16,
          height: 16,
        },
      },
    },
  };
});
export default function GroupLogoContainer() {
  const [group] = useGroup();
  const classes = useStyles();
  const [role] = useRole();
  return (
    <Grid container className={classes.container} justify="center">
      <div className={classes.backgroundImg} />
      <div className={classes.gradient} />
      <div className={classes.groupLogoContainer}>
        {role === "organizer" && <InfoGroup group={group} />}
        <div className={classes.groupLogoOverlay}>
          <div className="title">제19회 전국주민자치박람회</div>
          <div className="subtitle">새로운 연결, 세대가 함께 여는 주민자치</div>
          <div className="date">2020. 12. 7. ~ 12. 11.</div>
          <div className="caption">
            주최·주관 행정안전부, 대통령소속 자치분권위원회,
            (사)열린사회시민연합
          </div>
          <section className="boxes">
            <Grid container spacing={3}>
              {[
                ["공지사항"],
                ["전국주민자치박람회 주요 일정"],
                ["우수사례 전시"],
                ["학술행사 안내"],
              ].map((item: string[]) => (
                <Grid item xs={3} key={item[0]}>
                  <div className={classes.gridbox}>
                    <div className="title">{item[0]}</div>
                    <div className="link">
                      자세히보기
                      <NavigateNextIcon className="svg" />
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </section>
        </div>
      </div>
    </Grid>
  );
}
