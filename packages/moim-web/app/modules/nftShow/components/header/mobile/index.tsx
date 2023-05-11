import * as React from "react";
import AppBar from "common/components/appBar";
import useOpenState from "common/hooks/useOpenState";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
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
} from "./styled";

import BackIcon from "@icon/24-back-b.svg";
import BlackMoreIcon from "@icon/24-more-b.svg";

interface IProps {
  tokenNumber?: number;
  contractAddress?: string;
  symbol: string;
  network: Moim.Community.IBlockchainType;
}

const NFTShowHeader: React.FC<IProps> = ({
  tokenNumber,
  contractAddress,
  symbol,
  network,
}) => {
  const isMobile = useIsMobile();

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
            <WithENWordKeepAllStyle>{contractAddress}</WithENWordKeepAllStyle>
          }
          line={1}
        />
      </Title>
    ),
    [contractAddress],
  );

  const handleMoreMenu = React.useCallback(() => {
    openMoreMenu();
  }, [openMoreMenu]);

  const element = React.useMemo(
    () => (
      <AppBar
        wrapperStickyStyle={getAppBarWrapperStyle(appBarTopPosition)}
        wrapperStickedStyle={AppBarWrapperStickedStyle}
        titleElement={titleElement}
        enableScrollParallax={true}
        useScrollDownHide={false}
        parallaxWrapperComponent={CenterAlignmentWrapper}
        leftButton={
          <BackIcon size="s" touch={44} role="button" onClick={onBack} />
        }
        rightButton={
          <RightWrapper>
            <MoreMenuWrapper ref={refMenuButton}>
              <BlackMoreIcon
                size="s"
                touch={44}
                role="button"
                onClick={handleMoreMenu}
              />
            </MoreMenuWrapper>
          </RightWrapper>
        }
      />
    ),
    [appBarTopPosition, handleMoreMenu, onBack, refMenuButton, titleElement],
  );

  if (isMobile) {
    return (
      <>
        {element}
        <MoreMenu
          open={moreMenuOpen}
          anchorElement={refMenuButton.current}
          onCloseRequest={closeMoreMenu}
          symbol={symbol}
          network={network}
          contractAddress={contractAddress}
          tokenNumber={tokenNumber}
        />
      </>
    );
  }

  return <>{element}</>;
};

export default NFTShowHeader;
