import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
import ProductShowComponent from ".";

const images = [
  {
    url:
      "https://xn--hq1b99vojf6xm.com/data/padobox/goods/a007/big/20203045916671028.jpg",
    width: 560,
    height: 500,
    blurhash: "",
  },
  {
    url:
      "https://xn--hq1b99vojf6xm.com/data/padobox/goods/a007/other/202010/20203045916671028_1.jpg",
    width: 560,
    height: 500,
    blurhash: "",
  },
  {
    url:
      "https://xn--hq1b99vojf6xm.com/data/padobox/goods/a007/other/202011/20203215900559828_2.jpg",
    width: 560,
    height: 500,
    blurhash: "",
  },
  {
    url:
      "https://xn--hq1b99vojf6xm.com/data/padobox/goods/a007/other/202011/20203215900559828_3.jpg",
    width: 560,
    height: 500,
    blurhash: "",
  },
  {
    url:
      "https://xn--hq1b99vojf6xm.com/data/padobox/goods/a007/other/202011/20203215900559828_4.jpg",
    width: 560,
    height: 500,
    blurhash: "",
  },
];

const product: Moim.Commerce.IProduct = {
  id: "PDT123541",
  type: "normal",
  sellerId: "SellerID-1234",
  categoryIds: ["C11111"],
  name: "거제 참소라 (자연산)",
  description: "다른 지역 참소라와 비교 불가, 참소라계의 귀족 / 최소단위 1kg",
  images: {
    web: images,
    mobile: images,
  },
  repliesCount: 0,
  reviewsCount: 2301,
  avgRate: 3.5,
  status: "onSale",
  price: 24750,
  originalPrice: 24750,
  shippingFee: 3000,
  price_price: { value: "24750", currency: "KRW" },
  originalPrice_price: { value: "24750", currency: "KRW" },
  shippingFee_price: { value: "3000", currency: "KRW" },
  currency: "KRW",
  soldCount: 0,
  soldAmount: 0,
  buyersCount: 0,
  shippingRequired: true,
  phoneNumberRequired: false,
  pidRequired: true,
  accountIds: ["test"],
  seller: {
    id: "SellerID-1234",
    imageUrl: "https://파도상자.com/data/padobox/photo/a004.jpg",
    parentId: "FYPCBR4ZV7",
    name: "울산 정자어장 (왕실호)",
    accountIds: ["test"],
    createdAt: 1621507509301,
    updatedAt: 1621507509301,
  } as Moim.Commerce.ISeller,

  createdAt: 1621425655824,
  updatedAt: 1621564014930,
  productVariants: [],
  vote_score: 0,
  up_vote_score: 0,
  down_vote_score: 0,
  view_count: 0,
  view_count_member: 0,
  buyable: true,
};

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Commerce/ProductShow`,
  module,
).add("Default", () => {
  return (
    <ProductShowComponent
      isLoading={false}
      product={product}
      productId={product.id}
      productShowLayout={undefined}
    />
  );
});
