import styled from "styled-components";
import InfoIconBase from "@icon/18-info-g.svg";
import {
  B3RegularStyle,
  H8Regular,
  H10BoldStyle,
  H8Bold,
  B4Regular,
} from "common/components/designSystem/typos";

import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const InfoIcon = styled(InfoIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))`
  transition: opacity 200ms ease-in-out;
  &:hover {
    opacity: 0.6;
  }
`;

export const MobileTitle = styled(H8Regular)`
  width: 100%;
  padding: ${px2rem(10)} ${px2rem(16)};
`;
export const DeliveryPolicyDialogContainer = styled.div`
  height: fit-content;
`;

export const DeliveryPolicyContentsWrapper = styled.div`
  width: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)} ${px2rem(16)};
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)} ${px2rem(16)};
  }
`;

export const DeliveryPolicyPriceRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${px2rem(6)} ${px2rem(16)};
  gap: ${px2rem(4)};
  ${B3RegularStyle};

  .left {
    flex: 1;
    min-width: 0;
    color: ${props => props.theme.colorV2.colorSet.grey600};
  }
  .right {
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }
`;

export const DeliveryPolicyPriceTitleRow = styled(DeliveryPolicyPriceRow)`
  ${H10BoldStyle};
  .left {
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }
  .right {
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }
`;

export const DeliveryPolicyTitle = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(4)} ${px2rem(16)};
`;

export const DeliveryPolicyDescription = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: ${px2rem(4)} ${px2rem(16)};
`;
