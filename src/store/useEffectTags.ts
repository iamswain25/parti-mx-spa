import React from "react";
import { useLocation } from "react-router-dom";
import { useChipsData } from "./useGlobalState";
export default function useEffectTags() {
  const { state } = useLocation<{ tag?: string }>();
  const tag = state?.tag;
  const [, setChipData] = useChipsData();
  React.useEffect(() => {
    if (!tag) return;
    setChipData(chips => {
      if (!chips) return;
      const chip = chips?.find(c => c.label === tag);
      if (chip) {
        chip.selected = true;
        return [...chips];
      } else {
        return [...chips, { label: tag, selected: true }];
      }
    });
  }, [tag, setChipData]);
}
