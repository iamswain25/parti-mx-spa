import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography, Grid, Box } from "@material-ui/core";
import GreyDivider from "./GreyDivider";
import group8 from "../assets/images/group8.png";
import group82x from "../assets/images/group8@2x.png";
import group83x from "../assets/images/group8@3x.png";
import group6 from "../assets/images/group6.png";
import group62x from "../assets/images/group6@2x.png";
import group63x from "../assets/images/group6@3x.png";
import StickyBtn from "./StickyBtn";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(5),
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
    titleContainer: {
      borderBottom: `1px solid ${grey[400]}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {},
    },
    img: { width: "100%" },

    imageCaption: {
      padding: theme.spacing(1),
      fontSize: 12,
      lineHeight: 1.5,
      letterSpacing: -0.5,
      color: "#ffffff",
      backgroundColor: "#616161",
    },
    imageDesc: {
      fontSize: 12,
      lineHeight: 1.5,
      letterSpacing: -0.26,
      color: "#757575",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
    body: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "23px",
      letterSpacing: -0.5,
      color: "#424242",
    },
    quote: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      fontSize: 18,
      fontWeight: 500,
      lineHeight: "23px",
      letterSpacing: -0.64,
      textAlign: "center",
      color: "#212121",
    },
  };
});

export default function HomeMain() {
  const classes = useStyles();
  return (
    <>
      <section className={classes.container}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Typography variant="h2" color="textPrimary">
            <Box fontWeight="bold">셰어런팅, 문제는 없을까요?</Box>
          </Typography>
        </Grid>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <img
                src={group8}
                alt="group8"
                srcSet={`${group82x} 2x, ${group83x} 3x`}
                className={classes.img}
              />
              <div className={classes.imageCaption}>
                어린이집 버스를 이용하는 등원 과정에서 아동이 다니는 어린이집의
                명칭이 여과없이 노출되어 아동이 거주하는 동네가 드러날 위험이
                있습니다.
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img
                src={group6}
                alt="group6"
                srcSet={`${group62x} 2x, ${group63x} 3x`}
                className={classes.img}
              />
              <div className={classes.imageCaption}>
                출생카드에는 아동의 성별과 생년월일시, 보호자의 성명 등이
                포함되어 있고, 병원의 이름이 드러나 있어 아동의 거주 지역을
                짐작할 수 있습니다.
              </div>
            </Grid>
          </Grid>
          <div className={classes.imageDesc}>
            예시 사진에서는 아동의 개인정보를 보호하기 위해 해당 정보들을 모두
            흐릿하게 가렸습니다.
          </div>
          <div className={classes.body}>
            SNS에는 아이가 우는 모습이나 배변 훈련을 하는 모습, 목욕하는 모습 등
            아동이 조금 더 성장해서 그 게시물을 본다면 부끄럽거나 감추고 싶어할
            만한 게시물이 올라오기도 합니다. 이러한 게시물은 자신의 정체성을
            형성해가는 아동에게 부정적인 영향을 미칠 수 있고, 또래 친구들에게
            놀림 거리가 될 위험도 있습니다.
            <br />
            <br />
            또한 일상의 사진과 글을 올릴 때 충분한 주의를 기울이지 않으면 아동이
            사는 곳과 생년월일, 다니는 어린이집 등 개인정보가 의도치 않게 공개될
            수 있습니다. 한 게시물에 담긴 아동의 정보가 많지 않더라도 다른
            게시물에 담긴 정보와 조합되면 더욱 상세한 개인정보가 드러나기도
            합니다.
            <br />
            <br />
            보호자가 아이와 보내는 일상을 공개하는 것에는 분명 유익한 점도
            있습니다. 평범한 양육의 경험을 나누면서 온라인과 오프라인에서
            공동체를 형성할 수 있고 비슷한 상황에 놓인 보호자와 지혜나 위로를
            나누며 양육에 도움을 얻을 수도 있습니다. 하지만 무심코 올린 아이의
            일상이 아이를 위험에 빠뜨릴 수 있다는 점을 우리는 생각해보아야
            합니다. 또한 셰어런팅이 자신의 프라이버시를 침해한다는 아이들의
            목소리에 귀 기울여야 합니다.
            <br />
            <br />
            '셰어런팅 다시보기 프로젝트- 아이의 사생활, 좋아요!?'는 과도한
            셰어런팅으로 아동의 안전과 권리를 침해할 수 있는 상황들을 함께
            알아보고 해결책을 찾기 위해 만들어졌습니다.
            <br />
            <br />
            "아이의 사생활, 좋아요!?"에서 함께 이야기를 나누고 싶은 콘텐츠를
            발견하셨다면 아래 링크를 통해 세이브더칠드런에 알려주세요. 아동의
            개인정보가 노출되지 않도록 변경한 뒤 새로운 글로 올리겠습니다.
            <br />
            <br />
          </div>
          <div className={classes.quote}>
            “이것도 셰어런팅 아닐까요?" 함께 이야기 나누고 싶은 게시물을
            발견했다면?”
          </div>
          <StickyBtn />
        </div>
      </section>
      <GreyDivider />
    </>
  );
}
