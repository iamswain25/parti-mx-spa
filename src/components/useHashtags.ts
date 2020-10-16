import React from "react";
import { defaultHashtags } from "../helpers/options";
import { ChipData } from "../types";

export default function useHashtags(): [
  ChipData[],
  React.Dispatch<React.SetStateAction<ChipData[]>>,
  string[] | null
] {
  const [chipData, setChipData] = React.useState<ChipData[]>(
    defaultHashtags.map((c) => ({ label: c, selected: false }))
  );
  const selectedTags = chipData.filter((c) => c.selected).map((c) => c.label);

  return [chipData, setChipData, selectedTags.length > 0 ? selectedTags : null];
}
