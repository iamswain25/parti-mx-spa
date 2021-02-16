import { makeStyles, Container, Typography, Grid } from "@material-ui/core";
import introImg from "../assets/images/intro-image.png";
import dot from "../assets/images/dot.png";
import useDesktop from "./useDesktop";
const useStyles = makeStyles(theme => {
  return {
    title: {
      color: "#4e8545",
      marginTop: theme.spacing(5),
      fontWeight: 700,
      letterSpacing: "2px",
      [theme.breakpoints.down("xs")]: {
        fontSize: 18,
        marginTop: theme.spacing(1),
      },
      "& > span": {
        color: "white",
        backgroundColor: "#4e8545",
        marginRight: 2,
        display: "inline",
      },
    },
    subtitle: {
      color: "#4e8545",
      fontWeight: 700,
      letterSpacing: "1.2px",
      [theme.breakpoints.down("xs")]: {
        fontSize: 16,
      },
    },
    preface: {
      color: "#757575",
      maxWidth: "860px",
      wordBreak: "break-all",
      "& > h5": {
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
          fontSize: 14,
        },
        "& > span:not(.line-through)": {
          color: "white",
          backgroundColor: "#7eba74",
          fontWeight: 500,
          lineHeight: 1.7,
        },
        "& > span:is(.line-through)": {
          textDecoration: "line-through",
        },
      },
      "& > h6": {
        textAlign: "right",
        color: "#9e9e9e",
        [theme.breakpoints.down("sm")]: {
          textAlign: "left",
          fontSize: 14,
        },
      },
    },
    section: {
      maxWidth: 850,
      marginTop: theme.spacing(7),
      "& ul": {
        listStyleImage: `url(${dot})`,
        [theme.breakpoints.down("xs")]: {
          paddingLeft: theme.spacing(2),
        },
        "& > li": {
          marginTop: theme.spacing(1),
          " & > h5": {
            color: "#757575",
            lineHeight: 1.5,
            wordBreak: "break-all",
            [theme.breakpoints.down("sm")]: {
              fontSize: 14,
            },
          },
        },
      },
      "& ol": {
        color: "#4e8545",
        padding: 0,
        " & li h5": {
          marginTop: theme.spacing(2),
          color: "#757575",
          lineHeight: 1.5,
          wordBreak: "break-all",
          [theme.breakpoints.down("sm")]: {
            fontSize: 14,
          },
        },
      },
      " & h6": {
        color: "#9e9e9e",
        marginTop: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
          fontSize: 14,
        },
      },
    },
    img: {
      maxWidth: 800,
      display: "block",
      margin: "auto",
      [theme.breakpoints.down("lg")]: {
        width: "90%",
      },
    },
    marginTop: {
      marginTop: theme.spacing(7),
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing(3),
      },
    },
  };
});
export default function IntroPage() {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  return (
    <>
      <Container component="header" maxWidth={isDesktop ? "lg" : "sm"}>
        <img
          src={isDesktop ? `/greenduck-logo.png` : `/ogp.png`}
          alt="greenduck logo"
        />
        <Typography className={classes.title} variant="h1" align="center">
          “우리 앞에 <span>녹색</span>전환이 <span>오리</span>라.”
        </Typography>
      </Container>
      <Container
        component="main"
        className={classes.marginTop}
        maxWidth={isDesktop ? "lg" : "sm"}
      >
        <Container component="section" className={classes.preface}>
          <Typography variant="h5">
            <span>
              녹색전환을 위한 지역 그린뉴딜 플랫폼 ‘녹색오리’에 오신 여러분을
              환영합니다.
            </span>{" "}
            녹색오리, 이름하여 ‘녹덕’(
            <span className="line-through">녹색덕후</span>)은 이 플랫폼의
            이름이자 이곳에 찾아와 녹색전환을 위해 한 걸음 걸어나가는
            여러분입니다.
          </Typography>
          <Typography variant="h5">
            <span>저기 그린스완이 옵니다.</span> 2020년 국제결제은행(BIS)는
            그린스완(녹색백조) 보고서를 발표하여 기후위기가 초래할 금융위기를
            그린스완에 비유했습니다. 한국은 1997년 IMF 금융위기의 경험이
            있습니다. 그린스완은 그보다 몇 갑절 크고 불확실하게 닥쳐올 실존적
            위험입니다. 기후위기와 코로나 환란으로 시름한 지난 한 해, 탄소중립
            사회로의 이행을 위한 대안으로 그린뉴딜이 떠올랐지만, 이는 아무도
            가보지 못한 험난한 길일지도 모릅니다.
          </Typography>
          <Typography variant="h5">
            <span>하지만, 여기 녹색오리가 있습니다.</span> 각각의 지역 공간에서
            살고 있는 오리들의 실천은 그린스완을 막아낼 잠재력을 가지고
            있습니다. 그런 녹색오리들의 무리를 상상합니다. 녹색전환의 과정에서
            우리는 어떤 변화를 만들어가야 할까요? 탄소중립 사회를 만드는 것이
            힘들고 고통스러운 일만은 아닐 겁니다. 지금까지와는 전혀 다른 세상의
            방식과 질서는 어쩌면 우리가 함께 논의하고 준비한다면 도전적이고
            즐거운 일이 될지도 모릅니다. 녹덕들의 날개짓으로 녹색전환을 일궈
            봅시다.
          </Typography>
          <Typography variant="h5">
            <span>
              녹색오리 플랫폼은 우리가 당면한 위기와 문제를 헤쳐갈 지혜와 방책을
              모으기 위한 토론과 숙의의 공론장입니다.
            </span>{" "}
            급박하게 만들어진 중앙정부의 그린뉴딜 안은 기후위기를 막아내고
            사회적 문제를 해결하기에는 아직 가야 할 길이 멀다는 평을 받고
            있습니다. 이를 보완하기 위해 이전의 정책결정과정과는 다른,
            아래로부터의 전환에 도전합니다. 이는 지역에 바탕을 두고,
            지속가능성과 순환을 품은 사회적 경제의 성격을 가질 것이며, 정의로운
            전환의 빛을 띨 것입니다. 녹색오리 플랫폼에서는 10대 기본의제를
            마중물 삼아, 전환의 과정에서 제기되는 여러 현안을 공론화하여, 정책을
            역제안할 것입니다. 시민·주민, 연구자, 활동가, 공무원 등 다채로운
            주체가 모여서 의견을 모아나가길 희망합니다.
          </Typography>
          <Typography variant="h5" component="h6">
            “신에게는 아직 17개의 광역오리와 226개의 기초오리가 남아있습니다…”
          </Typography>
        </Container>
        <Container component="section" className={classes.section}>
          <Typography variant="h2" align="center" className={classes.subtitle}>
            공론 절차와 공론 활용 방안
          </Typography>
          <img
            src={introImg}
            className={classes.img}
            alt="공론 절차와 공론 활용 방안"
          />
          <Grid container spacing={5}>
            <Grid item xs={12} lg={4}>
              <Typography variant="h4" className={classes.subtitle}>
                1. 제안
              </Typography>
              <ul>
                <li>
                  <Typography variant="h5">
                    녹색오리 공론장과 온라인 모임을 통해 지역의 녹색전환을 위한
                    그린뉴딜을 위해 해야 하는 이야기, 나눴으면 하는 이야기들을
                    키워드/지역과 엮어 꺼내고, 질문합니다.
                  </Typography>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography variant="h4" className={classes.subtitle}>
                2. 토론과 축적
              </Typography>
              <ul>
                <li>
                  <Typography variant="h5">
                    키워드/지역별로 제안된 의제에 대하여 토론하고 의견과 지혜를
                    모읍니다.
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5">
                    투표와 자문회의를 통하여 정책 대안을 선정하고, 토론 과정과
                    결과를 정리하고 축적합니다.
                  </Typography>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography variant="h4" className={classes.subtitle}>
                3. 정책 반영
              </Typography>
              <ul>
                <li>
                  <Typography variant="h5">
                    2021년 9, 10월(예정) 국회토론회에서 공론화를 통해 선정된
                    정책을 논의합니다.
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5">
                    지방정부 그린뉴딜 정책 분석 보고서를 통해 정책을 제안합니다.
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5">
                    정책을 지방정부에 권고하고, 지역 그린뉴딜 전략에 반영토록
                    합니다.
                  </Typography>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Container>
        <Container component="section" className={classes.section}>
          <Typography variant="h2" align="center" className={classes.subtitle}>
            녹색오리 공론장과 모임에 참여하는
          </Typography>
          <Typography variant="h2" align="center" className={classes.subtitle}>
            모두의 안전하고 평등한 문화를 위한 약속
          </Typography>
          <ol>
            <Grid container spacing={isDesktop ? 5 : 0}>
              <Grid item xs={12} lg={6}>
                <li>
                  <Typography variant="h5">
                    우리는 모두 녹색오리 공론장의 주체이며, 나이, 성별,
                    성적지향, 성정체성, 장애여부, 국적, 피부색, 출신지역,
                    혼인여부, 가족관계, 학력, 직업 등에 관계없이 동등합니다.
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5">
                    우리는 상호 높임말을 쓰고, 서로의 지식과 경험, 가치관,
                    취향을 존중합니다.
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5">
                    우리는 성차별을 포함한 모든 폭력과 혐오에 반대합니다.
                  </Typography>
                </li>
              </Grid>
              <Grid item xs={12} lg={6}>
                <li>
                  <Typography variant="h5">
                    우리는 서로의 이야기를 경청하고 기다리며, 쉽게 단정짓지
                    않습니다.
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5">
                    우리는 약속문을 어긴 발언/행위에 대해 문제를 제기하며, 문제
                    제기를 받은 참여자는 즉각 발언/행위를 중단합니다.
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5">
                    우리는 약속문을 어긴 발언/행위에 대해 재차 논의하며 다시 한
                    번 숙고하는 시간을 가집니다.
                  </Typography>
                </li>
              </Grid>
            </Grid>
          </ol>
          <Typography variant="h6" align="center">
            (참고자료: 녹색당 평등문화 약속문; 청년허브 &lt;N개의 공론장&gt;
            약속문)
          </Typography>
        </Container>
      </Container>
    </>
  );
}
