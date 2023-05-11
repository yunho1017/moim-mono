import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";
import MobileHeader, { IProps as IMobileHeaderProps } from "./mobile";
import DesktopHeader, { IProps as IDesktopHeaderProps } from "./desktop";

type IProps = IMobileHeaderProps & IDesktopHeaderProps;

const DQuestShowHeader: React.FC<IProps> = ({ questId, onClose }) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileHeader questId={questId} onClose={onClose} />
  ) : (
    <DesktopHeader onClose={onClose} />
  );
};

export default React.memo(DQuestShowHeader);
