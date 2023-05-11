import * as React from "react";
import styled, { css } from "styled-components";
import BackIcon from "@icon/24-back-b.svg";
import AppBar, { IScrollParallaxContainer } from "common/components/appBar";
import { useOpenSNSShareDialog } from "common/components/snsShareDialog/utils";
import { useStoreState } from "app/store";
import { ShareIcon } from "../../../styled";

export const appBarWrapperStyle = css`
  width: 100%;
  position: fixed !important;
  top: 0 !important;
`;

export const CenterAlignmentWrapper = styled.div<IScrollParallaxContainer>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${props => props.opacity};
`;

export interface IProps {
  questId?: Moim.Id;
  onClose(): void;
}

const MobileHeader: React.FC<IProps> = ({ questId, onClose }) => {
  const openShareDialog = useOpenSNSShareDialog(location.href);
  const quest = useStoreState(state =>
    questId ? state.entities.dquest_quests[questId] : undefined,
  );

  return (
    <AppBar
      wrapperStickyStyle={appBarWrapperStyle}
      enableScrollParallax={true}
      useScrollDownHide={false}
      parallaxDisappearPosition={90}
      titleElement={quest?.title ?? ""}
      leftButton={
        <BackIcon size="s" touch={44} role="button" onClick={onClose} />
      }
      rightButton={
        <ShareIcon touch={44} role="button" onClick={openShareDialog} />
      }
    />
  );
};

export default React.memo(MobileHeader);
