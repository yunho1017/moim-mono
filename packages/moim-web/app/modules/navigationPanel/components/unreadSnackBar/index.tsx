// vendor
import * as React from "react";
// component
import { FormattedMessage } from "react-intl";
import Snackbar from "common/components/snackbar";
import {
  SnackBarWrapper,
  UnreadSnackBarContent,
  TopUnreadIcon,
  BottomUnreadIcon,
  TopMentionIcon,
  BottomMentionIcon,
  snackbarStyle,
} from "./styled";

export type UnreadSnackBarType = "unread" | "mention";
interface IProps {
  topUnreadSnackBar: {
    open: boolean;
    type?: UnreadSnackBarType;
    position?: number;
  };

  bottomUnreadSnackBar: {
    open: boolean;
    type?: UnreadSnackBarType;
    position?: number;
  };
  onSnackBarClick(target: "top" | "bottom"): void;
}

function getUnreadText(type: UnreadSnackBarType) {
  if (type === "mention") {
    return "side_navigation/unread_mentions";
  }

  return "side_navigation/more_unreads";
}

function getSnackBarIcon(
  direction: "top" | "bottom",
  type: UnreadSnackBarType,
) {
  if (direction === "top" && type === "unread") {
    return <TopUnreadIcon />;
  } else if (direction === "bottom" && type === "unread") {
    return <BottomUnreadIcon />;
  } else if (direction === "top" && type === "mention") {
    return <TopMentionIcon />;
  } else {
    return <BottomMentionIcon />;
  }
}

function NavigationPanelUnreadSnackBar({
  topUnreadSnackBar,
  bottomUnreadSnackBar,
  onSnackBarClick,
}: IProps) {
  const handleClickTopUnreadBadge = React.useCallback(() => {
    onSnackBarClick("top");
  }, [onSnackBarClick]);

  const handleClickBottomUnreadBadge = React.useCallback(() => {
    onSnackBarClick("bottom");
  }, [onSnackBarClick]);

  return (
    <>
      <SnackBarWrapper
        transitionDirection="top"
        position={topUnreadSnackBar.position}
      >
        <Snackbar
          isOpen={topUnreadSnackBar.open}
          content={
            topUnreadSnackBar.type && (
              <>
                {getSnackBarIcon("top", topUnreadSnackBar.type)}
                <UnreadSnackBarContent>
                  <FormattedMessage
                    id={getUnreadText(topUnreadSnackBar.type)}
                  />
                </UnreadSnackBarContent>
              </>
            )
          }
          transitionDirection="top"
          wrapperStyle={snackbarStyle}
          onClickSnackbar={handleClickTopUnreadBadge}
        />
      </SnackBarWrapper>

      <SnackBarWrapper
        transitionDirection="bottom"
        position={bottomUnreadSnackBar.position}
      >
        <Snackbar
          isOpen={bottomUnreadSnackBar.open}
          content={
            bottomUnreadSnackBar.type && (
              <>
                {getSnackBarIcon("bottom", bottomUnreadSnackBar.type)}
                <UnreadSnackBarContent>
                  <FormattedMessage
                    id={getUnreadText(bottomUnreadSnackBar.type)}
                  />
                </UnreadSnackBarContent>
              </>
            )
          }
          transitionDirection="bottom"
          wrapperStyle={snackbarStyle}
          onClickSnackbar={handleClickBottomUnreadBadge}
        />
      </SnackBarWrapper>
    </>
  );
}

export default NavigationPanelUnreadSnackBar;
