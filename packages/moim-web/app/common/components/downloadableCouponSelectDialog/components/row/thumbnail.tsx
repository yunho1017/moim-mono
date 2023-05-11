import * as React from "react";
import {
  Left,
  ImageContainer,
  FallbackImageWrapper,
  CouponFallBackIcon,
} from "./styled";

interface IProps {
  images?: {
    web: Moim.Commerce.IImage[];
    mobile: Moim.Commerce.IImage[];
  };
}

const ThumbnailImage: React.FC<IProps> = ({}) => {
  return (
    <Left>
      <ImageContainer>
        <FallbackImageWrapper>
          <CouponFallBackIcon />
        </FallbackImageWrapper>
      </ImageContainer>
    </Left>
  );
};

export default React.memo(ThumbnailImage);
