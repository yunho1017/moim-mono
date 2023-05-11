import React from "react";
import styled, { css } from "styled-components";

import BuyersCount from "./buyersCount";
import Credit from "./credit";
import Description from "./description";
import DiscountPrice from "./discountPrice";
import Image from "./image";
import Price from "./price";
import ProductName from "./productName";
import ProgressBar from "./progressBar";
import GoalAmount from "./goalAmount";
import SoldAmount from "./soldAmount";
import Rating from "./rating";
import Seller from "./seller";
import Shipping from "./shipping";
import Stat from "./stat";
import Status from "./status";
import StockCount from "./stockCount";
import TimeSaleTimer from "./timeSaleTimer";
import BuyNowButton from "./buyNowButton";
import AddCartButton from "./cartButton";
import ProductItemWrapper from "./wrapper/product";
import FundingItemWrapper from "./wrapper/funding";

import { VoteStatus } from "app/enums";

const commonStyle = css<{
  block: Moim.Component.ProductItem.IBaseElement;
}>`
  ${props =>
    props.block.flex &&
    css`
      flex: ${props.block.flex};
      min-width: 0;
    `}
`;

const StyledBuyersCount = styled(BuyersCount)`
  ${commonStyle}
`;
const StyledCredit = styled(Credit)`
  ${commonStyle}
`;
const StyledDescription = styled(Description)`
  ${commonStyle}
`;
const StyledDiscountPrice = styled(DiscountPrice)`
  ${commonStyle}
`;
const StyledImage = styled(Image)`
  ${commonStyle}
`;
const StyledPrice = styled(Price)`
  ${commonStyle}
`;
const StyledProductName = styled(ProductName)`
  ${commonStyle}
`;
const StyledProgressBar = styled(ProgressBar)`
  ${commonStyle}
`;
const StyledSoldAmount = styled(SoldAmount)`
  ${commonStyle}
`;
const StyledGoalAmount = styled(GoalAmount)`
  ${commonStyle}
`;
const StyledRating = styled(Rating)`
  ${commonStyle}
`;
const StyledSeller = styled(Seller)`
  ${commonStyle}
`;
const StyledShipping = styled(Shipping)`
  ${commonStyle}
`;
const StyledStat = styled(Stat)`
  ${commonStyle}
`;
const StyledStatus = styled(Status)`
  ${commonStyle}
`;
const StyledStockCount = styled(StockCount)`
  ${commonStyle}
`;
const StyledTimeSaleTimer = styled(TimeSaleTimer)`
  ${commonStyle}
`;
const StyledBuyNowButton = styled(BuyNowButton)`
  ${commonStyle}
`;
const StyledAddCartButton = styled(AddCartButton)`
  ${commonStyle}
`;
const StyledProductItemWrapper = styled(
  (props: React.ComponentProps<typeof ProductItemWrapper>) => (
    <ProductItemWrapper {...props} />
  ),
)`
  ${commonStyle}
`;
const StyledFundingItemWrapper = styled(
  (props: React.ComponentProps<typeof FundingItemWrapper>) => (
    <FundingItemWrapper {...props} />
  ),
)`
  ${commonStyle}
`;

export const ProductItemElementRenderer: React.FC<{
  product: Moim.Commerce.IProduct;
  block: Moim.Component.ProductItem.ProductCellBlockType;
  wrapperBlock: Moim.Component.ProductItem.IWrapper;
  onClickLikeButtonClick?(nextStatus: boolean): void;
  onSellerSelect?(): void;
  onBuyNowSelect?(): void;
  onAddToCartSelect?(): void;
}> = ({
  product,
  block,
  wrapperBlock,
  onClickLikeButtonClick,
  onSellerSelect,
  onAddToCartSelect,
  onBuyNowSelect,
}) => {
  switch (block.type) {
    case "wrapper":
      return <StyledProductItemWrapper block={block} product={product} />;
    case "image":
      return (
        <StyledImage
          block={block}
          productId={product.id}
          isFavorite={product.vote?.type === VoteStatus.POSITIVE}
          images={product.images}
          productSets={product.productSets}
          onClickLikeButtonClick={onClickLikeButtonClick}
        />
      );
    case "timer":
      return (
        <StyledTimeSaleTimer block={block} productSets={product.productSets} />
      );
    case "product-name":
      return (
        <StyledProductName
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          productName={product.name}
        />
      );

    case "description":
      return (
        <StyledDescription
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          description={product.description}
        />
      );
    case "discount-price":
      return (
        <StyledDiscountPrice
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          originPrice={product.originalPrice_price}
          rawPrice={product.price}
          rawOriginPrice={product.originalPrice}
        />
      );
    case "price":
      return (
        <StyledPrice
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          price={product.price_price}
          additionalFees={product.additionalFees}
        />
      );
    case "credit":
      return (
        <StyledCredit
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          productId={product.id}
        />
      );
    case "rating":
      return (
        <StyledRating
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          avgRate={product.avgRate}
          reviewsCount={product.reviewsCount}
        />
      );
    case "shipping":
      return (
        <StyledShipping
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          currency={product.currency}
          shippingRequired={product.shippingRequired}
          shippingFee={product.shippingFee}
        />
      );
    case "status":
      return (
        <StyledStatus
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          productType={product.type}
          status={product.status}
        />
      );
    case "stock-count":
      return (
        <StyledStockCount
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          stockCount={product.stockCount}
          soldCount={product.soldCount}
        />
      );
    case "buyers-count":
      return (
        <StyledBuyersCount
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          buyersCount={product.buyersCount}
        />
      );
    case "stat":
      return (
        <StyledStat
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          viewCount={product.view_count}
          voteScore={product.vote_score}
          commentsCount={product.commentsCount}
          repliesCount={product.repliesCount}
          reviewsCount={product.reviewsCount}
        />
      );
    case "seller":
      return (
        <StyledSeller
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          sellerId={product.sellerId}
          onSelect={onSellerSelect}
        />
      );

    case "add-cart-button":
      return (
        <StyledAddCartButton
          block={block}
          product={product}
          onSelect={onAddToCartSelect}
        />
      );
    case "buy-now-button":
      return (
        <StyledBuyNowButton
          block={block}
          product={product}
          onSelect={onBuyNowSelect}
        />
      );

    default:
      return null;
  }
};

export const FundingItemElementRenderer: React.FC<{
  product: Moim.Commerce.IProduct;
  block: Moim.Component.ProductItem.ProductCellBlockType;
  wrapperBlock: Moim.Component.ProductItem.IWrapper;
  onClickLikeButtonClick?(nextStatus: boolean): void;
  onSellerSelect?(): void;
  onBuyNowSelect?(): void;
  onAddToCartSelect?(): void;
}> = ({
  product,
  block,
  wrapperBlock,
  onClickLikeButtonClick,
  onSellerSelect,
  onBuyNowSelect,
}) => {
  switch (block.type) {
    case "wrapper":
      return <StyledFundingItemWrapper block={block} product={product} />;
    case "image":
      return (
        <StyledImage
          block={block}
          productId={product.id}
          isFavorite={product.vote?.type === VoteStatus.POSITIVE}
          images={product.images}
          productSets={product.productSets}
          onClickLikeButtonClick={onClickLikeButtonClick}
        />
      );
    case "timer":
      return (
        <StyledTimeSaleTimer
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          productSets={product.productSets}
        />
      );
    case "product-name":
      return (
        <StyledProductName
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          productName={product.name}
        />
      );

    case "description":
      return (
        <StyledDescription
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          description={product.description}
        />
      );
    case "progress-bar":
      return (
        <StyledProgressBar
          block={block}
          productType={product.type}
          soldAmount={product.soldAmount}
          goalAmount={product.goalAmount}
        />
      );
    case "sold-amount":
      return (
        <StyledSoldAmount
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          currency={product.currency}
          productType={product.type}
          soldAmount={product.soldAmount}
          goalAmount={product.goalAmount}
        />
      );
    case "goal-amount":
      return (
        <StyledGoalAmount
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          currency={product.currency}
          productType={product.type}
          goalAmount={product.goalAmount}
        />
      );

    case "seller":
      return (
        <StyledSeller
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          sellerId={product.sellerId}
          onSelect={onSellerSelect}
        />
      );
    case "buyers-count":
      return (
        <StyledBuyersCount
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          buyersCount={product.buyersCount}
        />
      );

    case "status":
      return (
        <StyledStatus
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          productType={product.type}
          status={product.status}
        />
      );

    case "stat":
      return (
        <StyledStat
          horizontalAlign={wrapperBlock.horizontalAlign}
          block={block}
          viewCount={product.view_count}
          voteScore={product.vote_score}
          commentsCount={product.commentsCount}
          repliesCount={product.repliesCount}
          reviewsCount={product.reviewsCount}
        />
      );

    case "buy-now-button":
      return (
        <StyledBuyNowButton
          block={block}
          product={product}
          onSelect={onBuyNowSelect}
        />
      );

    default:
      return null;
  }
};
