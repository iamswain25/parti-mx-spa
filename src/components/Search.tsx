import React from "react";
import { Divider, Hidden, Typography, Container } from "@material-ui/core";
import SearchInput from "./SearchInput";
import HeaderBack from "./HeaderBack";
// import { Post } from "../types";
import SearchSuggestion from "./SearchSuggestion";
import algoliasearch from "algoliasearch";
import { RequestOptions } from "@algolia/transporter";
import { useParams } from "react-router-dom";
const client = algoliasearch("6HUA4GMFJJ", "6310f1a94693ca85bf55899a686f05a5");
const index = client.initIndex("green-newdeal");
export default function Search() {
  const { group_id } = useParams<{ group_id: string }>();
  const [keyword, setKeyword] = React.useState("");
  const [result, setResult] = React.useState<undefined | any>(undefined);
  React.useEffect(() => {
    const options: RequestOptions = {
      hitsPerPage: 20,
      facetFilters: [`group_id:${group_id}`],
    };
    index.search(keyword, options).then(setResult);
  }, [keyword, group_id]);
  console.log(result);
  return (
    <>
      <Hidden mdUp>
        <HeaderBack
          title="검색"
          right={<div style={{ width: 24, height: 24, fontSize: 20 }} />}
        />
      </Hidden>
      <Divider />
      <Container maxWidth="lg">
        <SearchInput keyword={keyword} setKeyword={setKeyword} />
        {keyword &&
          (result?.hits?.length ? (
            result?.hits?.map((p: any, i: number) => {
              return <SearchSuggestion key={p.objectId || i} post={p} />;
            })
          ) : (
            <Container>
              <Typography variant="h4">검색 결과가 없습니다</Typography>
            </Container>
          ))}
      </Container>
    </>
  );
}
