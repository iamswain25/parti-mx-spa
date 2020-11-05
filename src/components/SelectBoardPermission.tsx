import React from "react";
import {
  Select,
  FormControl,
  InputLabel,
  Theme,
  useTheme,
  Chip,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { Controller } from "react-hook-form";
import { boardPermissionList } from "../helpers/options";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
function getStyles(
  value: string,
  list: { label: string; value: string }[],
  theme: Theme
) {
  return {
    fontWeight: list.find((i) => i.value === value)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function SelectBoardPermission({
  name,
  label,
  control,
  defaultValue,
}: any) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        as={
          <Select
            fullWidth
            multiple
            MenuProps={MenuProps}
            renderValue={(selected: any) => (
              <div className={classes.chips}>
                {selected.map((value: string) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
          >
            {boardPermissionList.map(({ label, value }) => (
              <MenuItem
                key={value}
                value={value}
                style={getStyles(value, boardPermissionList, theme)}
              >
                {label}
              </MenuItem>
            ))}
          </Select>
        }
      />
    </FormControl>
  );
}
