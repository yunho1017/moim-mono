import * as React from "react";

import {
  BadgeWrapper,
  IconHolder,
  BadgeIcon,
  NameWrapper,
  Name,
} from "./styled";
import ShavedText from "common/components/shavedText";

interface IProps {
  icon: string;
  name: string;
  description: string;
  resourceUrl: string;
  onClick?: React.MouseEventHandler;
}

const NormalBadge = React.forwardRef<HTMLAnchorElement, IProps>(
  ({ icon, name, description, resourceUrl, onClick }, ref) => (
    <BadgeWrapper
      ref={ref}
      href={resourceUrl}
      target="_blank"
      onClick={onClick}
    >
      <IconHolder>
        <BadgeIcon src={icon} alt={name} />
      </IconHolder>
      <NameWrapper title={description}>
        <Name>
          <ShavedText value={name} line={2} />
        </Name>
      </NameWrapper>
    </BadgeWrapper>
  ),
);

export default NormalBadge;
