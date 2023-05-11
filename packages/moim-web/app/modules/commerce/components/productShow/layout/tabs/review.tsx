import * as React from "react";
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

import { defaultPagingListValue, TabLoadingWrapper } from ".";
import ProductReviews from "../../../productThreadList/reviews";

import {
  TitleContainer,
  SectionTitle,
  SectionSubTitle,
  Section,
  SectionHead,
  Spacer,
  RatingWrapper,
  RatingValueLabel,
  Rating,
  TabItemCountLabel,
} from "../../styled";

import { useStoreState } from "app/store";

interface IProps {
  productId: Moim.Id | undefined;
  avgRate: number;
  reviews: Moim.IIndexedPagingList<string> | undefined;
  productSellerId?: Moim.Id;
}

const ReviewTab: React.FC<IProps> = React.memo(
  ({ productId, productSellerId, avgRate, reviews }) => {
    return (
      <>
        <Spacer value={40} />
        <Section>
          <SectionHead>
            <TitleContainer>
              <SectionTitle>
                <FormattedMessage id="product_show/tab_title_product_review" />
              </SectionTitle>
            </TitleContainer>
            <SectionSubTitle>
              <FormattedMessage
                id="product_show_reviews_reviews_count"
                values={{
                  plain_count: reviews?.total ?? 0,
                  formattedCount: (
                    <FormattedNumber
                      useGrouping={true}
                      value={reviews?.total ?? 0}
                    />
                  ),
                }}
              />
            </SectionSubTitle>
          </SectionHead>

          {false && (
            <>
              <Spacer value={24} />
              <RatingWrapper>
                <Rating
                  readOnly={true}
                  precision={0.5}
                  value={avgRate ?? 0}
                  size="large"
                />
                <RatingValueLabel>
                  {(avgRate ?? 0).toFixed(2)} / 5
                </RatingValueLabel>
              </RatingWrapper>
            </>
          )}
          <Spacer value={16} />
          <ProductReviews
            productId={productId}
            sellerId={productSellerId}
            reviews={reviews ?? defaultPagingListValue}
          />
        </Section>
      </>
    );
  },
);

export default function useReviewTab(
  isLoading: boolean | undefined,
  product: Moim.Commerce.IProduct | undefined,
) {
  const intl = useIntl();
  const { reviews } = useStoreState(state => ({
    reviews: product?.id
      ? state.commerce.productReviews[product.id]
      : undefined,
  }));

  return React.useMemo(
    () => ({
      id: "review",
      title: (
        <>
          {intl.formatMessage({
            id: "product_show/tab_title_product_review",
          })}
          {reviews?.total ? (
            <TabItemCountLabel>{reviews?.total}</TabItemCountLabel>
          ) : (
            ""
          )}
        </>
      ),
      content: (
        <TabLoadingWrapper isLoading={isLoading}>
          <ReviewTab
            productId={product?.id}
            productSellerId={product?.sellerId}
            avgRate={product?.avgRate ?? 0}
            reviews={reviews}
          />
        </TabLoadingWrapper>
      ),
    }),
    [product, isLoading, reviews],
  );
}
