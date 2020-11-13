// import React from "react";
// import SuggestionEdit from "./SuggestionEdit";
// import NoticeEdit from "./NoticeEdit";
// import VoteEdit from "./VoteEdit";
// import EventEdit from "./EventEdit";
// import usePost from "../store/usePost";
// import { LinearProgress } from "@material-ui/core";
// import Forbidden from "./Forbidden";
// import { useGroupId } from "../store/useGlobalState";

// export default function RoutePostEdit() {
//   const [p] = usePost();
//   const [groupId, setGroupId] = useGroupId();
//   React.useEffect(() => {
//     if (p && groupId !== p?.group_id) {
//       setGroupId(p.group_id);
//     }
//   }, [p, groupId, setGroupId]);
//   if (p === undefined) {
//     return <LinearProgress />;
//   } else if (p === null) {
//     return <Forbidden noPost />;
//   }
//   switch (p?.type) {
//     case "notice":
//       return <NoticeEdit post={p} />;
//     case "vote":
//       return <VoteEdit post={p} />;
//     case "suggestion":
//       return <SuggestionEdit post={p} />;
//     case "event":
//       return <EventEdit post={p} />;
//     default:
//       return null;
//   }
// }
