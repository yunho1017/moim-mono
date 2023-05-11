import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
// contant
import { MEDIA_QUERY } from "common/constants/responsive";
// helper
import { px2rem } from "common/helpers/rem";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import { PropertyItem } from "./item";
import { SkeletonBox } from "common/components/skeleton";
import { TraitValue } from "common/components/richEditor/components/blockitRenderer/components/nftSummary/components/styled";
import { Spacer } from "common/components/designSystem/spacer";
// styled
import { SectionTitle, WideDivider } from "../styled";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const PropertyList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: ${px2rem(12)};
  padding: ${px2rem(16)} ${px2rem(16)} 0;
  ${TraitValue} {
    font-weight: ${props => props.theme.font.bold};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(8)} ${px2rem(16)} 0;
  }
`;

const StyledSkeleton = styled(SkeletonBox)`
  width: calc(100% / 3 - ${px2rem(24)} / 3);
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: calc(100% / 3 - ${px2rem(24)} / 3);
  }
`;

interface PropsType {
  attributes: {
    traitType: string;
    displayType: string;
    value: string;
    rarity: number;
    rarityType: "DONUT" | "BAR" | "NORMAL";
  }[];
}

const Properties: React.FC<PropsType> = ({ attributes }) => {
  const isMobile = useIsMobile();

  if (!attributes.length) return null;

  return (
    <Wrapper>
      <WideDivider />
      {!isMobile && <Spacer value={50} />}
      <SectionTitle>
        <FormattedMessage id="nft_show_properties_title" />
      </SectionTitle>
      <PropertyList>
        {attributes.map(({ rarity, rarityType, traitType, value }) => (
          <PropertyItem
            key={`nft_property_${traitType}_${value}`}
            type={traitType}
            value={value}
            rarityType={rarityType}
            rarity={rarity}
          />
        ))}
      </PropertyList>
    </Wrapper>
  );
};

export default React.memo(Properties);

export const PropertiesSkeleton = React.memo(() => (
  <Wrapper>
    <SectionTitle>
      <FormattedMessage id="nft_show_properties_title" />
    </SectionTitle>
    <PropertyList>
      <StyledSkeleton height={px2rem(128)} />
      <StyledSkeleton height={px2rem(128)} />
      <StyledSkeleton height={px2rem(128)} />
    </PropertyList>
  </Wrapper>
));
