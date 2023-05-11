import styled, { css } from "styled-components";

import { px2rem } from "common/helpers/rem";
import { H10BoldStyle } from "common/components/designSystem/typos";

import { DefaultDivider } from "common/components/divider";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Divider = styled(DefaultDivider)`
  margin: ${px2rem(8)} 0;
`;

export const MobileInventoryTitle = styled.div`
  width: 100%;
  padding: ${px2rem(4)} 0;
  ${H10BoldStyle}
`;

export const OptionsSelectorWrapper = styled.div<{
  isBottomSheetExpend?: boolean;
}>`
  padding: 0 ${px2rem(16)}; // NOTE: cuz purchaseReadyItem has 4px side margin

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;

    div[class^="MobilePurchaseButtonContainer"] {
      padding: 0 0 ${px2rem(16)};
    }

    div[class^="ItemListWrapper"] {
      ${props =>
        props.isBottomSheetExpend &&
        css`
          max-height: inherit;
          height: 100%;
        `}
    }
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(30)};
    div[class^="MobilePurchaseButtonContainer"] {
      padding: 0 0 ${px2rem(16)};
    }

    div[class^="TotalCost"] {
      color: ${props => props.theme.colorV2.colorSet.grey800};
    }
  }
`;
