import styled from "styled-components";
import { TextButton } from "common/components/designSystem/buttons";
import { H10BoldStyle } from "common/components/designSystem/typos";
import { useScrollStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  padding: 0 ${px2rem(16)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: 100%;
    ${useScrollStyle}
  }
`;

export const AppBarDeleteButton = styled(TextButton).attrs({ size: "s" })<{
  setTextColorToHighlight?: boolean;
}>`
  color: ${props =>
    props.setTextColorToHighlight
      ? props.theme.color.blue700
      : props.theme.colorV2.colorSet.grey800};
  ${H10BoldStyle};
`;

export const TitleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
