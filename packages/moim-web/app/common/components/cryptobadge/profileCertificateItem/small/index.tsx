import * as React from "react";

import { BadgeWrapper, BadgeIcon } from "./styled";

interface IProps {
  icon: string;
  name: string;
  certificateId: string;
  onClick?: React.MouseEventHandler;
}

const SmallBadge = React.forwardRef<HTMLAnchorElement, IProps>(
  ({ icon, name, certificateId, onClick }, ref) => (
    <BadgeWrapper
      ref={ref}
      href={`/cryptobadge/certificate/${certificateId}`}
      onClick={onClick}
    >
      <BadgeIcon src={icon} alt={name} />
    </BadgeWrapper>
  ),
);

export default SmallBadge;
