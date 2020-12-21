import { Grid, makeStyles } from "@material-ui/core";
import partiLogo from "../assets/images/logo-parti-lighter.png";
import logo from "../assets/images/logo-sehub.png";
import React from "react";
import useDesktop from "./useDesktop";
const useStyles = makeStyles(theme => ({
  bgColor: {
    backgroundColor: theme.palette.grey[700],
  },
  root: {
    overflow: "hidden",
    position: "relative",
    margin: `100px auto 0`,
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
    "& .bold": {
      color: theme.palette.grey[300],
      fontWeight: "bold",
    },
    "& .mt": {
      marginTop: theme.spacing(2),
    },
  },
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
              <a
                href="https://sehub.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo} alt="서사경홈페이지" />
              </a>
            </Grid>
            <Grid spacing={3} container className="mt">
              <Grid item>
                <a
                  href="https://docs.google.com/file/d/1HH1hSBgpl2tX266EfsjsUJvs7KAL_lctZKJnGAsTCNE/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bold"
                >
                  이용약관
                </a>
              </Grid>
              <Grid item>
                <a
                  href="https://docs.google.com/file/d/11FSUnqoNijw9yGbgQCT38_fKrYS0tyTTYOOfLCVBbX8/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bold"
                >
                  개인정보 처리방침
                </a>
              </Grid>
            </Grid>
            <Grid item className="mt">
              서울특별시 은평구 통일로 684 미래청 1층
            </Grid>
            <Grid item>
              Tel: <a href="tel:+82-2-353-3553">02-353-3553</a>
            </Grid>
            <Grid item>
              Fax: <a href="fax:+82-2-383-3553">02-383-3553</a>
            </Grid>
            <Grid item>
              E-mail: <a href="mailto:info@sehub.net">info@sehub.net</a>
            </Grid>
          </Grid>
          <Grid item xs={12} className="powered">
            <a
              href="https://parti.coop"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>powered by </strong>
              <img src={partiLogo} alt="parti logo" />
            </a>
          </Grid>
        </Grid>
      </section>
    </footer>
  );
}
