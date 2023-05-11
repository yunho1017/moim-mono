import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { H8Bold, H10BoldStyle } from "common/components/designSystem/typos";
import { GhostButton } from "common/components/designSystem/buttons";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div<{
  showType: Moim.Enums.PostShowType | undefined;
}>`
  width: 100%;
  min-height: inherit;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: ${px2rem(120)} 0;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${props =>
      props.showType !== "MODAL" &&
      css`
        background-color: ${props => props.theme.colorV2.colorSet.grey10};
      `}
  }
`;

export const GuideText = styled(H8Bold)`
  margin: ${px2rem(16)};
  text-align: center;
  white-space: pre-line;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Button = styled(Link).attrs({ size: "m" })`
  width: ${px2rem(182)};
  height: ${px2rem(38)};

  margin-top: ${px2rem(16)};
  ${H10BoldStyle};
`.withComponent(GhostButton);
