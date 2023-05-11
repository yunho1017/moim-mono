import styled from "styled-components";
import { pB2RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const List = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
`;

export const EmptyCart = styled.div`
  width: 100%;
  display: flex;
  align-self: center;
  justify-content: center;
  min-height: 50vh;
  border-top: 1px solid ${props => props.theme.colorV2.colorSet.grey50};

  span {
    display: inline-block;
    align-self: center;
    color: ${props => props.theme.colorV2.colorSet.grey300};
    ${pB2RegularStyle};
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: ${px2rem(8)};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  border-top: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
`;
