import * as React from "react";
import styled from "styled-components";
import { TopNaviPortalContainer } from "app/modules/layout/components/controller/topNaviPortal";
import MobileTopTabNavigation from "./mobile";

const TopTabWrapper = styled.div<{
  disabled: boolean;
}>`
  position: relative;
  width: 100%;
  display: ${props => (props.disabled ? "none" : "block")};
`;
interface IProps {
  disabled: boolean;
}

const TopTabNavigation: React.FC<IProps> = ({ disabled }) => (
  <TopNaviPortalContainer>
    <TopTabWrapper disabled={disabled}>
      <MobileTopTabNavigation />
    </TopTabWrapper>
  </TopNaviPortalContainer>
);

export default React.memo(TopTabNavigation);
