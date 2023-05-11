import { getSubdomain } from "./getSubdomain";
import { isProd, isDev, isTest, isStage } from "common/helpers/envChecker";
import {
  STAGE_HOST,
  PRODUCTION_HOST,
  STAGE_ANALYTICS_HOST,
  PRODUCTION_ANALYTICS_HOST,
} from "common/constants/hosts";

export function getCommerceAPIDomain() {
  const domain = location.hostname;

  /**
   * For Prod Test
   */
  if (domain.includes("youcanweb3consulting.net")) {
    return "https://payment.youcanweb3consulting.net";
  }

  /**
   * For Staging Test
   */
  if (domain.includes("moim.mobi")) {
    return "https://payment.moim.mobi";
  }

  if (isProd()) {
    return `https://payment.moim.co`;
  }
  return `https://payment.vingle.network`;
}

export function getCommunityServiceAPIDomain() {
  if (isProd()) {
    return "https://service.canlab.co";
  }
  return "https://community-service.moim.mobi";
}

export function getCoinbaseAPIDomain() {
  return "https://api.coinbase.com";
}

export function getStagingDomainFromDevelopment() {
  // TODO: isStage() for temporary case. before new api end-point release.
  if (isDev() || isStage() || isTest()) {
    return `https://${STAGE_HOST}/api`;
  } else {
    throw new Error(
      `This function(getStagingDomainFromDevelopment) can use only development moim mode`,
    );
  }
}

export function getApiDomain() {
  const domain = location.hostname;

  /**
   * For Prod Test
   */
  if (domain.includes("youcanweb3consulting.net")) {
    return "https://api.youcanweb3consulting.net/api";
  }

  /**
   * For Staging Test
   */
  if (domain.includes("moim.mobi")) {
    return "https://api.moim.mobi/api";
  }

  // ? `https://api.${PRODUCTION_HOST}`
  return isProd()
    ? `https://${PRODUCTION_HOST}/api`
    : getStagingDomainFromDevelopment();
}

export function getInitialGroupIdHostname() {
  return isProd()
    ? `https://${getSubdomain()}.${PRODUCTION_HOST}/api`
    : `https://${getSubdomain()}.${STAGE_HOST}/api`;
}

export function getOriginDomain() {
  return isDev() || isTest()
    ? `${getSubdomain()}.${STAGE_HOST}`
    : location.hostname;
}

export function getAnalyticsApiDomain() {
  return isProd()
    ? `https://${PRODUCTION_ANALYTICS_HOST}/cubejs-api/v1`
    : `https://${STAGE_ANALYTICS_HOST}/cubejs-api/v1`;
}

export function getCanPassAPIDomain() {
  if (isProd()) {
    return `https://canpass.me`;
  }
  return `https://test.canpass.me`;
}

export function getCryptoBadgeAPIDomain() {
  if (isProd()) {
    return `https://api.cryptobadge.xyz/api`;
  }
  return `https://dev.api.cryptobadge.xyz/m1/api`;
}
