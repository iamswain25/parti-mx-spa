import React from "react";
import ListItem from "@material-ui/core/ListItem";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { OutlinedInput, InputAdornment, IconButton } from "@material-ui/core";
export default function SearchInput({
  keyword,
  setKeyword,
}: {
  keyword: string;
  setKeyword: (keyword: string) => void;
}) {
  return (
    <ListItem>
      <OutlinedInput
        fullWidth
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          keyword ? (
            <InputAdornment position="end">
              <IconButton onClick={() => setKeyword("")}>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ) : undefined
        }
      />
    </ListItem>
  );
}
