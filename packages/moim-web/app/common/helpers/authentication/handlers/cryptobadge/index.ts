import { getAuthorizeState } from "./helpers";

export default async function getCryptobadgeAuthentication(
  ...params: Parameters<typeof getAuthorizeState>
) {
  return getAuthorizeState(...params);
}
