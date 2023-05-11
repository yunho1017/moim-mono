import * as React from "react";
import { FormattedMessage, useIntl, FormattedNumber } from "react-intl";
import FundingParticipantList from "app/modules/commerce/components/fundingParticipantList/index";
import { TabLoadingWrapper } from ".";

import {
  TitleContainer,
  SectionTitle,
  SectionSubTitle,
  Section,
  SectionHead,
  Spacer,
  TabItemCountLabel,
} from "../../styled";
import { useStoreState } from "app/store";

interface IProps {
  productId: Moim.Id;
  buyersCount: number;
  productSellerId?: Moim.Id;
  participants:
    | Moim.IPaginatedListResponse<Moim.Commerce.IPurchaseItemPurchase>
    | undefined;
}

const ParticipantTab: React.FC<IProps> = React.memo(
  ({ productId, buyersCount, productSellerId, participants }) => {
    return (
      <>
        <Spacer value={40} />
        <Section>
          <SectionHead>
            <TitleContainer>
              <SectionTitle>
                <FormattedMessage id="funding_show/backers_title" />
              </SectionTitle>
            </TitleContainer>
            <SectionSubTitle>
              <FormattedMessage
                id="funding_show/backers_count"
                values={{
                  plain_count: buyersCount ?? 0,
                  formattedCount: (
                    <FormattedNumber
                      useGrouping={true}
                      value={buyersCount ?? 0}
                    />
                  ),
                }}
              />
            </SectionSubTitle>
          </SectionHead>
          <FundingParticipantList
            participants={participants ?? { data: [], paging: {} }}
            productId={productId}
            sellerId={productSellerId}
          />
        </Section>
      </>
    );
  },
);

export default function useParticipantTab(
  isLoading: boolean | undefined,
  productId: string,
  buyersCount: number = 0,
  productSellerId?: Moim.Id,
) {
  const intl = useIntl();
  const participants = useStoreState(
    state => state.commerce.productParticipants[productId],
  );

  return React.useMemo(
    () => ({
      id: "fund-participant",
      title: (
        <>
          {intl.formatMessage({
            id: "funding_show/backers_title",
          })}
          {buyersCount ? (
            <TabItemCountLabel>{buyersCount}</TabItemCountLabel>
          ) : (
            ""
          )}
        </>
      ),
      content: (
        <TabLoadingWrapper isLoading={isLoading}>
          <ParticipantTab
            productId={productId}
            buyersCount={buyersCount}
            productSellerId={productSellerId}
            participants={participants}
          />
        </TabLoadingWrapper>
      ),
    }),
    [buyersCount, intl, isLoading, participants, productId, productSellerId],
  );
}
