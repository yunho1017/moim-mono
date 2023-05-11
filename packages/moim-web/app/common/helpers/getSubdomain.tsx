import { isBrowser, isProd, isDev } from "common/helpers/envChecker";
import { defaultMemoize } from "reselect";
import { PRODUCTION_HOST, STAGE_HOST, DEV_HOST } from "common/constants/hosts";

const extractSubDomainValue = defaultMemoize((hostname: string) => {
  const hostnameArr = hostname.split(".");
  if (hostnameArr.length > 2) {
    return hostnameArr[0];
  }
  return "";
});

export function getSubdomain(pathname?: string) {
  if (isBrowser()) {
    return extractSubDomainValue(pathname || location.hostname);
  }
  return "";
}

export function isPathnameIncludeMoimHost(pathname?: string) {
  let targetPathname = pathname;
  if (isBrowser()) {
    targetPathname = pathname || location.hostname;
  }

  return targetPathname?.includes(
    isProd() ? PRODUCTION_HOST : isDev() ? DEV_HOST : STAGE_HOST,
  );
}
