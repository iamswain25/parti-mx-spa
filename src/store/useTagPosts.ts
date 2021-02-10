import React from "react";
import { ChipData, Post, UsePostProps } from "../types";
// import useTagChips from "../components/useTagChips";
import usePosts from "./usePosts";
import { useChipsData } from "./useGlobalState";
export default function useTagPosts(
  props: UsePostProps,
): [
  Post[] | undefined,
  ChipData[] | undefined,
  (u: React.SetStateAction<ChipData[] | undefined>) => void,
] {
  const [posts] = usePosts(props);
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
