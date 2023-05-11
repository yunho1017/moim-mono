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
import { getCertificate_node_Certificate } from "@vingle/cryptobadge-sdk";

interface IProps {
  certificate: getCertificate_node_Certificate;
  badge: Moim.Cryptobadge.ICryptobadge;
  onRetryClick: React.MouseEventHandler<HTMLDivElement>;
  isLoadingRefresh: boolean;
}

const CryptobadgeShowHeaderForMobile: React.FC<IProps> = ({
  certificate,
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
    background-color: ${certificate.backgroundColor ?? "white"};
    color: ${certificate.textColor ?? "black"};
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
        leftButton={
          <BackIcon color={`${certificate.textColor}`} onClick={onBack} />
        }
        rightButton={
          <RightWrapper>
            <MoreMenuWrapper onClick={onRetryClick}>
              <RetryIcon
                color={`${certificate.textColor}`}
                refreshing={isLoadingRefresh ? true : undefined}
              />
            </MoreMenuWrapper>
            <MoreMenuWrapper ref={refMenuButton}>
              <MoreIcon
                color={`${certificate.textColor}`}
                onClick={handleMoreMenu}
              />
            </MoreMenuWrapper>
          </RightWrapper>
        }
      />
    ),
    [
      appBarTopPosition,
      certificate.textColor,
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
