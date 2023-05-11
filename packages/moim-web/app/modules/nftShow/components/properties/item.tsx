import React from "react";
import styled from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
// helpers
import { px2rem } from "common/helpers/rem";
// components
import ShavedText from "common/components/shavedText";
import RarityGraph from "common/components/richEditor/components/blockitRenderer/components/nftSummary/components/rarityGraph";
// styled
import {
  TraitType,
  TraitValue,
  RarityWrapper,
} from "common/components/richEditor/components/blockitRenderer/components/nftSummary/components/styled";

const PropertyItemWrapper = styled.div`
  width: calc(100% / 3 - ${px2rem(24)} / 3);
  height: ${px2rem(129)};
  border-radius: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  padding: ${px2rem(12)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: calc(50% - ${px2rem(12)} / 2);
  }
`;

interface PropsType {
  type: string;
  value: string;
  rarityType?: "DONUT" | "BAR" | "NORMAL";
  rarity?: number;
}

export const PropertyItem: React.FC<PropsType> = React.memo(
  ({ type, value, rarityType, rarity }) => {
    return (
      <PropertyItemWrapper>
        <TraitType>{type}</TraitType>
        <TraitValue>
          <ShavedText value={value} line={1} />
        </TraitValue>
        {rarity && rarityType && (
          <RarityWrapper>
            <RarityGraph type={rarityType} value={rarity} />
          </RarityWrapper>
        )}
      </PropertyItemWrapper>
    );
  },
);
