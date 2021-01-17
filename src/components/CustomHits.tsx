import React from "react";
import { connectHits } from "react-instantsearch-dom";
import CustomHit from "./CustomHit";

const Hits = ({ hits }: any) => {
  return (
    <ul>
      {hits.map((hit: any) => (
        <li key={hit.objectID}>
          <CustomHit hit={hit} />
        </li>
      ))}
    </ul>
  );
};

export const CustomHits = connectHits(Hits);
