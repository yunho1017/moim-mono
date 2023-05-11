import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { pB4RegularStyle } from "common/components/designSystem/typos";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  padding: 0 ${px2rem(16)};
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: ${px2rem(2)};
  border: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  padding: ${px2rem(18)} ${px2rem(16)};
`;

const Item = styled.div`
  width: 100%;
  white-space: pre-line;
  word-break: keep-all;
  color: ${props => props.theme.colorV2.colorSet.grey600};
  ${pB4RegularStyle}
`;

interface IProps {
  returnReplacementPolicy?: string;
}

const ProductReturnReplacementPolicy: React.FC<IProps> = ({
  returnReplacementPolicy,
}) => {
  if (!returnReplacementPolicy) return null;
  return (
    <Container>
      <Wrapper>
        <Item>{returnReplacementPolicy}</Item>
      </Wrapper>
    </Container>
  );
};

export default React.memo(ProductReturnReplacementPolicy);
