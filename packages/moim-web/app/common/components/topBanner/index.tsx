import * as React from "react";
import { useLocation } from "react-router";
import { FormattedMessage } from "react-intl";
import { css } from "styled-components";
import { MoimURL } from "common/helpers/url";
import { TopBannerContext } from "./context";
import useIsMobile from "common/hooks/useIsMobile";
import {
  TopBannerContainer,
  CommonTopBannerWrapper,
  MessageContainer,
  CloseIcon,
} from "./styled";

let prevPos = 0;

const TopBanner: React.FC = () => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const [topBannerContext, handleSetContext] = React.useContext(
    TopBannerContext,
  );

  const handleClose = React.useCallback(() => {
    handleSetContext(state => ({
      ...state,
      isOpen: false,
    }));
  }, [handleSetContext]);

  const innerElementStyle = React.useMemo(() => {
    switch (topBannerContext.type) {
      default:
      case "normal": {
        return css`
          background-color: ${props => props.theme.colorV2.colorSet.grey50};
          color: ${props => props.theme.colorV2.colorSet.grey800};
        `;
      }

      case "info": {
        return css`
          background-color: ${props => props.theme.colorV2.colorSet.grey50};
          color: ${props => props.theme.colorV2.colorSet.grey800};
        `;
      }

      case "success": {
        return css`
          background-color: ${props => props.theme.colorV2.colorSet.grey50};
          color: ${props => props.theme.colorV2.colorSet.grey800};
        `;
      }

      case "custom": {
        return css`
          background-color: ${props =>
            topBannerContext.custom?.bgColor ??
            props.theme.colorV2.colorSet.grey50};
          color: ${props =>
            topBannerContext.custom?.textColor ??
            props.theme.colorV2.colorSet.grey800};
        `;
      }
    }
  }, [topBannerContext.custom, topBannerContext.type]);

  const messageElement = React.useMemo(() => {
    const { message, messageKey } = topBannerContext;

    return messageKey ? <FormattedMessage id={messageKey} /> : message;
  }, [topBannerContext]);

  const windowScroll = React.useCallback(
    e => {
      requestAnimationFrame(() => {
        if (!e.currentTarget) return;
        if (
          (e.currentTarget.innerHeight as number) +
            (e.currentTarget.scrollY as number) >=
          (document.scrollingElement?.scrollHeight ??
            e.currentTarget.innerHeight)
        ) {
          handleClose();
          return;
        }
        if (e.currentTarget.scrollY <= 0) {
          handleSetContext(state => ({
            ...state,
            isOpen: true,
          }));
          return;
        }

        const isScrollToUp = prevPos - e.currentTarget.scrollY;
        if (isScrollToUp >= 0) {
          handleSetContext(state => ({
            ...state,
            isOpen: true,
          }));
        } else {
          handleClose();
        }

        prevPos = e.currentTarget.scrollY;
      });
    },
    [handleClose, handleSetContext],
  );

  React.useLayoutEffect(() => {
    if (
      isMobile &&
      (MoimURL.ConversationShow.isSameExact(pathname) ||
        MoimURL.CreateForumThread.isSameExact(pathname) ||
        MoimURL.EditForumThread.isSameExact(pathname))
    ) {
      setTimeout(() => {
        handleSetContext(state => ({
          ...state,
          forceHidden: true,
        }));
      }, 100);
    }
  }, [pathname, handleSetContext, isMobile]);

  React.useLayoutEffect(() => {
    if (!topBannerContext.forceHidden && Boolean(topBannerContext.message)) {
      window.addEventListener("scroll", windowScroll);
      return () => {
        window.removeEventListener("scroll", windowScroll);
      };
    }
  }, [topBannerContext.forceHidden, topBannerContext.message, windowScroll]);

  if (!topBannerContext.currentVisibleState) {
    return <React.Fragment />;
  }

  return (
    <>
      <TopBannerContainer
        isOpen={topBannerContext.isOpen}
        forceHidden={
          topBannerContext.forceHidden || !Boolean(topBannerContext.message)
        }
      >
        <CommonTopBannerWrapper overrideStyle={innerElementStyle}>
          <MessageContainer>{messageElement}</MessageContainer>
          {!topBannerContext.disableCloseButton && (
            <CloseIcon onClick={handleClose} />
          )}
        </CommonTopBannerWrapper>
      </TopBannerContainer>
    </>
  );
};

export default TopBanner;
