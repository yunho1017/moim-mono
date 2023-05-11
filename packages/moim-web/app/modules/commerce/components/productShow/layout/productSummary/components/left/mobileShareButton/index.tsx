import * as React from "react";

import { ShareIcon, ShareButton } from "./styled";
import useIsMobile from "app/common/hooks/useIsMobile";

interface IProps {
  onShareClick(): void;
}

const MobileShareButton: React.FC<IProps> = ({ onShareClick }) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <ShareButton onClick={onShareClick}>
      <ShareIcon />
    </ShareButton>
  ) : null;
};

export default React.memo(MobileShareButton);
