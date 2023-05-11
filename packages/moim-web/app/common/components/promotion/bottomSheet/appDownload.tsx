import * as React from "react";
import { InView } from "react-intersection-observer";
import ReactResizeDetector from "react-resize-detector";
// hooks
import useKeepAliveAxiosInstance from "common/helpers/keepAliveAxios";
import { useStoreState } from "app/store";
import useIsMobile from "app/common/hooks/useIsMobile";
import { useGetDestinationLink } from "../useHooks";
// utils
import {
  closeAppDownloadPromoteBottomSheet,
  isAppDownloadPromoteBottomSheetUntilHide,
} from "../utils";
import { isiOS } from "common/helpers/browserDetect";
// components
import ImageContent from "./contents/image";
import BottomSheet from "common/components/bottomSheet";

const DEFAULT_CLOSE_TEXTS: Record<
  string,
  { singular: string; plural?: string }
> = {
  en: {
    singular: "OPEN APP",
  },
  ko: {
    singular: "앱 열기",
  },
};

const PromoteAppDownloadBottomSheet: React.FC = ({}) => {
  const isUntilHide = isAppDownloadPromoteBottomSheetUntilHide();
  const [isOpen, setOpenStatus] = React.useState(false);
  const [contentHeight, setContentHeight] = React.useState(undefined);
  const { promoteData, currentGroupId } = useStoreState(state => ({
    promoteData: state.promote.appDownloadPromote.bottomSheet,
    currentGroupId: state.app.currentGroupId,
  }));
  const isMobile = useIsMobile();
  const isIOS = isiOS();

  const destinationLink = useGetDestinationLink(promoteData);
  const getKeepAliveAxiosInstance = useKeepAliveAxiosInstance();
  const handleCloseTemporarily = React.useCallback(() => {
    setOpenStatus(false);
    closeAppDownloadPromoteBottomSheet();
  }, []);

  const handleClickOpenApp = React.useCallback(() => {
    if (promoteData && destinationLink) {
      getKeepAliveAxiosInstance().post(
        `/groups/${currentGroupId}/app_promotions/${promoteData.id}/action`,
        {
          action: "clickCount",
        },
      );
      window.open(destinationLink, "_blank");
    }
  }, [currentGroupId, promoteData, getKeepAliveAxiosInstance, destinationLink]);

  const contentElement = React.useMemo(() => {
    if (!promoteData) {
      return null;
    }

    if (promoteData.image?.mobile) {
      return (
        <ImageContent
          image={promoteData.image.mobile}
          closeButtonTexts={promoteData.textSet.closeBtn ?? DEFAULT_CLOSE_TEXTS}
          onImageClick={handleClickOpenApp}
          onDismissClick={handleCloseTemporarily}
        />
      );
    }

    return <div>TBD</div>;
  }, [handleClickOpenApp, handleCloseTemporarily, promoteData]);

  const handleResize = React.useCallback(
    (_, height) => {
      if (isIOS && contentHeight !== undefined) {
        return;
      }
      setContentHeight(height);
      setOpenStatus(!isUntilHide);
    },
    [isIOS, contentHeight, isUntilHide],
  );

  const handleInViewChange = React.useCallback(
    (inView: boolean) => {
      if (isOpen && inView && promoteData) {
        getKeepAliveAxiosInstance().post(
          `/groups/${currentGroupId}/app_promotions/${promoteData.id}/action`,
          {
            action: "viewCount",
          },
        );
      }
    },
    [currentGroupId, isOpen, getKeepAliveAxiosInstance, promoteData],
  );

  if (!isMobile || !promoteData) {
    return null;
  }

  return (
    <BottomSheet
      open={isOpen}
      disableExpand={true}
      keepContentMount={true}
      disableHandle={true}
      minHeight={contentHeight}
      onCloseRequest={handleCloseTemporarily}
    >
      <div>
        <ReactResizeDetector
          handleHeight={true}
          refreshMode="debounce"
          refreshOptions={{ trailing: true }}
          onResize={handleResize}
        >
          <InView threshold={1} onChange={handleInViewChange}>
            {contentElement}
          </InView>
        </ReactResizeDetector>
      </div>
    </BottomSheet>
  );
};

export default React.memo(PromoteAppDownloadBottomSheet);
