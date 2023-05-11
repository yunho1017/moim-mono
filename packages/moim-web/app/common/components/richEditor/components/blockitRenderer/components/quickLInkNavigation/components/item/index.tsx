import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import useRedirect from "common/hooks/useRedirect";
import ShavedText from "common/components/shavedText";
import { Wrapper, ItemContainer, ImageWrapper, TextWrapper } from "./styled";

const QuickLinkItem: React.FC<Moim.Blockit.IQuickLinkItem> = ({
  title,
  href,
  image,
}) => {
  const [itemWidth, setItemWidth] = React.useState(0);
  const redirect = useRedirect();
  const textElement = React.useMemo(() => {
    if (image) {
      return (
        <TextWrapper isSingleLine={true}>
          <span>{title}</span>
        </TextWrapper>
      );
    }
    return (
      <TextWrapper isSingleLine={false}>
        <ShavedText line={3} value={title} />
      </TextWrapper>
    );
  }, [image, title]);

  const handleClick = React.useCallback(() => {
    redirect(href);
  }, [redirect, href]);

  const handleResize = React.useCallback(w => {
    setItemWidth(w);
  }, []);

  return (
    <Wrapper onClick={handleClick}>
      <ReactResizeDetector handleWidth={true} onResize={handleResize}>
        <ItemContainer adjustHeight={itemWidth} withImage={Boolean(image)}>
          {image && (
            <ImageWrapper containerWidth={itemWidth}>
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes={`${itemWidth}px`}
              />
            </ImageWrapper>
          )}
          {textElement}
        </ItemContainer>
      </ReactResizeDetector>
    </Wrapper>
  );
};

export default QuickLinkItem;
