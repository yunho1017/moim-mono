import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B1Regular } from "common/components/designSystem/typos";
// icons
import MoreIconBase from "@icon/18-more-v-g.svg";

export const Left = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
`;

export const Right = styled.div`
  width: fit-content;
  height: 100%;

  display: flex;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  display: flex;

  padding: 0 ${px2rem(16)};

  ${Left} + ${Right} {
    margin-left:${px2rem(16)}
  }
`;

export const Name = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const IconWrapper = styled.div`
  width: ${px2rem(30)};
  height: ${px2rem(30)};
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
    border-radius: ${px2rem(2)};
  }
`;

export const MoreIcon = styled(MoreIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey600,
}))``;
