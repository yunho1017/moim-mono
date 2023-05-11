import * as React from "react";
import styled from "styled-components";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
import { RAW } from "app/__mocks__";

import CartsComponent from ".";
import ControlHead from "./components/controlHead";
import SellerSection from "./components/sellerItem";

const Wrapper = styled.div<{ width: number }>`
  width: ${props => props.width}px;
`;

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Commerce/Carts`, module).add(
  "Default",
  () => {
    return (
      <CartsComponent
        cart={
          {
            ...RAW.COMMERCE.carts,
            seller: RAW.COMMERCE.hubSeller,
            items: RAW.COMMERCE.carts.items.map(item => {
              return {
                ...item,
                seller: RAW.COMMERCE.subSellers.data[0],
                items: [
                  {
                    type: "noDelivery" as const,
                    items: item.items.map(
                      it =>
                        ({
                          ...it,
                          product: {
                            ...RAW.COMMERCE.productShow,
                            categories: RAW.COMMERCE.categories.data.map(
                              value => value.id,
                            ),
                            reviews: { items: [], total: 0, currentIndex: 0 },
                            questions: { items: [], total: 0, currentIndex: 0 },
                            comments: { items: [], total: 0, currentIndex: 0 },
                          },
                        } as any),
                    ),
                  } as Moim.Commerce.ICartProductGroup,
                ],
              };
            }) as Moim.Commerce.ICartSellerItem[],
          } as Moim.Commerce.ICartResponse
        }
        calcResponse={RAW.COMMERCE.paymentCalc}
        onChangeProductGroup={action("onChangeProductGroup")}
        calculateMyCart={action("calculateMyCart")}
        updateMyCart={action("updateMyCart")}
        onClickBuyNow={action("onClickBuyNow")}
      />
    );
  },
);

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Commerce/Carts/Components`,
  module,
)
  .add("Control Head", () => {
    return <ControlHead isAllChecked={false} totalItemCount={5} />;
  })
  .add("CartItem", () => (
    <Wrapper width={500}>
      <SellerSection
        currency="KRW"
        calcResponse={[]}
        items={
          RAW.COMMERCE.carts.items.map(item =>
            item.items.map(it => ({
              ...it,
              product: {
                ...RAW.COMMERCE.productShow,
                categories: RAW.COMMERCE.categories.data.map(value => value.id),
                reviews: { items: [], total: 0, currentIndex: 0 },
                questions: { items: [], total: 0, currentIndex: 0 },
                comments: { items: [], total: 0, currentIndex: 0 },
              } as Moim.Commerce.IProduct,
            })),
          )[0]
        }
        sellerId={RAW.COMMERCE.hubSeller.id}
      />
    </Wrapper>
  ));
