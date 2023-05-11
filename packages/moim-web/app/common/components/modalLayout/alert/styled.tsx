import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { rgba } from "polished";
import {
  B1RegularStyle,
  H8BoldStyle,
} from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { GhostButton } from "common/components/designSystem/buttons";
import { noScrollBarStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: ${px2rem(110)};
  border-radius: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  box-shadow: 0 ${px2rem(2)} ${px2rem(8)} 0
    ${props => rgba(props.theme.colorV2.colorSet.grey800, 0.2)};

  @media ${MEDIA_QUERY.TABLET} {
    max-width: ${px2rem(455)};
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  margin: ${px2rem(24)} ${px2rem(24)} ${px2rem(15)};
  ${noScrollBarStyle}
`;

export const Title = styled.h3`
  ${H8BoldStyle};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
  word-break: break-all;
`;

export const Content = styled.div`
  ${B1RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey600};
  white-space: pre-line;
  word-break: break-all;

  ${Title} + & {
    margin-top: ${px2rem(12)};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin: 0 ${px2rem(8)} ${px2rem(11)};
`;

export const LeftButtons = styled.div``;

export const RightButtons = styled.div`
  margin-left: auto;
`;

export const Button = styled(GhostButton).attrs({
  size: "m",
})<{ textColor?: string }>`
  border: 0;
  font-weight: ${props => props.theme.font.bold};
  ${props => props.textColor && `color: ${props.textColor}`};
`;
