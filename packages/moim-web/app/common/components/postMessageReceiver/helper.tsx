import { WHITE_LIST_OF_POST_MESSAGE_ORIGIN_REGEX } from "common/constants/hosts";
import { POST_MESSAGE_SOURCE } from "app/common/constants/default";
import safeParseJSON from "common/helpers/safeParseJSON";

export function postMessageParser(
  e: MessageEvent,
): Moim.ICustomPostMessage | null {
  if (
    WHITE_LIST_OF_POST_MESSAGE_ORIGIN_REGEX.test(e.origin) ||
    e.origin === location.origin
  ) {
    const data = safeParseJSON(e.data);
    if (data?.source === POST_MESSAGE_SOURCE) {
      return data.payload;
    }
    return null;
  }
  return null;
}
