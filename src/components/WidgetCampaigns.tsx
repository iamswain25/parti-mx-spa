import { makeStyles } from "@material-ui/core";
import useScript from "./useScript";
import group4 from "../assets/images/group4.png";
import illust from "../assets/images/illust.png";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: 533,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#c1e4ff",
      position: "relative",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(2),
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
      },
    },
    imgContainer: {
      position: "relative",
      flex: 1,
      overflow: "hidden",
    },
    group4: {
      [theme.breakpoints.up("md")]: {
        top: 20,
        left: 11,
      },
      [theme.breakpoints.down("sm")]: {
        top: 19,
        left: 19,
      },

      position: "absolute",
    },
    illust: {
      position: "absolute",
      bottom: 0,
      right: 0,
    },
    campaigns: {
      backgroundColor: "#fff",
    },
  };
});

export default function WidgetCampaigns() {
  const classes = useStyles();
  const status = useScript(
    "https://campaigns.kr/campaigns/widget/v1/sdk.js?campaign_id=281&amp;component_height=100%25&amp;component_width=100%25&amp;component_template=sm&amp;target_query=%23parti-campaigns"
  );
  console.log(status);
  return (
    <section className={classes.root}>
      <div className={classes.imgContainer}>
        <img src={group4} alt="group4" className={classes.group4} />
        <img src={illust} alt="illust" className={classes.illust} />
      </div>
      <div id="parti-campaigns" className={classes.campaigns} />
    </section>
  );
}
