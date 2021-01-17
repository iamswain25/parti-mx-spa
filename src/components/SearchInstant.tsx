import algoliasearch from "algoliasearch/lite";
import { useParams } from "react-router-dom";
import {
  InstantSearch,
  SearchBox,
  Pagination,
  Configure,
} from "react-instantsearch-dom";
import { CustomHits } from "./CustomHits";
const client = algoliasearch("6HUA4GMFJJ", "6310f1a94693ca85bf55899a686f05a5");
export default function SearchInstant() {
  const { group_id } = useParams<{ group_id: string }>();
  return (
    <InstantSearch indexName="green-newdeal" searchClient={client}>
      <h1>검색</h1>
      <Configure hitsPerPage={4} filters={`group_id:${group_id}`} />
      <SearchBox />
      <CustomHits />
      <Pagination />
    </InstantSearch>
  );
}
