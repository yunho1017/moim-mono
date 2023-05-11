import { getAuthorizeState } from "./helpers";

export default async function getMoimAuthentication(
  ...params: Parameters<typeof getAuthorizeState>
) {
  return getAuthorizeState(...params);
}
