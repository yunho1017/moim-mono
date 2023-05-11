import React, { useCallback } from "react";
import ShareBase from "common/components/share";
import { useActions, useStoreState } from "app/store";
import { ActionCreators } from "./actions";
import useIsMobile from "common/hooks/useIsMobile";

// NOTE: ref. https://firebase.google.com/docs/dynamic-links/create-manually?hl=ko
const DYNAMIC_LINK_QUERY_WHITE_LIST = [
  "apn",
  "amv",
  "ibi",
  "ius",
  "ipfl",
  "ipbi",
  "isi",
  "imv",
  "efr",
  "ofl",
  "st",
  "sd",
  "si",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "at",
  "ct",
  "mt",
  "pt",
  "d",
];

export function useReformedUrl(shareUrl?: string) {
  const appConfig = useStoreState(store => store.app.appConfig);

  return React.useMemo(() => {
    if (shareUrl && appConfig?.dynamicLinkUrl) {
      const url = new URL(appConfig.dynamicLinkUrl);
      url.searchParams.append("link", shareUrl);
      url.searchParams.append("afl", shareUrl);
      url.searchParams.append("ifl", shareUrl);

      Object.entries(appConfig).forEach(([key, value]) => {
        if (DYNAMIC_LINK_QUERY_WHITE_LIST.includes(key)) {
          url.searchParams.append(key, value);
        }
      });

      return url.toString();
    }
    return shareUrl;
  }, [appConfig, shareUrl]);
}

export function useOpenSNSShareDialog(shareUrl?: string) {
  const { open } = useActions({ open: ActionCreators.open });
  const reformedUrl = useReformedUrl(shareUrl);

  return useCallback(() => {
    if (reformedUrl) {
      open({ shareUrl: reformedUrl });
    }
  }, [open, reformedUrl]);
}
export function useCloseSNSShareDialog() {
  const { close } = useActions({ close: ActionCreators.close });

  return useCallback(() => {
    close();
  }, [close]);
}

export function Share({
  shareUrl,
  onClick,
  children,
}: {
  shareUrl?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children: (
    handler?: (e?: React.MouseEvent<HTMLElement>) => void,
  ) => React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const reformedUrl = useReformedUrl(shareUrl);
  const openShareDialog = useOpenSNSShareDialog(shareUrl);

  const handler: React.MouseEventHandler<HTMLElement> = React.useCallback(
    e => {
      onClick?.(e);
      openShareDialog();
    },
    [openShareDialog, onClick],
  );
  const inner = React.useMemo(() => {
    if (!reformedUrl) {
      return children();
    }

    if (isMobile) {
      return <ShareBase displayText={children()} copyValue={reformedUrl} />;
    }

    return children(handler);
  }, [reformedUrl, isMobile, children, handler]);

  return <>{inner}</>;
}
