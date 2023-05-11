import * as Sentry from "@sentry/browser";
import axios, { AxiosError } from "axios";
import { EventHint, Event as SentryEvent } from "@sentry/types";
import { env, isBrowser } from "common/helpers/envChecker";
import { SENTRY_KEY_PATH } from "common/constants/sentry";

const RELEASE_REGEX = /([\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}-[\d]{2}-[\d]{2}\.[\d]{3}Z)/;
const VINGLE_SCRIPT_REGEX = /vingle\.net/;

let release: string = "";
let requestId: string = "";
if (isBrowser()) {
  const bundleScript = document.querySelector<HTMLScriptElement>(
    "script[src*=bundle]",
  );

  if (bundleScript) {
    const releaseMatch = RELEASE_REGEX.exec(bundleScript.src);
    if (releaseMatch) {
      release = releaseMatch[0];
    }
  }

  const requestIdMetaElement = document.querySelector<HTMLMetaElement>(
    "meta[name='vingle-request-id']",
  );

  if (requestIdMetaElement) {
    requestId = requestIdMetaElement.getAttribute("content") as string;
  }
}

function isAxiosError(error: any): error is AxiosError {
  return Boolean(error && (error as AxiosError).isAxiosError);
}

const IGNORE_ERROR_STATUS = [422, 403];

function beforeSendSentry(event: SentryEvent, hint: EventHint) {
  const error = hint.originalException;
  if (!error) {
    return null;
  }
  if (
    isAxiosError(error) &&
    error.response &&
    (error.response.status < 400 ||
      IGNORE_ERROR_STATUS.includes(error.response.status))
  ) {
    return null;
  }
  if (axios.isCancel(error)) {
    return null;
  }
  return event;
}

if (env.stage === "prod") {
  Sentry.init({
    dsn: SENTRY_KEY_PATH,
    environment: env.platform,
    release,
    whitelistUrls: [VINGLE_SCRIPT_REGEX],
    sampleRate: 0.1,
    beforeSend: beforeSendSentry,
  });
  Sentry.setExtras({
    requestId,
  });
}

if (/padobox\./.test(location.hostname)) {
  Sentry.init({
    dsn: SENTRY_KEY_PATH,
    environment: "debug",
    release,
    whitelistUrls: [VINGLE_SCRIPT_REGEX],
  });
  Sentry.setExtras({
    requestId,
  });
}

export function logException({
  error,
  context,
  level,
}: {
  error: Error;
  context?: any;
  level?: Sentry.Severity;
}) {
  if (!error || env.stage === "test") {
    return;
  }

  if (env.platform === "server") {
    // Logging for ServerSideRendering Lambda
    // eslint-disable-next-line no-console
    console.log(
      JSON.stringify({
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
          context,
        },
      }),
    );
  }

  Sentry.withScope(scope => {
    scope.setLevel(level || Sentry.Severity.Error);
    if (context) {
      scope.setExtras({
        context,
      });
    }
    Sentry.captureException(error);
  });

  return Sentry.lastEventId();
}

export const checkAndLogException = (fallbackError: Error, err: any) => {
  if (err instanceof Error) {
    return logException({ error: err });
  } else {
    return logException({ error: fallbackError, context: err });
  }
};

export const sentryDebugLog = (msg: string, extras?: any) => {
  Sentry.withScope(scope => {
    scope.setLevel(Sentry.Severity.Debug);
    if (extras) {
      scope.setExtras({
        extras,
      });
    }
    Sentry.captureException(msg);
  });
};
