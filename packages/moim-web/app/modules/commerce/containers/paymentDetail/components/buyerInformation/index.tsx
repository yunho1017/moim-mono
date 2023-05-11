import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Title, Wrapper, Section } from "../common";
import useGroupTexts from "common/hooks/useGroupTexts";

interface IProps {
  name: string;
  phone?: string;
  email?: string;
}
export default function BuyerInformation({ name, phone, email }: IProps) {
  const titleTexts = useGroupTexts("my_shopping_orders_buyer_info");
  return (
    <Wrapper>
      <Title>
        {titleTexts ? (
          titleTexts.singular
        ) : (
          <FormattedMessage id="my_shopping/purchase_details/buyer_info_title" />
        )}
      </Title>
      <Section
        title={
          <FormattedMessage id="my_shopping/purchase_details/buyer_name" />
        }
        contents={name}
      />
      <Section
        title={
          <FormattedMessage id="my_shopping/purchase_details/buyer_phone" />
        }
        contents={phone}
      />
      <Section
        title={
          <FormattedMessage id="my_shopping/purchase_details/buyer_email" />
        }
        contents={email}
      />
    </Wrapper>
  );
}
