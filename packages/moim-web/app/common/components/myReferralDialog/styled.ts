import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import {
  pB1RegularStyle,
  B4Regular,
  pB4RegularStyle,
  H8Bold,
  H4Bold,
} from "../designSystem/typos";
import RightIconBase from "@icon/18-rightarrow-g.svg";
import ReferralIconBase from "@icon/48-referral.svg";
import { BG_LEVEL_BACKGROUND_CLASS_NAME } from "../designSystem/BGLevel";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    height: 100%;
  }
`;
export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0 ${px2rem(24)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0;
  }
`;

export const DividerWrapper = styled.div`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
`;
export const MyReferralIconWrapper = styled.div`
  padding: 0 ${px2rem(16)};
`;

export const MyReferralTitle = styled(H4Bold)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const MyReferralDescription = styled.div`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${pB1RegularStyle}
`;

export const MyReferralImage = styled.img`
  object-fit: cover;
  width: 100%;
  padding: 0 ${px2rem(16)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0;
  }
`;

export const LinkShareButtonWrapper = styled.div.attrs({
  className: BG_LEVEL_BACKGROUND_CLASS_NAME,
})`
  padding: ${px2rem(16)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: fixed !important;
    z-index: ${props => props.theme.zIndexes.default};
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
  }
`;

export const MyPerformanceTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${px2rem(11)} ${px2rem(4)} ${px2rem(11)} ${px2rem(16)};
`;

export const MyPerformanceTitle = styled(H8Bold)`
  flex: 1;

  min-width: 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const MyPerformanceValue = styled(H8Bold)`
  padding: ${px2rem(11)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const MyPerformanceSubTitle = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey500};
  padding: 0 ${px2rem(16)};
`;

export const ReferralPolicyWrapper = styled.div`
  padding: ${px2rem(8)} ${px2rem(16)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: relative;
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
    &::before {
      content: "";

      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      background-color: ${props => props.theme.colorV2.colorSet.grey50};
    }
  }
`;

export const ReferralPolicyTitle = styled(H8Bold)`
  padding: ${px2rem(11)} 0;
`;

export const ReferralPolicy = styled.div`
  ${pB4RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey500};
  white-space: pre-line;
`;

export const RightArrow = styled(RightIconBase).attrs(props => ({
  size: "xs",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const ReferralIcon = styled(ReferralIconBase).attrs(props => ({
  size: "l",
  touch: 48,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
