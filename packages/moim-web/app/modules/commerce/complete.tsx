import * as React from "react";
import { AnalyticsClass } from "common/helpers/analytics/analytics";
import { qs } from "url-parse";
import _ from "lodash";

const CommerceCheckoutComplete: React.FC = ({}) => {
  const [url, setUrl] = React.useState<string | undefined>();
  const frameRef = React.useRef<HTMLIFrameElement | null>();

  React.useEffect(() => {
    const analytics = AnalyticsClass.getInstance();
    const params = qs.parse(location.search) as { [key: string]: string };

    const eventParams = params.eventData;
    const successUrl = params.successUrl;

    if (eventParams) {
      const parsed = JSON.parse(decodeURIComponent(eventParams as string));

      analytics.purchase({
        transactionId: parsed.transactionId,
        value: parsed.totalPrice,
        currency: parsed.currency,
        items: parsed.items,
      });

      const successUrlDecoded = decodeURIComponent(successUrl);
      const successUrlObject = new URL(successUrlDecoded);
      const successUrlParams = qs.parse(successUrlObject.search) as {
        [key: string]: string;
      };

      _.assign(
        successUrlParams,
        _.omitBy(
          {
            moimToken: params.moimToken,
            callbackUrl: params.callbackUrl,
            callbackContinueUrl: params.callbackContinueUrl,
          },
          // eslint-disable-next-line @typescript-eslint/unbound-method
          _.isUndefined,
        ),
      );

      setUrl(
        `${successUrlObject.origin}${successUrlObject.pathname}?${qs.stringify(
          successUrlParams,
        )}`,
      );
    }
  }, []);

  if (!url) {
    return <div />;
  }

  const actualVh = window.innerHeight;

  return (
    <iframe
      ref={_ref => (frameRef.current = _ref)}
      onLoad={() => {
        const params = qs.parse(location.search) as { [key: string]: string };
        const successUrl = params.successUrl;

        const parsed = new URL(decodeURIComponent(successUrl));

        if (frameRef.current?.contentWindow?.location) {
          const frameLocation = frameRef.current!.contentWindow!.location;
          if (parsed.pathname !== frameLocation.pathname) {
            location.href = frameLocation.href;
          }
        }
      }}
      src={url}
      style={{
        width: "100vw",
        height: `${actualVh}px`,
        border: "none",
        display: "block",
      }}
    ></iframe>
  );
};

export default CommerceCheckoutComplete;
