import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";
import ShavedTextV2 from "common/components/shavedText/v2";
import {
  Head,
  BackgroundColor,
  Image,
  ImageDim,
  HeadContent,
  Title,
  Description,
} from "./styled";

interface IProps {
  title: string;
  description: string;
  showCoverImage?: boolean;
  backgroundColor?: string;
  coverImageUrls?: string[];
  coverImageUrls_web?: string[];
  backgroundImageUrls?: string[];
  backgroundImageUrls_web?: string[];
}

const Header: React.FC<IProps> = ({
  title,
  description,
  showCoverImage = false,
  backgroundColor,
  coverImageUrls,
  coverImageUrls_web,
  backgroundImageUrls,
  backgroundImageUrls_web,
}) => {
  const isMobile = useIsMobile();

  const backgroundImage = React.useMemo(
    () =>
      (isMobile || !backgroundImageUrls_web?.length
        ? backgroundImageUrls
        : backgroundImageUrls_web) ?? [],
    [isMobile, backgroundImageUrls, backgroundImageUrls_web],
  );
  const coverImage = React.useMemo(
    () =>
      (isMobile || !coverImageUrls_web?.length
        ? coverImageUrls
        : coverImageUrls_web) ?? [],
    [isMobile, coverImageUrls, coverImageUrls_web],
  );

  return (
    <Head>
      <BackgroundColor color={backgroundColor} />
      {showCoverImage && coverImage.length > 0 ? (
        coverImage[0] ? (
          <Image src={coverImage[0]} />
        ) : null
      ) : (
        <>
          {Boolean(backgroundImage.length) ? (
            <Image src={backgroundImage[0]} />
          ) : null}
          <ImageDim />
          <HeadContent>
            <Title>{title}</Title>
            <ShavedTextV2 line={2}>
              <Description>{description}</Description>
            </ShavedTextV2>
          </HeadContent>
        </>
      )}
    </Head>
  );
};

export default Header;
