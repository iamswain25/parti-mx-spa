import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

export default function useDesktop() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return isDesktop;
}
