import { MoimURL } from "common/helpers/url";

export function getIsForumShow(location: string) {
  return (
    MoimURL.ShowForumThread.isSame(location) ||
    MoimURL.FocusedShowForumThread.isSame(location)
  );
}
