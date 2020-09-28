import { useStore } from "../store/store";
import { useGlobalState, keys } from "../store/useGlobalState";
import { insertUserGroup } from "../graphql/mutation";
import { client } from "../config/ApolloSetup";
export default function useGroupJoin(refetch?: any, userCount = 1) {
  const [{ user_id, group_id }] = useStore();
  const [, setVisible] = useGlobalState(keys.SHOW_LOGIN_MODAL);
  async function handler() {
    if (user_id) {
      await client.mutate({
        mutation: insertUserGroup,
        variables: {
          group_id,
          status: userCount > 0 ? "user" : "organizer",
        },
      });
      refetch && refetch();
    } else {
      setVisible(true);
    }
  }
  return handler;
}
