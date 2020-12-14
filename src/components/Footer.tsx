import { Grid, makeStyles } from "@material-ui/core";
import partiLogo from "../assets/images/logo-parti-light.png";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import BloggerIcon from "../assets/images/icon-blogger.png";
import NaverPostIcon from "../assets/images/icon-naverpost.png";
import ccl from "../assets/images/ccl.png";
import logo from "../assets/images/logo-sehub.png";
import React from "react";
import useDesktop from "./useDesktop";
const useStyles = makeStyles((theme) => ({
  bgColor: {
    backgroundColor: theme.palette.grey[700],
  },
  root: {
    overflow: "hidden",
    position: "relative",
    margin: `100px auto 0`,
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    maxWidth: 1200,
    paddingLeft: 30,
    paddingRight: 30,
    flexWrap: "wrap",
    fontSize: 14,
    color: theme.palette.grey[200],
    lineHeight: 1.7,
    letterSpacing: 0.58,
    // "&>div": {
    //   display: "flex",
    //   alignItems: "center",

    //   [theme.breakpoints.down("sm")]: {
    //     flexDirection: "column",
    //     alignItems: "center",
    //     marginTop: theme.spacing(1),
    //   },
    // },
    "& .powered": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      margin: "10px 0",
      "&>a>strong": {
        fontSize: 12,
        color: theme.palette.grey[400],
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
    "& .bold": {
      color: theme.palette.grey[300],
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
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  icons: {
    marginTop: theme.spacing(0.5),
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center"
    },
    "& img": {
      width: "15px"
    }
  },
  license: {
    fontSize: 11,
    color: theme.palette.grey[400],
    maxWidth: "300px",
    margin: "0",
    [theme.breakpoints.down("xs")]: {
      margin: '0 auto'
    },
  },
  sns: {
    fontWeight: 500,
    margin: "0px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
  }
}));

export default function Footer() {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <footer className={classes.bgColor}>
      <section className={classes.root}>
      <Grid container spacing={isDesktop ? 4 : 0}>
        <Grid item sm={8} container direction="column">
          <Grid item>
            <img src={logo} alt="footer1" />
          </Grid>
          <Grid spacing={3} container className="mt">
            <Grid item>
              <a href="#" target="_blank" rel="noopener noreferrer" className="bold">
                이용약관
              </a>
            </Grid>
            <Grid item>
              <a href="#" target="_blank" rel="noopener noreferrer" className="bold">
                개인정보 처리방침
              </a>
            </Grid>
          </Grid>
          <Grid item className="mt">서울특별시 은평구 통일로 684 미래청 1층</Grid>
          <Grid item>Tel: 02-353-3553</Grid>
          <Grid item>Fax: 02-383-3553</Grid>
          <Grid item>E-mail: info@sehub.net</Grid>
        </Grid>
        <Grid item xs={12} className="powered">
          <a
          href="https://parti.coop"
          target="_blank"
          rel="noopener noreferrer"
          >
            <strong>powered by</strong>
            <img src={partiLogo} alt="parti logo" />
          </a>
        </Grid>
      </Grid>
      </section>
    </footer>
  );
}
