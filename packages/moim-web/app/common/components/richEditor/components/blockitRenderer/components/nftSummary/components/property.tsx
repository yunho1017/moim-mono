import * as React from "react";
import {
  PropertyWrapper,
  PropertyItem,
  TraitType,
  TraitValue,
  RarityWrapper,
} from "./styled";
import ShavedText from "common/components/shavedText";
import useIsMobile from "common/hooks/useIsMobile";
import RarityGraph from "./rarityGraph";

interface IProps {
  attributes: Moim.NFT.INftAttribute[] | null;
  config: Moim.NFT.INftSummaryPropertyConfig;
}

const Property = ({ attributes, config }: IProps) => {
  const isMobile = useIsMobile();

  const columnCnt = React.useMemo(() => {
    if (isMobile) return config.columnCount;
    else return config.columnCount_web;
  }, [config, isMobile]);

  const propertyElement = React.useMemo(
    () =>
      attributes?.map((property, idx) => (
        <PropertyItem key={`nft_attribute_${idx}`} columnCnt={columnCnt}>
          <TraitType>{property.traitType}</TraitType>
          <TraitValue>
            <ShavedText value={property.value} line={1} />
          </TraitValue>
          {property.rarity && (
            <RarityWrapper>
              <RarityGraph type={property.rarityType} value={property.rarity} />
            </RarityWrapper>
          )}
        </PropertyItem>
      )),
    [attributes, columnCnt],
  );

  if (!attributes?.length) return null;
  return <PropertyWrapper>{propertyElement}</PropertyWrapper>;
};

export default React.memo(Property);
