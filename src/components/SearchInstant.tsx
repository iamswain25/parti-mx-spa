// import { Post } from "../types";
import algoliasearch from "algoliasearch/lite";
import SearchInstantPost from "./SearchInstantPost";
import { useParams } from "react-router-dom";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Configure,
} from "react-instantsearch-dom";
const client = algoliasearch("6HUA4GMFJJ", "6310f1a94693ca85bf55899a686f05a5");
export default function SearchInstant() {
  const { group_id } = useParams<{ group_id: string }>();
  return (
    <InstantSearch indexName="gyeonggiVillage" searchClient={client}>
      <h1>검색</h1>
      <Configure hitsPerPage={4} filters={`group_id:${group_id}`} />
      <SearchBox />
      <Hits hitComponent={SearchInstantPost} />
      <Pagination />
    </InstantSearch>
  );
}
