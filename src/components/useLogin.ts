import { useGlobalState, keys } from "../store/useGlobalState";
import { useHistory } from "react-router-dom";
export default function useLogin() {
  const [, setVisible] = useGlobalState(keys.SHOW_LOGIN_MODAL);
  const history = useHistory();
  async function login() {
    setVisible(true);
  }
  async function signup() {
    history.push("/signup", { from: history.location.pathname });
  }
  return [login, signup];
}
