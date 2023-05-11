import * as React from "react";
import * as qs from "query-string";
import useRedirect from "common/hooks/useRedirect";
import LazyBlurHashImage from "common/components/lazyBlurHashImage";
import CarouselVideo from "./carouselVideo";
import { LinkWrapper } from "./styled";

interface IProps {
  media: Moim.Blockit.ICarouselImage;
  width: number;
  height: number;
}

export const WithCarouselLink: React.FC<{ to?: string }> = ({
  to,
  children,
}) => {
  const redirect = useRedirect();
  const handleClick = React.useCallback(() => {
    if (to) {
      const nl = new URL(to);
      if (nl.hostname === location.hostname) {
        const nlQuery = qs.parse(nl.search, {
          arrayFormat: "bracket",
        });

        const currentLocationQuery = qs.parse(location.search, {
          arrayFormat: "bracket",
        });

        const nextLocationQuery = qs.parse(nl.search, {
          arrayFormat: "bracket",
        });

        nl.search = qs.stringify({
          ...nlQuery,
          ...currentLocationQuery,
          ...nextLocationQuery,
        });
      }

      redirect(nl.toString());
    }
  }, [redirect, to]);

  if (!to) {
    return <>{children}</>;
  }

  return <LinkWrapper onClick={handleClick}>{children}</LinkWrapper>;
};

const CarouselItemElement: React.FC<IProps> = ({ media, width, height }) => {
  const isVideo = React.useMemo(() => media.mimetype?.includes("video"), [
    media.mimetype,
  ]);

  return (
    <WithCarouselLink key={media.src ?? media.imageSrc} to={media.href}>
      {isVideo ? (
        <CarouselVideo src={media.src} />
      ) : (
        <LazyBlurHashImage
          src={media.src ?? media.imageSrc}
          blurHash={media.blurHash ?? media.blur_hash}
          fallBackSrc={media.fallbackSrc ?? media.src ?? media.imageSrc}
          width={width}
          height={height}
        />
      )}
    </WithCarouselLink>
  );
};

export default React.memo(CarouselItemElement);
