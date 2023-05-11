import * as React from "react";
import styled from "styled-components";

import { H10Bold } from "common/components/designSystem/typos";
import { useRedirectToMoimURL } from "common/hooks/useSecondaryView";

import { px2rem } from "common/helpers/rem";
import { MoimURL } from "common/helpers/url";
import { useIntlShort } from "common/hooks/useIntlShort";

const Wrapper = styled(H10Bold)`
  color: ${props => props.theme.color.cobalt800};
  padding: ${px2rem(6)} ${px2rem(16)};
  text-align: center;
  transition: opacity 200ms ease-in-out;
  &:hover {
    opacity: 0.6;
  }
`;

const DeliveryGroupLinkButton: React.FC<{ id: string }> = ({ id }) => {
  const intl = useIntlShort();
  const redirect = useRedirectToMoimURL();

  const handleClick = React.useCallback(() => {
    redirect(
      new MoimURL.CommerceDeliveryGroup({
        id,
      }).toString(),
    );
  }, [redirect, id]);
  return (
    <Wrapper role="button" onClick={handleClick}>
      {intl("cart_shipping_bundle_add_more_products")}
    </Wrapper>
  );
};

export default DeliveryGroupLinkButton;
