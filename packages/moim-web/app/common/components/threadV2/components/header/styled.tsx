import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H9Bold, B4Regular } from "common/components/designSystem/typos";

export const Title = styled(H9Bold)`
  min-width: 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const EndFixWrapper = styled.div`
  margin: 0 ${px2rem(4)};
`;

export const CreatedAt = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const Wrapper = styled.div<{ reverse?: boolean }>`
  display: flex;
  align-items: center;
  margin-top: ${px2rem(4)};

  ${props =>
    props.reverse
      ? css`
      ${Title} + ${CreatedAt} {
        margin-right: ${px2rem(4)};
      }
    `
      : css`  ${Title} + ${CreatedAt} {
          margin-left: ${px2rem(4)};
        }`};
`;
