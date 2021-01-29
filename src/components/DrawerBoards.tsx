import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Link, NavLink } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { IconButton, Hidden } from "@material-ui/core";
import { useBoards, useCurrentUser } from "../store/useGlobalState";
import useGroup from "../store/useGroup";
import greenlablogo from "../assets/images/greenlablogo.png";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    "&>.title": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: "-0.56px",
      textAlign: "center",
      color: theme.palette.grey[900],
      "&>svg": {
        width: 28,
        height: 28,
      },
    },
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(5),
    "&>.boards": {
      padding: theme.spacing(2),
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: -1,
      textAlign: "center",
      color: theme.palette.primary,
      borderBottom: "1px solid " + theme.palette.grey[300],
      "&.active": {
        color: theme.palette.primary.main,
      },
    },
    "&>.button": {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1.5),
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: -1,
      textAlign: "center",
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      borderBottom: "1px solid " + theme.palette.grey[300],
      "&.active": {
        color: theme.palette.primary.main,
      },
    },
  },
  profile: {
    textAlign: "center",
  },
}));

export default function DrawerBoards({ close }: { close: () => void }) {
  const classes = useStyles();
  const [group] = useGroup();
  const [boards] = useBoards();
  const [currentUser] = useCurrentUser();
  return (
    <section className={classes.root}>
      <div className="title">
        <Link to={`/${group?.id}`} onClick={close}>
          <img src={greenlablogo} alt="logo" />
        </Link>
        <IconButton onClick={close}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.container}>
        <Hidden smUp implementation="css">
          {currentUser?.email && (
            <NavLink
              exact
              to={`/profile`}
              onClick={close}
              className="boards"
              activeClassName="active"
            >
              프로필
            </NavLink>
          )}
        </Hidden>
        {boards?.map(b => (
          <NavLink
            exact
            to={`/${group?.id}/${b.id}`}
            key={b.id}
            onClick={close}
            className="boards"
            activeClassName="active"
          >
            {b.title}
          </NavLink>
        ))}
        {currentUser?.email ? (
          <Link to="/logout" className="button" onClick={close}>
            로그아웃
          </Link>
        ) : (
          <Link to="/login" className="button" onClick={close}>
            로그인
          </Link>
        )}
      </div>
    </section>
  );
}

// <AppBar position="sticky" className={classes.appBar}>
//       <Toolbar classes={{ regular: classes.toolbar }} disableGutters>
//         <Grid container>
//           <Hidden mdUp implementation="css">
//             <DrawerGroup />
//           </Hidden>
//           <Grid item xs={3} className={classes.logoFont}>
//             <Link to={`/${group_id}`}>2020주민자치박람회</Link>
//           </Grid>
//           <Grid item xs={6} className={classes.flexcenter}>
//             {boards.map((b, i) => (
//               <NavLink
//                 exact
//                 to={`/${group_id}/${b.id}`}
//                 key={i}
//                 className="boards"
//                 activeClassName="active"
//               >
//                 {b.title}
//               </NavLink>
//             ))}
//           </Grid>
//           <Grid item xs={3} className={classes.flexend}>
//             {currentUser?.email ? <LogoutButton /> : <LoginButton />}
//           </Grid>
//         </Grid>
//       </Toolbar>
//     </AppBar>
