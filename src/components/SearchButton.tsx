import React from "react";
import { Link } from "react-router-dom";
import { useGroupId } from "../store/useGlobalState";
import SearchIcon from "@material-ui/icons/Search";
export default function SearchButton() {
  const [group_id] = useGroupId();
  return (
    <Link
      to={`/${group_id}/search`}
      style={{
        display: "flex",
        alignItems: "center",
        padding: 10,
      }}
    >
      <SearchIcon />
    </Link>
  );
}
