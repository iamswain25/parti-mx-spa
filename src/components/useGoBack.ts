import { useHistory } from "react-router-dom";

export default function useGoBack() {
  const history = useHistory();
  function back() {
    if (history.length < 3) {
      return history.replace("/");
    } else {
      history.goBack();
    }
  }
  return back;
}
