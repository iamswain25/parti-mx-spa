import React from "react";
import { useChipsData } from "../store/useGlobalState";
import { ChipData, Post } from "../types";

export default function useTagChips(posts?: Post[] | null) {
  const states = useChipsData();
  const [, setChipData] = states;
  React.useEffect(() => {
    if (posts) {
      const tagsObj = posts?.reduce<any>((prev, curr) => {
        curr?.tags?.forEach(label => {
          if (prev[label]) {
            prev[label].count++;
          } else {
            prev[label] = { label, selected: false, count: 1 };
          }
        });
        return prev;
      }, {});
      const tagsArr = Object.values(tagsObj) as ChipData[];
      tagsArr.sort((a, b) => (a.label > b.label ? 1 : -1));
      setChipData(tagsArr);
    }
  }, [posts, setChipData]);
  return states;
}
// React.useEffect(() => {
//   firestore
//     .collection("$PARAMS$")
//     .doc("tags")
//     .get()
//     .then((snapshot) => {
//       const tagsObj = snapshot.data() as any;
//       const tagsArr = Object.keys(tagsObj).map((c) => ({
//         label: c,
//         selected: false,
//       }));
//       setChips(tagsArr);
//     });
// }, [setChips]);
