import styled, { css, FlattenInterpolation } from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";
import { B2Regular, H9Bold } from "common/components/designSystem/typos";
import { TextGeneralButton } from "common/components/designSystem/buttons";
import MoreButtonIconBase from "@icon/18-rightarrow-g.svg";

const TopWrapperHeight = 600;

export const MoreButtonIcon = styled(MoreButtonIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const MoreButton = styled(TextGeneralButton).attrs({ size: "s" })`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  column-gap: ${px2rem(8)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const NFTCollectionTopWrapper = styled.div``;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${useScrollStyle}
    padding: 0 ${px2rem(16)} ${px2rem(120)};
  }
`;

export const MaxWidthWrapper = styled.div`
  width: 100%;
  max-width: ${px2rem(1200)};
  margin: 0 auto;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    overflow: inherit;
  }
`;

export const SectionTitle = styled(H9Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
`;

export const SeeAllButton = styled(TextGeneralButton).attrs({ size: "s" })<{
  borderTop?: boolean;
}>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  ${props =>
    props.borderTop &&
    css`
      height: ${px2rem(48)};
      border-top: ${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey50};
      border-radius: 0;
    `}
`;

export const EmptyBoxWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colorV2.colorSet.grey10};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    min-height: 50vh;
    height: calc(100vh - ${px2rem(TopWrapperHeight)});
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: 50vh;
  }
`;
export const EmptyBoxText = styled(B2Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const NftCollectionTabDividerDefaultStyle = css`
  width: 100%;
  margin-left: 0;
`;

export const NftCollectionShowDivider = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  width: calc(100% + ${px2rem(32)});
  height: ${px2rem(8)};
  margin-left: ${px2rem(-16)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    display: none;
  }
  ${props => props.overrideStyle}
`;
