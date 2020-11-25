import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import useGroup from "../store/useGroup";
import { useRole } from "../store/useGlobalState";
import InfoGroup from "./InfoGroup";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import bg1 from "../assets/images/bg1.png";
import useDesktop from "./useDesktop";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      position: "relative",
      backgroundColor: theme.palette.primary.main,
      [theme.breakpoints.up("md")]: {
        padding: `0 30px ${theme.spacing(5)}px`,
      },
      [theme.breakpoints.down("sm")]: {
        padding: `0 ${theme.spacing(2)}px ${theme.spacing(5)}px`,
      },
    },
    backgroundImg: {
      position: "absolute",
      width: "100%",
      height: "100%",
      [theme.breakpoints.up("md")]: {
        background: `url(${bg1}) no-repeat right`,
      },
      [theme.breakpoints.down("sm")]: {
        background: `url(${bg1}) no-repeat top`,
        backgroundSize: "150%",
      },
      // backgroundImage: `linear-gradient(to left, rgba(143, 138, 191, 0) 74%, ${theme.palette.primary.main} 44%)`,
    },
    gradient: {
      position: "absolute",
      width: "100%",
      height: "100%",
      [theme.breakpoints.up("md")]: {
        backgroundImage: `linear-gradient(to left,  rgba(143, 138, 191, 0) 20%, ${theme.palette.primary.main} 70%)`,
      },
      [theme.breakpoints.down("sm")]: {
        backgroundImage: `linear-gradient(to bottom, rgba(143, 138, 191, 0) 17%, ${theme.palette.primary.main} 34%)`,
      },
    },
    groupLogoContainer: {
      [theme.breakpoints.up("md")]: {
        maxWidth: 1140,
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
        [theme.breakpoints.down("sm")]: {
          fontSize: 14,
          marginTop: 103,
        },
        fontWeight: "bold",
        letterSpacing: "-0.5px",
      },
      "&> .subtitle": {
        [theme.breakpoints.down("sm")]: {
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
          fontSize: 28,
          marginTop: 8,
        },
        marginTop: 19,
        fontSize: "34px",
        fontWeight: "bold",
        letterSpacing: "-1.8px",
      },
      "&> .date": {
        [theme.breakpoints.down("sm")]: {
          fontSize: 16,
          marginTop: 8,
        },
        marginTop: 40,
        fontSize: 18,
        letterSpacing: "-0.5px",
      },
      "&> .caption": {
        [theme.breakpoints.down("sm")]: {
          marginTop: 4,
        },
        marginTop: 8,
        fontSize: 12,
        letterSpacing: "-0.6px",
        whiteSpace: "break-spaces",
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
      [theme.breakpoints.up("md")]: {
        height: 84,
      },
      padding: theme.spacing(2),
      display: "flex",
      "&> .title": {
        flex: 1,
        [theme.breakpoints.up("md")]: {
          height: 52,
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: 16,
        },
        marginRight: 6,
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: "-0.5px",
        color: "#544f85",
      },
      "&> .detail": {
        color: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.up("md")]: {
          fontSize: 11,
          alignSelf: "flex-end",
          width: 70,
        },
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
  const [isDesktop] = useDesktop();
  return (
    <Grid container className={classes.container} justify="center">
      <div className={classes.backgroundImg} />
      <div className={classes.gradient} />
      <div className={classes.groupLogoContainer}>
        <InfoGroup group={group} role={role} />
        <div className={classes.groupLogoOverlay}>
          <div className="title">제19회 전국주민자치박람회</div>
          <div className="subtitle">
            새로운 연결,{" "}
            <Hidden mdUp implementation="css">
              {"\n"}
            </Hidden>
            세대가 함께 여는 주민자치
          </div>
          <div className="date">2020. 12. 7. ~ 12. 11.</div>
          <div className="caption">
            주최·주관{"   "}행정안전부, 대통령소속 자치분권위원회,
            (사)열린사회시민연합
          </div>
          <section className="boxes">
            <Grid container spacing={isDesktop ? 3 : 2}>
              {[
                ["공지사항", "/home/sPnn8zdVEYxNrQS5MbtF"],
                [
                  isDesktop ? "전국주민자치박람회 주요일정" : "주요일정",
                  "/post/Vu39IzrVODw6IGHBjlyD",
                ],
                [
                  isDesktop ? "우수사례 전시" : "우수사례",
                  "/home/aA7LUOKOSJ0fo6cHzy56",
                ],
                [
                  isDesktop ? "학술행사 안내" : "학술행사",
                  "/home/vSX96T1oejM7icgzFpxv",
                ],
              ].map((item: string[]) => (
                <Grid item xs={isDesktop ? 3 : 6} key={item[0]}>
                  <Link to={item[1]} className={classes.gridbox}>
                    <div className="title">{item[0]}</div>
                    <div className="detail">
                      <Hidden smDown implementation="css">
                        자세히보기
                      </Hidden>
                      <NavigateNextIcon className="svg" />
                    </div>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </section>
        </div>
      </div>
    </Grid>
  );
}
