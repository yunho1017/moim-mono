import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import { FormattedMessage } from "react-intl";
import useIsMobile from "common/hooks/useIsMobile";
import ImageHolder from "common/components/imageHolder";
import RichEditor from "common/components/richEditor";
import EmptySection from "../emptySection";
import {
  Wrapper,
  Veil,
  MoreButton,
  IconWrapper,
  DownArrowIcon,
  UpArrowIcon,
} from "./styled";

interface IProps {
  productType: Moim.Commerce.PRODUCT_TYPE;
  content?: Moim.Blockit.Blocks[];
  detailImages?: {
    web: Moim.Commerce.IImage[];
    mobile: Moim.Commerce.IImage[];
  };
}

const ProductDetail: React.FC<IProps> = ({
  productType,
  content,
  detailImages,
}) => {
  const [needHide, setNeedHide] = React.useState(false);
  const [isHide, setHideStatus] = React.useState(false);
  const [isInitialed, setInitialStatus] = React.useState(false);
  const [wrapperHeight, setWrapperHeight] = React.useState(
    Boolean(content?.length)
      ? content?.reduce((acc, block) => {
          if (block.hasOwnProperty("height")) {
            return ((block as any).height as number) + acc;
          }
          return acc;
        }, 0) ?? -1
      : -1,
  );
  const [imageLoadStatus, setImageLoadStatus] = React.useState<
    Record<string, boolean>
  >({});
  const isMobile = useIsMobile();
  const targetImages =
    (isMobile
      ? detailImages?.mobile
      : detailImages?.web && detailImages?.web.length > 0
      ? detailImages.web
      : detailImages?.mobile) ?? [];

  const allImageLoaded = React.useMemo(() => {
    if (
      targetImages.length === 0 ||
      targetImages.length !== Object.keys(imageLoadStatus).length
    ) {
      return false;
    }
    return Object.entries(imageLoadStatus).every(([, status]) => status);
  }, [imageLoadStatus, targetImages.length]);

  const handleImageLoadStart: React.ReactEventHandler<HTMLImageElement> = React.useCallback(
    e => {
      const key = e.currentTarget.dataset.key;
      if (key) {
        setImageLoadStatus(state => ({ ...state, [key]: false }));
      }
    },
    [],
  );
  const handleImageLoaded: React.ReactEventHandler<HTMLImageElement> = React.useCallback(
    e => {
      const key = e.currentTarget.dataset.key;
      if (key) {
        setImageLoadStatus(state => ({ ...state, [key]: true }));
      }
    },
    [],
  );

  const elements = React.useMemo(() => {
    if (content && content.length > 0) {
      return (
        <RichEditor
          key="product_detail_images"
          id="product_detail_images"
          contents={content}
          readonly={true}
        />
      );
    }

    if (
      !detailImages ||
      !targetImages ||
      targetImages.length === 0 ||
      (targetImages.length === 0 && content && content.length === 0)
    ) {
      return (
        <EmptySection>
          <FormattedMessage id="product_show_product_details_empty" />
        </EmptySection>
      );
    }

    return targetImages.map((item, idx) => (
      <ImageHolder
        key={`product_detail_image_${idx}`}
        data-key={`product_detail_image_${idx}`}
        src={item.url ?? item.src ?? item.fallbackSrc}
        srcSet={item.srcSet}
        sizes={!isMobile ? "1000px" : undefined}
        width="100%"
        height={item.height}
        alt={item.url ?? item.src ?? item.fallbackSrc}
        onLoadStart={handleImageLoadStart}
        onLoad={handleImageLoaded}
      />
    ));
  }, [
    content,
    detailImages,
    handleImageLoadStart,
    handleImageLoaded,
    isMobile,
    targetImages,
  ]);

  const handleClickMore = React.useCallback(() => {
    setHideStatus(!isHide);
  }, [isHide]);

  const handleResize = React.useCallback((_: number, height: number) => {
    setWrapperHeight(height);
  }, []);

  const hiddenElement = React.useMemo(
    () =>
      !needHide ? null : isHide ? (
        <Veil>
          <MoreButton onClick={handleClickMore}>
            <FormattedMessage
              id={
                productType === "fund"
                  ? "button_funding_details_more"
                  : "product_show_product_details_button_more"
              }
            />
            <IconWrapper>
              <DownArrowIcon />
            </IconWrapper>
          </MoreButton>
        </Veil>
      ) : (
        <MoreButton onClick={handleClickMore}>
          <FormattedMessage
            id={
              productType === "fund"
                ? "button_funding_details_hide"
                : "product_show_product_details_button_hide"
            }
          />
          <IconWrapper>
            <UpArrowIcon />
          </IconWrapper>
        </MoreButton>
      ),
    [needHide, isHide, handleClickMore, productType],
  );

  React.useLayoutEffect(() => {
    if (
      !isInitialed &&
      (Boolean(content?.length) ? true : allImageLoaded) &&
      wrapperHeight !== -1
    ) {
      setInitialStatus(true);
      if (!isHide && wrapperHeight > (isMobile ? 1200 : 600)) {
        setNeedHide(true);
        setHideStatus(true);
      } else {
        setNeedHide(false);
        setHideStatus(false);
      }
    }
  }, [allImageLoaded, content, isHide, isInitialed, isMobile, wrapperHeight]);

  return (
    <ReactResizeDetector handleHeight={true} onResize={handleResize}>
      <Wrapper needFolded={isHide}>
        {elements}
        {hiddenElement}
      </Wrapper>
    </ReactResizeDetector>
  );
};

export default ProductDetail;
