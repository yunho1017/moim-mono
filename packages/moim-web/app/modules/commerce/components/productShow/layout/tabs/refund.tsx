import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { TabLoadingWrapper } from ".";

import ProductReturnReplacementPolicy from "../../components/productReturnReplacementPolicy";

import {
  TitleContainer,
  SectionTitle,
  Section,
  SectionHead,
  Spacer,
} from "../../styled";

interface IProps {
  shippingRequired?: boolean;
  returnReplacementPolicy: string;
}

const RefundTab: React.FC<IProps> = React.memo(
  ({ shippingRequired, returnReplacementPolicy }) => {
    return (
      <>
        <Spacer value={40} />
        <Section>
          {!!returnReplacementPolicy && (
            <SectionHead>
              <TitleContainer>
                <SectionTitle>
                  <FormattedMessage
                    id={
                      shippingRequired
                        ? "product_show/tab_title_product_replace_refund"
                        : "product_show/tab_title_product_cancel_refund"
                    }
                  />
                </SectionTitle>
              </TitleContainer>
            </SectionHead>
          )}
          <Spacer value={24} />
          <ProductReturnReplacementPolicy
            returnReplacementPolicy={returnReplacementPolicy}
          />
        </Section>
      </>
    );
  },
);

export default function useRefundTab(
  isLoading: boolean | undefined,
  shippingRequired?: boolean,
  returnReplacementPolicy: string = "",
) {
  const intl = useIntl();

  return React.useMemo(
    () => ({
      id: "refund",
      title:
        isLoading || shippingRequired
          ? intl.formatMessage({
              id: "product_show/tab_title_product_replace_refund",
            })
          : intl.formatMessage({
              id: "product_show/tab_title_product_cancel_refund",
            }),
      content: (
        <TabLoadingWrapper isLoading={isLoading}>
          <RefundTab
            shippingRequired={shippingRequired}
            returnReplacementPolicy={returnReplacementPolicy}
          />
        </TabLoadingWrapper>
      ),
    }),
    [intl, isLoading, returnReplacementPolicy, shippingRequired],
  );
}
