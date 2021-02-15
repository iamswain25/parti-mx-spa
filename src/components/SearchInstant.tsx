import algoliasearch from "algoliasearch/lite";
import { useParams } from "react-router-dom";
import {
  InstantSearch,
  SearchBox,
  Pagination,
  Configure,
  Stats,
  Menu,
  MenuSelect,
} from "react-instantsearch-dom";
import { CustomHits } from "./CustomHits";
import { makeStyles, LinearProgress, Grid } from "@material-ui/core";
import { useBoards } from "../store/useGlobalState";
import useDesktop from "./useDesktop";
const client = algoliasearch("6HUA4GMFJJ", "6310f1a94693ca85bf55899a686f05a5");
const useStyles = makeStyles(theme => {
  return {
    resultHeader: {
      borderBottom: "1px solid " + theme.palette.divider,
      fontSize: 20,
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: "flex",
    },
    resultCategory: {
      [theme.breakpoints.up("lg")]: {
        marginLeft: theme.spacing(4),
      },
    },
    marginRight: {
      marginRight: 5,
    },
  };
});
export default function SearchInstant() {
  const { group_id } = useParams<{ group_id: string }>();
  const classes = useStyles();
  const [boards] = useBoards();
  const [isDesktop] = useDesktop();
  if (boards === undefined) {
    return <LinearProgress />;
  }
  return (
    <InstantSearch indexName="green-newdeal" searchClient={client}>
      <SearchBox
        translations={{
          placeholder: "검색어를 입력하세요",
        }}
      />
      <div className={classes.resultHeader}>
        <span className={classes.marginRight}>검색결과</span>
        <Stats
          translations={{
            stats(nbHits) {
              return `${nbHits}`;
            },
          }}
        />
        <div>
          {!isDesktop ? (
            <MenuSelect
              attribute="board_id"
              transformItems={(items: any[]) =>
                items.map(item => ({
                  ...item,
                  label: boards?.find(board => board.id === item.label)?.title,
                }))
              }
            />
          ) : null}
        </div>
      </div>
      <Grid container className={classes.resultCategory}>
        {isDesktop ? (
          <Grid item xs={1}>
            <Menu
              attribute="board_id"
              transformItems={(items: any[]) =>
                items.map(item => ({
                  ...item,
                  label: boards?.find(board => board.id === item.label)?.title,
                }))
              }
            />
          </Grid>
        ) : null}

        <Grid item xs>
          <Configure hitsPerPage={5} filters={`group_id:${group_id}`} />
          <CustomHits />
          <Pagination showLast />
        </Grid>
      </Grid>
    </InstantSearch>
  );
}
