import useIsMobile from "common/hooks/useIsMobile";
import React from "react";
import {
  MobileWrapper,
  DesktopWrapper,
  CoinName,
  CoinPreviewImage,
} from "./styled";

const CoinPreview: React.FC<{
  image: string;
  title: string;
}> = ({ image, title }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileWrapper>
        <CoinPreviewImage src={image} alt={title} />
        <CoinName>{title}</CoinName>
      </MobileWrapper>
    );
  }

  return (
    <DesktopWrapper>
      <CoinPreviewImage src={image} alt={title} />
      <CoinName>{title}</CoinName>
    </DesktopWrapper>
  );
};

export default CoinPreview;
