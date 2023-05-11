import * as React from "react";
import { FormattedMessage } from "react-intl";
import CurrencyFormatter from "common/components/currencyFormatter";
import useIsMobile from "common/hooks/useIsMobile";
import useGroupTexts from "common/hooks/useGroupTexts";
import {
  FooterWrapper,
  TextWrap,
  Divider,
  TotalPrice,
  BuyNowButton,
  BottomStickyContainer,
  Shell,
  MobileTotalPrice,
} from "./styled";
import Points from "./components/points";
import AdditionalFees from "./components/additionalFees";
import {
  AdditionalFeeWithPreview,
  PriceWithAdditionalFees,
} from "../../../productShow/layout/productSummary/components/right/price/additionalFee";
import { Spacer } from "common/components/designSystem/spacer";
import UsedCoins from "./components/usedCoins";

interface IProps {
  currency: string;
  shippingFee: number;
  totalPrice: number;
  totalUsedCoinPrice: number;
  totalAdditionalFees?: Moim.Commerce.IProductAdditionalFee[];
  coupon: number;
  points: number;
  usedCoins?: Moim.Commerce.ICalculateUsedCoin[];
  onClickBuyNow(): void;
}

const Footer: React.FC<IProps> = ({
  currency,
  shippingFee,
  totalPrice,
  totalAdditionalFees,
  coupon,
  points,
  totalUsedCoinPrice,
  usedCoins,
  onClickBuyNow,
}) => {
  const isMobile = useIsMobile();
  const buyNowText = useGroupTexts("button_buy_now");

  const buyNowButton = React.useMemo(
    () => (
      <BuyNowButton onClick={onClickBuyNow}>
        {buyNowText ? (
          buyNowText.singular
        ) : (
          <FormattedMessage id="button_buy" />
        )}
      </BuyNowButton>
    ),
    [buyNowText, onClickBuyNow],
  );

  const totalProductPrice =
    totalPrice - shippingFee + coupon + totalUsedCoinPrice;
  return (
    <FooterWrapper>
      <TextWrap>
        <span className="left">
          <FormattedMessage id="price/product_discounted_total" />
        </span>
        <span className="right">
          <CurrencyFormatter currency={currency} value={totalProductPrice} />
        </span>
      </TextWrap>
      <AdditionalFees additionalFees={totalAdditionalFees} />
      <TextWrap>
        <span className="left">
          <FormattedMessage id="price/shipping_total" />
        </span>
        <span className="right">
          + <CurrencyFormatter currency={currency} value={shippingFee} />
        </span>
      </TextWrap>

      {coupon ? (
        <TextWrap>
          <span className="left">
            <FormattedMessage id="price/coupon_total" />
          </span>
          <span className="right">
            - <CurrencyFormatter currency={currency} value={coupon} />
          </span>
        </TextWrap>
      ) : null}

      <UsedCoins usedCoins={usedCoins} />

      <Divider />
      <TotalPrice>
        <span className="left">
          <FormattedMessage id="price/total_estimated" />
        </span>
        <span className="right">
          <CurrencyFormatter currency={currency} value={totalPrice} />
        </span>
      </TotalPrice>
      <AdditionalFees additionalFees={totalAdditionalFees} />

      {points ? <Points currency={currency} points={points} /> : null}

      {!isMobile && <Spacer value={16} />}

      {!isMobile && buyNowButton}
      {isMobile && (
        <BottomStickyContainer>
          <Shell>
            <PriceWithAdditionalFees
              currency={currency}
              price={totalPrice}
              additionalFees={totalAdditionalFees}
              visibleFiatPrice={Boolean(totalPrice === 0 && totalPrice)}
              AdditionalFeeComponent={AdditionalFeeWithPreview}
            >
              {elements => (
                <MobileTotalPrice
                  className={elements?.length > 1 ? "small" : undefined}
                >
                  {elements}
                </MobileTotalPrice>
              )}
            </PriceWithAdditionalFees>
          </Shell>
          <Shell>{buyNowButton}</Shell>
        </BottomStickyContainer>
      )}
    </FooterWrapper>
  );
};

export default Footer;
