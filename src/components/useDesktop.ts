import { useTheme, Theme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

export default function useDesktop(): [boolean, Theme] {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return [isDesktop, theme];
}
