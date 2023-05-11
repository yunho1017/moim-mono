import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { B4RegularStyle } from "common/components/designSystem/typos";

export const Container = styled.div`
  position: relative;
  width: 100%;
  padding: ${px2rem(12)} ${px2rem(32)};
  border-radius: ${px2rem(4)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(12)} ${px2rem(16)};
  }

  &:hover {
    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${props => props.theme.colorV2.colorSet.grey10};
    }
  }
`;

export const FromWhere = styled.div`
  width: 100%;
  ${B4RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;
