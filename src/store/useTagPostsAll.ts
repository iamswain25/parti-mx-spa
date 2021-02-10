import React from "react";
import { ChipData, Post } from "../types";
// import useTagChips from "../components/useTagChips";
import useAllPosts from "./useAllPosts";
import { useChipsData } from "./useGlobalState";
export default function useTagPostsAll(): [
  Post[] | undefined | null,
  ChipData[] | undefined,
  (u: React.SetStateAction<ChipData[] | undefined>) => void,
] {
  const [posts] = useAllPosts();
  // const [chipData, setChipData] = useTagChips(posts);
  const [chipData, setChipData] = useChipsData();
  const selectedTags = React.useMemo(
    () => chipData?.filter(c => c.selected).map(c => c.label),
    [chipData],
  );
  const selectedPosts = React.useMemo(
    () =>
      selectedTags?.length
        ? posts?.filter(p =>
            selectedTags?.every((t: string) => p.tags?.includes(t)),
          )
        : posts,
    [selectedTags, posts],
  );
  return [selectedPosts, chipData, setChipData];
}
