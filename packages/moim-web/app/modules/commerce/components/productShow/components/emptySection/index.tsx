import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { pB2RegularStyle } from "common/components/designSystem/typos";

const Wrapper = styled.div`
  width: 100%;
  height: ${px2rem(192)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${pB2RegularStyle}
`;

interface IProps {}

const EmptySection: React.FC<IProps> = ({ children }) => {
  return (
    <Wrapper>
      <Message>{children}</Message>
    </Wrapper>
  );
};

export default EmptySection;
