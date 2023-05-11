// import * as React from "react";
// import styled from "styled-components";
// import { STORYBOOK_PREFIX } from "common/constants/storybook";
// const { storiesOf } = require("@storybook/react");
// const {
//   text: textKnob,
//   number: numberKnob,
//   select: selectKnob,
//   boolean: booleanKnob,
//   date: dateKnob,
// } = require("@storybook/addon-knobs");

// import ProductItemCell from ".";

// const Wrapper = styled.div`
//   width: 50rem;
// `;

// storiesOf(
//   `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Commerce/Product Item Cell`,
//   module,
// )
//   .add("Default(product type)", () => {
//     const [liked, setLiked] = React.useState(false);
//     const thumbnailPosition: "top" | "left" | "right" | "bottom" = selectKnob(
//       "썸네일 위치",
//       {
//         left: "left",
//         right: "right",
//         top: "top",
//         bottom: "bottom",
//       },
//       "top",
//     );
//     const imageResource: Moim.Commerce.IImage[] = [
//       {
//         url: textKnob(
//           "Image",
//           "https://files.vingle.network/files/G0CUWIRCRG/FE4ZH33DF/___________2021-04-05_______9.59.22.png",
//         ),
//         width: 500,
//         height: 500,
//       },
//     ];
//     return (
//       <Wrapper>
//         <ProductItemCell
//           productType="normal"
//           productId="PDX102094921"
//           sellerId="SELLER_ID"
//           status={selectKnob(
//             "Status",
//             {
//               onSale: "onSale",
//               scheduled: "scheduled",
//               soldOut: "soldOut",
//               completed: "completed",
//             },
//             "onSale",
//           )}
//           currency={selectKnob(
//             "Currency Type",
//             {
//               한화: "KRW",
//               달러: "USD",
//               엔화: "JPY",
//               유로: "EUR",
//               "아랍 디르함": "AED",
//               "스위스 프랑": "CHF",
//               "프랑스령 프랑": "XPF",
//               중국: "CNY",
//               홍콩달러: "HKD",
//               "인도 루피": "INR",
//               "멕시코 페소": "MXN",
//               "베트남 동": "VND",
//             },
//             "KRW",
//           )}
//           isLiked={liked}
//           images={{
//             web: imageResource,
//             mobile: imageResource,
//           }}
//           title={textKnob(
//             "Title",
//             "통영 멍게 (양식) - 청정 바다의 향기를 머금은 자연의 선물",
//           )}
//           description={textKnob(
//             "Description",
//             `1마리(250g)’ 바로 잡아 가장 신선할 때 손질하여 '당일' 출고,
//         배송합니다요!`,
//           )}
//           price={numberKnob("price", 22500)}
//           originPrice={numberKnob("originPrice", 24500)}
//           shippingRequired={booleanKnob("shippingRequired", true)}
//           shippingFee={numberKnob("shippingFee", 2500)}
//           stockCount={numberKnob("stockCount", 100)}
//           points={numberKnob("points", 225)}
//           soldAmount={0}
//           engagement={{
//             likeCount: numberKnob("Engage.like", 12),
//             repliesCount: numberKnob("Engage.comment", 132),
//             viewCount: numberKnob("Engage.view", 12302),
//           }}
//           rating={numberKnob("Rating", 2, { max: 5, min: 0 })}
//           ratedCount={18267}
//           onClickLikeButtonClick={setLiked}
//           itemCellConfig={{
//             thumbnailPosition,
//             thumbnailPosition_web: thumbnailPosition,
//           }}
//         />
//       </Wrapper>
//     );
//   })
//   .add("fund type)", () => {
//     const [liked, setLiked] = React.useState(false);
//     const thumbnailPosition: "top" | "left" | "right" | "bottom" = selectKnob(
//       "썸네일 위치",
//       {
//         left: "left",
//         right: "right",
//         top: "top",
//         bottom: "bottom",
//       },
//       "top",
//     );
//     const imageResource: Moim.Commerce.IImage[] = [
//       {
//         url: textKnob(
//           "Image",
//           "https://files.vingle.network/files/G0CUWIRCRG/FE4ZH33DF/___________2021-04-05_______9.59.22.png",
//         ),
//         width: 500,
//         height: 500,
//       },
//     ];
//     return (
//       <Wrapper>
//         <ProductItemCell
//           productType="fund"
//           productId="PDX102094921"
//           sellerId="SELLER_ID"
//           status={selectKnob(
//             "Status",
//             {
//               onSale: "onSale",
//               scheduled: "scheduled",
//               soldOut: "soldOut",
//               completed: "completed",
//             },
//             "onSale",
//           )}
//           currency={selectKnob(
//             "Currency Type",
//             {
//               한화: "KRW",
//               달러: "USD",
//               엔화: "JPY",
//               유로: "EUR",
//               "아랍 디르함": "AED",
//               "스위스 프랑": "CHF",
//               "프랑스령 프랑": "XPF",
//               중국: "CNY",
//               홍콩달러: "HKD",
//               "인도 루피": "INR",
//               "멕시코 페소": "MXN",
//               "베트남 동": "VND",
//             },
//             "KRW",
//           )}
//           isLiked={liked}
//           images={{
//             web: imageResource,
//             mobile: imageResource,
//           }}
//           title={textKnob(
//             "Title",
//             "통영 멍게 (양식) - 청정 바다의 향기를 머금은 자연의 선물",
//           )}
//           description={textKnob(
//             "Description",
//             `1마리(250g)’ 바로 잡아 가장 신선할 때 손질하여 '당일' 출고,
//         배송합니다요!`,
//           )}
//           price={numberKnob("price", 22500)}
//           originPrice={numberKnob("originPrice", 24500)}
//           shippingRequired={booleanKnob("shippingRequired", true)}
//           shippingFee={numberKnob("shippingFee", 2500)}
//           stockCount={numberKnob("stockCount", 100)}
//           points={numberKnob("points", 225)}
//           soldAmount={numberKnob("soldAmount", 0)}
//           goalAmount={numberKnob("goalAmount", 1200000)}
//           buyersCount={numberKnob("buyersCount", 0)}
//           engagement={{
//             likeCount: numberKnob("Engage.like", 12),
//             repliesCount: numberKnob("Engage.comment", 132),
//             viewCount: numberKnob("Engage.view", 12302),
//           }}
//           rating={numberKnob("Rating", 2, { max: 5, min: 0 })}
//           ratedCount={18267}
//           startDateTime={dateKnob("판매 시작일", new Date())}
//           endDateTime={dateKnob("판매 종료일", new Date())}
//           onClickLikeButtonClick={setLiked}
//           itemCellConfig={{
//             thumbnailPosition,
//             thumbnailPosition_web: thumbnailPosition,
//           }}
//         />
//       </Wrapper>
//     );
//   });
