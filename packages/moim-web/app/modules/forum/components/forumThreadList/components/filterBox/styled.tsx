import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div<{
  showDiv?: boolean;
  visibleTopTabNavigation?: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${props =>
      props.showDiv && !props.visibleTopTabNavigation
        ? `
      &::after {
        content: "";
        display: block;
        width: 100%;
        height: ${px2rem(4)};
        background-color: ${props.theme.colorV2.colorSet.grey10};
      }
    `
        : null}
  }
`;
