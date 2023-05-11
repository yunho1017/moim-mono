import * as React from "react";

import {
  Wrapper,
  ImageWrapper,
  Image,
  ImageLoaderContainer,
  Title,
} from "./styled";
import ShavedText from "common/components/shavedText";
import { DefaultLoader } from "common/components/loading";

interface IProps {
  textColor: string | null;
  backgroundColor: string | null;
  icon: string;
  name: string;
  description: string;
  certificateId: string;
  onClick?: React.MouseEventHandler;
}

const CardBadge = React.forwardRef<HTMLDivElement, IProps>(
  ({ icon, name, description, backgroundColor, textColor, onClick }, ref) => {
    const [isImageLoaded, setImageLoadStatus] = React.useState(false);
    const handleLoad = React.useCallback(() => {
      setImageLoadStatus(true);
    }, []);
    const isGif = React.useMemo(
      () => Boolean(icon && icon.toLowerCase().match(".gif")),
      [icon],
    );

    return (
      <Wrapper
        role="button"
        ref={ref}
        onClick={onClick}
        backgroundColor={backgroundColor}
        textColor={textColor}
      >
        <ImageWrapper>
          <Image
            src={icon}
            alt={name}
            onLoad={handleLoad}
            loading="lazy"
            isGif={isGif}
          />

          <ImageLoaderContainer className="loader" isDisplay={!isImageLoaded}>
            <DefaultLoader color={textColor || undefined} />
          </ImageLoaderContainer>
        </ImageWrapper>
        <Title title={description}>
          <ShavedText value={name} line={2} />
        </Title>
      </Wrapper>
    );
  },
);

export default CardBadge;
