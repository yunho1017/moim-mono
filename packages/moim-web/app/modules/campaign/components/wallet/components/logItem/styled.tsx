import styled from "styled-components";
import {
  B2Regular,
  B2RegularStyle,
  B4RegularStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

export const Inner = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  padding: ${px2rem(8)} ${px2rem(16)};
`;

export const AvatarContainer = styled.div`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InfoContainer = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;
  height: fix-content;
  display: flex;
  flex-direction: column;
  row-gap: ${px2rem(2)};
  padding: 0 ${px2rem(12)};

  .name {
    width: 100%;
    color: ${props => props.theme.colorV2.colorSet.grey800};
    ${B2RegularStyle}
  }

  .timestamp {
    width: 100%;
    color: ${props => props.theme.colorV2.colorSet.grey300};
    ${B4RegularStyle}
  }
`;

export const PriceContainer = styled.div`
  width: fit-content;
  min-width: ${px2rem(40)};
  max-width: ${px2rem(212)};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: ${px2rem(4)};

  .price-plus,
  .price-minus {
    ${H10BoldStyle}
  }

  .price-plus {
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }
  .price-minus {
    color: ${props => props.theme.colorV2.colorSet.grey300};
  }

  .token {
    color: ${props => props.theme.colorV2.colorSet.grey300};
    ${B4RegularStyle}
  }
`;

export const Message = styled(B2Regular)`
  width: 100%;
  height: fit-content;
  padding: ${px2rem(4)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
