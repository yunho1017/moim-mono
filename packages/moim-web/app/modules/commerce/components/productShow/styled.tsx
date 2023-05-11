import styled from "styled-components";
import RatingBase from "@material-ui/lab/Rating";
import withStyles from "@material-ui/core/styles/withStyles";
import { px2rem } from "common/helpers/rem";
import {
  noScrollBarStyle,
  useScrollStyle,
  useSingleLineStyle,
} from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";
import { GLOVE_BOX_HEIGHT_MOBILE } from "./layout/productSummary/components/right/purchaseGloveBox/components/footer/styled";

import { GhostGeneralButton } from "common/components/designSystem/buttons";
import {
  B3RegularStyle,
  B4RegularStyle,
  H8BoldStyle,
} from "common/components/designSystem/typos";

export const RootWrapper = styled.div`
  position: relative;
  width: 100%;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    height: 100%;
    ${useScrollStyle}
    ${noScrollBarStyle}
  }
`;

export const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding-top: ${px2rem(40)};
  }
`;

export const Container = styled.div`
  width: ${px2rem(1000)};
  max-width: 100%;

  padding-bottom: ${px2rem(120)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding-bottom: ${`calc(env(safe-area-inset-top) + env(safe-area-inset-bottom) + ${px2rem(
      GLOVE_BOX_HEIGHT_MOBILE + 24,
    )})`};
  }
`;

export const Spacer = styled.div<{ value: number }>`
  width: 100%;
  height: ${props => px2rem(props.value)};
`;

export const ProductDivider = styled.hr`
  width: 100%;
  height: ${px2rem(4)};
  margin: 0;
  border: none;
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: ${px2rem(40)};
`;

export const SectionTitle = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  padding: ${px2rem(4)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${H8BoldStyle}
  ${useSingleLineStyle}
`;

export const SectionSubTitle = styled.div`
  width: 100%;
  padding: ${px2rem(4)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B3RegularStyle};
`;

export const Section = styled.div`
  width: 100%;
  height: fit-content;
`;

export const SectionHead = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
`;

export const AddQuestionButton = styled(GhostGeneralButton).attrs({
  size: "m",
})``;

export const RatingWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RatingValueLabel = styled.div`
  width: 100%;
  padding: ${px2rem(6)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${H8BoldStyle}
`;

export const Rating = withStyles({
  sizeLarge: {
    fontSize: px2rem(32),
  },
})(RatingBase);

export const TabItemCountLabel = styled.span`
  padding-left: ${px2rem(2)};
  color: ${props => props.theme.colorV2.colorSet.grey200};
  ${B4RegularStyle};
  line-height: ${px2rem(19)}; // for productTab's bodyThrees alignment;
`;
