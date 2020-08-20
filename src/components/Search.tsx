import React from "react";
import { useStore } from "../store/store";
import { searchPosts } from "../graphql/query";
import { useQuery } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import { Divider, Hidden, Typography, Container } from "@material-ui/core";
import SearchInput from "./SearchInput";
import HeaderBack from "./HeaderBack";
import { Post } from "../types";
import SearchSuggestion from "./SearchSuggestion";

export default function Search() {
  const [{ user_id, group_id }] = useStore();
  const [keyword, setKeyword] = React.useState("");
  const { loading, data, error } = useQuery(searchPosts, {
    variables: {
      searchKeyword: `%${keyword}%`,
      group_id,
      tags: keyword.split(/[\s,;#]+/),
      user_id,
    },
    fetchPolicy: "network-only",
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const results = data?.mx_posts as Post[];
  return (
    <>
      <Hidden mdUp>
        <HeaderBack
          title="검색"
          right={<div style={{ width: 24, height: 24 }} />}
        />
      </Hidden>
      <Divider />
      <Container maxWidth="lg">
        <SearchInput keyword={keyword} setKeyword={setKeyword} />
        {keyword &&
          (results?.length ? (
            results?.map((p, i) => {
              return <SearchSuggestion key={i} post={p} />;
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
