import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Link, NavLink } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { useBoards, useCurrentUser, useGroupId } from "../store/useGlobalState";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    "&>.title": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: 18,
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
      color: "#544f85",
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
}));

export default function DrawerBoards({ close }: { close: () => void }) {
  const classes = useStyles();
  const [group_id] = useGroupId();
  const [boards] = useBoards();
  const [currentUser] = useCurrentUser();
  return (
    <section className={classes.root}>
      <div className="title">
        <Link to={`/${group_id}`} onClick={close}>
          <img src={`/bi.png`} alt="bi" />
        </Link>
        <IconButton onClick={close}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.container}>
        {boards.map((b) => (
          <NavLink
            exact
            to={`/${group_id}/${b.id}`}
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
