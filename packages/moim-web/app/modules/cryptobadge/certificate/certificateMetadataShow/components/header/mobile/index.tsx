import * as React from "react";
import AppBar from "common/components/appBar";
import useOpenState from "common/hooks/useOpenState";
// hooks
import { useProps } from "./useHook";
// components
import ShavedText from "common/components/shavedText";
import { WithENWordKeepAllStyle } from "common/components/designSystem/styles";
import MoreMenu from "./menu";
// styled
import {
  getAppBarWrapperStyle,
  AppBarWrapperStickedStyle,
  CenterAlignmentWrapper,
  RightWrapper,
  Title,
  MoreMenuWrapper,
  TopWrapper,
  BackIcon,
  MoreIcon,
  RetryIcon,
} from "./styled";

import { getNetworkNameByChainId } from "common/components/cryptobadge/utils";
import { css } from "styled-components";

interface IProps {
  badge: Moim.Cryptobadge.ICryptobadge;
  tokenId?: string;
  onRetryClick: React.MouseEventHandler<HTMLDivElement>;
  isLoadingRefresh: boolean;
}

const CryptobadgeShowHeaderForMobile: React.FC<IProps> = ({
  badge,
  onRetryClick,
  isLoadingRefresh,
}) => {
  const { refMenuButton, appBarTopPosition, onBack } = useProps();

  const {
    isOpen: moreMenuOpen,
    open: openMoreMenu,
    close: closeMoreMenu,
  } = useOpenState(false);

  const titleElement = React.useMemo(
    () => (
      <Title>
        <ShavedText
          value={
            <WithENWordKeepAllStyle>{badge.contract}</WithENWordKeepAllStyle>
          }
          line={1}
        />
      </Title>
    ),
    [badge.contract],
  );

  const handleMoreMenu = React.useCallback(() => {
    openMoreMenu();
  }, [openMoreMenu]);

  const wrapperStyle = css`
    background-color: ${badge.backgroundColor ?? "white"};
    color: ${badge.textColor ?? "black"};
  `;

  const element = React.useMemo(
    () => (
      <AppBar
        wrapperStickyStyle={getAppBarWrapperStyle(appBarTopPosition)}
        wrapperStickedStyle={AppBarWrapperStickedStyle}
        wrapperStyle={wrapperStyle}
        titleElement={titleElement}
        enableScrollParallax={true}
        useScrollDownHide={false}
        parallaxWrapperComponent={CenterAlignmentWrapper}
        leftButton={<BackIcon color={`${badge.textColor}`} onClick={onBack} />}
        rightButton={
          <RightWrapper>
            <MoreMenuWrapper onClick={onRetryClick}>
              <RetryIcon
                color={`${badge.textColor}`}
                refreshing={isLoadingRefresh ? true : undefined}
              />
            </MoreMenuWrapper>
            <MoreMenuWrapper ref={refMenuButton}>
              <MoreIcon color={`${badge.textColor}`} onClick={handleMoreMenu} />
            </MoreMenuWrapper>
          </RightWrapper>
        }
      />
    ),
    [
      appBarTopPosition,
      badge.textColor,
      handleMoreMenu,
      isLoadingRefresh,
      onBack,
      onRetryClick,
      refMenuButton,
      titleElement,
      wrapperStyle,
    ],
  );

  return (
    <TopWrapper>
      {element}
      <MoreMenu
        open={moreMenuOpen}
        anchorElement={refMenuButton.current}
        onCloseRequest={closeMoreMenu}
        contractAddress={badge.contract ?? ""}
        network={getNetworkNameByChainId(badge.chainId)}
      />
    </TopWrapper>
  );
};

export default CryptobadgeShowHeaderForMobile;
