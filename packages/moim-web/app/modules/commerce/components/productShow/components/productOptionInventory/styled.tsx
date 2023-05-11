import styled, { css } from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import {
  H8BoldStyle,
  B2RegularStyle,
  B4RegularStyle,
  H4Bold,
} from "common/components/designSystem/typos";
import {
  useScrollStyle,
  noScrollBarStyle,
} from "common/components/designSystem/styles";

export const MOBILE_MULTI_OPTION_FIXED_HEIGHT = 350;
export const MOBILE_SINGLE_OPTION_FIXED_HEIGHT = 220;

export const LoadingWrapper = styled.div`
  width: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    min-height: ${px2rem(120)};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const SelectionWrapperStyled = css`
  padding: ${px2rem(4)} 0;
`;

export const BodyContainer = styled.div`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 1;
    min-height: 0;
  }
`;

export const ItemListWrapper = styled.div`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    flex: 1;
    min-height: 0;
    width: 100%;
    height: 100%;
    ${useScrollStyle}
    ${noScrollBarStyle}
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(8)} 0 ${px2rem(8)};
  }
`;

export const ItemWrapper = styled.div`
  & + & {
    margin-top: ${px2rem(16)};
  }
`;

export const PriceInfoTitle = styled.div`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${B2RegularStyle}
`;

export const TotalCost = styled(H4Bold)<{ isFund: boolean }>`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey800};

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    color: ${props => props.theme.colorV2.colorSet.grey800};
    ${H8BoldStyle};
  }
`;

export const PriceInfoSection = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  margin: ${px2rem(8)} 0 ${px2rem(16)};

  .left {
    flex: 1;
    width: 100%;
    min-width: 0;
  }

  .right {
    flex: 1;
    width: 100%;
    min-width: 0;
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0;
  }
`;

export const OptionsSelectContainer = styled.div`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 0 ${px2rem(8)};
  }
`;

export const MobilePurchaseButtonContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 0 ${px2rem(16)} ${px2rem(16)};
  button {
    flex: 1;
  }
  button + button {
    margin-left: ${px2rem(12)};
  }
`;

export const ProductStatusLabel = styled.span<{
  status: Moim.Commerce.PRODUCT_STATUS;
}>`
  color: ${props => {
    switch (props.status) {
      case "onSale": {
        return props.theme.colorV2.colorSet.grey300;
      }
      case "scheduled": {
        return props.theme.colorV2.colorSet.grey800;
      }

      case "completed":
      case "soldOut": {
        return props.theme.color.red700;
      }
    }
  }};
`;

export const OptionSuffixContainer = styled.div`
  width: fit-content;
  max-width: ${px2rem(135)};
  margin-left: ${px2rem(8)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  ${B4RegularStyle};
`;

export const Wrapper = styled.div<{ isSingleItem?: boolean }>`
  width: 100%;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: ${props =>
      props.isSingleItem
        ? px2rem(MOBILE_SINGLE_OPTION_FIXED_HEIGHT)
        : px2rem(MOBILE_MULTI_OPTION_FIXED_HEIGHT)};

    ${ItemListWrapper} {
      max-height: ${px2rem(MOBILE_SINGLE_OPTION_FIXED_HEIGHT)};
    }
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(4)} 0;
  }
`;
