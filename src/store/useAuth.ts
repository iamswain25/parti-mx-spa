import { firestore, auth } from "../config/firebase";
// import { useGlobalState, keys } from "./useGlobalState";
export default function useAuth(): [firebase.User | null] {
  return [auth.currentUser];
}
