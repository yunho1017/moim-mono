import * as React from "react";

import Category from "./components/right/category";
import Stat from "./components/right/stat";
import FundTimer from "./components/right/fundTimer";
import Points from "./components/right/credit";
import ProductShowPurchaseGloveBox from "./components/right/purchaseGloveBox";
import Seller from "./components/right/seller";
import TimeSaleTimer from "./components/right/timeSaleTimer";
import Description from "./components/right/description";
import DiscountPrice from "./components/right/discountPrice";
import Price from "./components/right/price";
import PrimaryDetailInformation from "./components/right/primaryDetailInformation";
import ProductName from "./components/right/productName";
import SalesInformation from "./components/right/salesInformation";
import Shipping from "./components/right/shipping";
import Rating from "./components/right/rating";
import FundingProgress from "./components/right/fundingProgress";

import { ProductShowHeaderContext } from "../../context";

const ProductSummaryRenderer: React.FC<{
  block: Moim.Component.ProductShow.ProductSummaryChildType;
}> = ({ block }) => {
  const { product } = React.useContext(ProductShowHeaderContext);

  switch (block.type) {
    case "product-summary-timer": {
      return <TimeSaleTimer size="normal" productSets={product.productSets} />;
    }
    case "product-summary-name": {
      return <ProductName title={product.name} block={block} />;
    }
    case "product-summary-description": {
      return <Description description={product.description} block={block} />;
    }
    case "product-summary-discount-price": {
      return (
        <DiscountPrice
          originPrice={product.originalPrice_price}
          rawPrice={product.price}
          rawOriginPrice={product.originalPrice}
          block={block}
        />
      );
    }
    case "product-summary-price": {
      return (
        <Price
          price={product.price_price}
          additionalFees={product.additionalFees}
          block={block}
        />
      );
    }
    case "product-summary-progress-bar": {
      return (
        <FundingProgress
          block={block}
          productId={product.id}
          buyersCount={product.buyersCount}
          currency={product.currency}
          goalAmount={product.goalAmount}
          productStatus={product.status}
          soldAmount={product.soldAmount}
        />
      );
    }
    case "product-summary-credit": {
      return <Points block={block} />;
    }
    case "product-summary-rating": {
      return (
        <Rating
          block={block}
          reviewsCount={product.reviewsCount}
          rating={product.avgRate}
        />
      );
    }
    case "product-summary-shipping": {
      return (
        <Shipping
          block={block}
          currency={product?.currency}
          deliveryGroupId={product.deliveryGroupId}
          shippingRequired={product.shippingRequired}
          productDeliveryPolicies={product.deliveryPolicies}
          deliveryFee={product.shippingFee}
        />
      );
    }
    case "product-summary-category": {
      return (
        <Category
          block={block}
          productType={product?.type}
          categoryIds={product.categoryIds}
        />
      );
    }
    case "product-summary-primary-detail": {
      return (
        <PrimaryDetailInformation
          block={block}
          details={product.primaryDetails}
        />
      );
    }
    case "product-summary-funding-status": {
      return (
        <FundTimer
          block={block}
          productType={product?.type}
          startDateTime={product?.sellingStart}
          endDateTime={product?.sellingEnd}
        />
      );
    }
    case "product-summary-sales-information": {
      return (
        <SalesInformation
          block={block}
          productType={product?.type}
          productStatus={product.status}
          soldCount={product.soldCount}
          stockCount={product.stockCount}
          startDateTime={product.sellingStart}
          endDateTime={product.sellingEnd}
        />
      );
    }
    case "product-summary-stat": {
      return (
        <Stat
          block={block}
          reviewsCount={product?.reviewsCount}
          commentsCount={product.commentsCount}
          repliesCount={product.repliesCount}
          voteScore={product.vote_score}
          viewCount={product.view_count}
        />
      );
    }
    case "product-summary-seller": {
      return <Seller block={block} sellerId={product.sellerId} />;
    }
    case "product-summary-option-selection": {
      return <ProductShowPurchaseGloveBox block={block} />;
    }
    default:
      return null;
  }
};

export default React.memo(ProductSummaryRenderer);
