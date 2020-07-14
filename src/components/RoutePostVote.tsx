import React from "react";
import useNavigateToPost from "./useNavigateToPost";
import { Post } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box, Button, Divider } from "@material-ui/core";
import BoardPostSub2 from "./BoardPostSub2";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import useDesktop from "./useDesktop";
import { calculateDays } from "../helpers/datefns";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RoutePostVoteCandidate from "./RoutePostVoteCandidate";
import GreyDivider from "./GreyDivider";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      borderBottom: `1px solid ${grey[200]}`,
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        // height: 145,
      },
    },
    title: {
      [theme.breakpoints.down("sm")]: {
        letterSpacing: -0.35,
      },
    },
    titleContainer: {
      cursor: "pointer",
      display: "flex",
      overflow: "hidden",
      maxHeight: theme.spacing(6),
    },
    body: {
      maxHeight: theme.spacing(5),
      marginBottom: theme.spacing(1),
      overflow: "hidden",
    },
    icon: {
      width: 15,
      height: 17,
      marginRight: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        width: 12,
        height: 13,
      },
    },
    btnLight: {
      backgroundColor: theme.palette.primary.light,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bbe7d6",
      color: theme.palette.primary.dark,
    },
    btnDark: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
  };
});

export default function RoutePostVote({ post: p }: { post: Post }) {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  const navigatePost = useNavigateToPost(p.id);
  const daysLeft = calculateDays(p.created_at) ?? 30;
  const [isVoted, setVoted] = React.useState(false);
  React.useEffect(() => {
    setVoted(!!p.meLiked?.[0]?.like_count);
  }, [p]);
  const [totalVoteCount, maxVoteCount] = React.useMemo(() => {
    return [
      p?.candidates?.reduce(
        (p, c) => p + c?.votes_aggregate?.aggregate?.sum?.count || 0,
        0
      ),
      Math.max(
        ...(p?.candidates?.map(
          (c) => c?.votes_aggregate?.aggregate?.sum?.count || 0
        ) ?? [])
      ),
    ];
  }, [p]);
  return (
    <>
      <div className={classes.container}>
        <Grid container direction="row" alignItems="center">
          <HowToVoteIcon color="primary" className={classes.icon} />
          <Box color="primary.dark">
            <Typography variant="body2">{daysLeft}일 남음</Typography>
          </Box>
        </Grid>
        <Box className={classes.titleContainer} mt={1} onClick={navigatePost}>
          <Typography
            variant={isDesktop ? "h3" : "h4"}
            color="textPrimary"
            className={classes.title}
          >
            {p.title}
          </Typography>
        </Box>
        {!isDesktop && (
          <>
            <Box mt={1}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-between"
              >
                <Box color="grey.600" fontWeight={400}>
                  <Typography variant="body2">
                    참여자 {p.users_aggregate.aggregate.sum.like_count}명
                  </Typography>
                </Box>
                {isVoted && (
                  <Box
                    color="primary.dark"
                    fontWeight={500}
                    display="flex"
                    alignItems="center"
                  >
                    <Typography variant="body2">투표완료</Typography>
                    <CheckCircleIcon
                      color="primary"
                      style={{ width: 14, height: 14 }}
                    />
                  </Box>
                )}
              </Grid>
            </Box>
            <Box mt={1}>
              {p.candidates.map((c, i) => (
                <RoutePostVoteCandidate
                  candidate={c}
                  voted={isVoted}
                  max={maxVoteCount}
                  total={totalVoteCount}
                  key={i}
                />
              ))}
            </Box>
            <Box color="common.white" fontWeight={500} mt={2} pb={2}>
              {isVoted ? (
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.btnLight}
                >
                  다시 투표하기
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.btnDark}
                >
                  투표하기
                </Button>
              )}
            </Box>

            <Box marginX={-1}>
              <Divider light />
            </Box>
          </>
        )}
        <Box mt={2}>
          <BoardPostSub2 post={p} />
        </Box>
      </div>
      {!isDesktop && <GreyDivider />}
    </>
  );
}
