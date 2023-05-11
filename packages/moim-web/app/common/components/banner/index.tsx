import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { Wrapper, ImageBanner, ColorBanner } from "./styled";

type IProps<T> = {
  banner: Moim.IBanner;
  styles?: FlattenInterpolation<T>;
} & T;

function Banner<T>(props: React.PropsWithChildren<IProps<T>>) {
  const { banner, styles, children, ...rest } = props;

  const bannerElement = React.useMemo(() => {
    if (banner.type === "image") {
      return (
        <ImageBanner imageSrc={banner.data.url} styles={styles} {...rest}>
          {children}
        </ImageBanner>
      );
    } else if (banner.type === "color") {
      return (
        <ColorBanner color={banner.data.color} styles={styles} {...rest}>
          {children}
        </ColorBanner>
      );
    } else {
      return null;
    }
  }, [banner.type, banner.data, styles, rest, children]);

  return <Wrapper>{bannerElement}</Wrapper>;
}

export default Banner;
