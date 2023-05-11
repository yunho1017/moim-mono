import { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import * as React from "react";
import styled from "styled-components";
import LazyBlurHashImage from "common/components/lazyBlurHashImage";
import { TextGeneralButton } from "common/components/designSystem/buttons";
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";

const RECOMMEND_SIZE = 800;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
`;

const CloseButton = styled(TextGeneralButton).attrs({ size: "l" })`
  width: 100%;
  flex: 1;
`;

interface IProps {
  image: Moim.IImage;
  closeButtonTexts: Record<string, { singular: string; plural?: string }>;
  onImageClick(): void;
  onDismissClick(): void;
}

const ImageContentInner: React.FC<IProps> = ({
  image,
  closeButtonTexts,
  onImageClick,
  onDismissClick,
}) => {
  const locale = useCurrentUserLocale();

  const closeButtonText = React.useMemo(() => {
    if (isEmpty(closeButtonTexts)) {
      return <FormattedMessage id="app_bottom_sheet_button_close" />;
    }
    const fallbackKey = Object.keys(closeButtonTexts)[0];
    return (closeButtonTexts[locale] ?? closeButtonTexts[fallbackKey]).singular;
  }, [closeButtonTexts, locale]);

  return (
    <Wrapper>
      <LazyBlurHashImage
        src={image.url}
        width={image.width ?? RECOMMEND_SIZE}
        height={image.height ?? RECOMMEND_SIZE}
        blurHash={image.blur_hash ?? image.blurhash}
        onClick={onImageClick}
      />
      <ButtonContainer>
        <CloseButton onClick={onDismissClick}>
          <span>{closeButtonText}</span>
        </CloseButton>
      </ButtonContainer>
    </Wrapper>
  );
};

export default React.memo(ImageContentInner);
