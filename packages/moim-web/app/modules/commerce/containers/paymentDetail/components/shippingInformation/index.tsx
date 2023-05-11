import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Title, Wrapper, Section } from "../common";

interface IProps {
  name?: string;
  phone?: string;
  adress?: string;
  memo?: string;
}
export default function ShippingInformation({
  name,
  phone,
  adress,
  memo,
}: IProps) {
  return (
    <Wrapper>
      <Title>
        <FormattedMessage id="my_shopping/purchase_details/shipping_info_title" />
      </Title>
      <Section
        title={
          <FormattedMessage id="my_shopping/purchase_details/recipient_name" />
        }
        contents={name}
      />
      <Section
        title={
          <FormattedMessage id="my_shopping/purchase_details/recipient_phone_number" />
        }
        contents={phone}
      />
      <Section
        title={
          <FormattedMessage id="my_shopping/purchase_details/recipient_address" />
        }
        contents={adress}
      />
      <Section
        title={
          <FormattedMessage id="my_shopping/purchase_details/recipient_shipping_memo" />
        }
        contents={memo ?? "-"}
      />
    </Wrapper>
  );
}
