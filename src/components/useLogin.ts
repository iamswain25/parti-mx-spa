import { useHistory } from "react-router-dom";
import { useLoginModal } from "../store/useGlobalState";
export default function useLogin() {
  const [, setVisible] = useLoginModal();
  const history = useHistory();
  async function login() {
    setVisible(true);
  }
  async function signup() {
    history.push("/signup", { from: history.location.pathname });
  }
  return [login, signup];
}
