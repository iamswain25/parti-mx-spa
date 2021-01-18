import algoliasearch from "algoliasearch/lite";
import { useParams } from "react-router-dom";
import {
  InstantSearch,
  SearchBox,
  Pagination,
  Configure,
  Stats,
} from "react-instantsearch-dom";
import { CustomHits } from "./CustomHits";
import { makeStyles } from "@material-ui/core";
const client = algoliasearch("6HUA4GMFJJ", "6310f1a94693ca85bf55899a686f05a5");
const useStyles = makeStyles(theme => {
  return {
    searchResult: {
      borderBottom: "1px solid " + theme.palette.divider,
      fontSize: 20,
      padding: theme.spacing(2),
    },
  };
});
export default function SearchInstant() {
  const { group_id } = useParams<{ group_id: string }>();
  const classes = useStyles();
  return (
    <InstantSearch indexName="green-newdeal" searchClient={client}>
      <SearchBox />
      <div className={classes.searchResult}>
        <span>검색결과 </span>
        <Stats
          translations={{
            stats(nbHits) {
              return `${nbHits}`;
            },
          }}
        />
      </div>
      <Configure hitsPerPage={4} filters={`group_id:${group_id}`} />
      <CustomHits />
      <Pagination />
    </InstantSearch>
  );
}
