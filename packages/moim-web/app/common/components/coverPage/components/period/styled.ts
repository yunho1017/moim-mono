import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div<{ status?: Moim.Group.GroupPeriodType }>`
  padding: ${px2rem(1)} ${px2rem(6)};
  ${props => {
    switch (props.status) {
      case "ready":
        return css`
          background-color: ${props.theme.colorV2.colorSet.grey200};
          color: ${props.theme.colorV2.colorSet.grey600};
        `;
      case "activated":
        return css`
          background-color: ${props.theme.colorV2.primary.dark};
          color: ${props.theme.colorV2.colorSet.fog800};
        `;
      case "terminated":
        return css`
          background-color: ${props.theme.colorV2.colorSet.grey800};
          color: ${props.theme.colorV2.colorSet.white1000};
        `;
    }
  }}
`;

export const chipWrapperStyle = css`
  padding: 0;
  border-radius: ${px2rem(2)};
  overflow: hidden;
`;
