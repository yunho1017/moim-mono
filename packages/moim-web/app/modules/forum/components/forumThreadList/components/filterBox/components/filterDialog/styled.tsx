import styled from "styled-components";
import { H8Bold } from "common/components/designSystem/typos";
import { FlatButton } from "common/components/designSystem/buttons";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { DefaultDivider } from "common/components/divider";
import { useScrollStyle } from "common/components/designSystem/styles";

export const BOTTOM_SHEET_HEADER_HEIGHT = 45;
const FOOTER_HEIGHT = 38;

export const DialogTitleWrapper = styled.div`
  margin-top: ${px2rem(8)};
`;

export const Title = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: ${px2rem(455)};
  padding: 0 ${px2rem(24)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    height: 100%;
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    padding: 0;
    max-height: calc(100% - 30vh);
  }
`;

export const ContentHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${px2rem(45)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${useScrollStyle};
  }
`;

export const ContentFooter = styled.div`
  width: 100%;
  height: ${px2rem(FOOTER_HEIGHT)};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: ${px2rem(24)} 0;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    display: none;
  }
`;

export const SectionTitle = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
  padding: ${px2rem(15)} ${px2rem(16)};
`;

export const TitleDivider = styled(DefaultDivider)<{ withTopMargin?: boolean }>`
  margin-top: ${px2rem(10)};
`;

export const Divider = styled(DefaultDivider)<{ withTopMargin?: boolean }>`
  ${props => props.withTopMargin && `margin-top: ${px2rem(24)}`};
`;

export const ApplyButton = styled(FlatButton).attrs({ size: "m" })`
  color: ${props => props.theme.getPrimaryFogPalette().fog800};
  background-color: ${props => props.theme.colorV2.accent};
  min-width: ${px2rem(80)};
`;
export const ResetButton = styled(FlatButton).attrs({ size: "m" })`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  background-color: transparent;
  min-width: ${px2rem(80)};
  margin-right: ${px2rem(8)};
`;

export const MobileResetButton = styled(FlatButton).attrs({ size: "s" })`
  position: absolute;
  color: ${props => props.theme.colorV2.colorSet.grey600};
  background-color: transparent;
  min-width: ${px2rem(64)};

  left: 0;
`;

export const MobileApplyButton = styled(FlatButton).attrs({ size: "s" })`
  position: absolute;
  color: ${props => props.theme.colorV2.accent};
  background-color: transparent;
  min-width: ${px2rem(64)};

  right: 0;
`;
