import * as React from "react";
import { FormattedMessage } from "react-intl";
import styled, { css, FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import useIsMobile from "app/common/hooks/useIsMobile";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { B2RegularStyle } from "common/components/designSystem/typos";
import { marginToPadding } from "../helper/blockitStyleHelpers";

const TextContainer = styled.span`
  white-space: pre-wrap;
  word-break: break-word;
`;

const FoldButton = styled.div<{ isFolded: boolean; isShaved?: boolean }>`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${props =>
    props.isFolded
      ? css`
          display: inline-block;
        `
      : css`
          display: block;
          text-align: right;
        `};
  ${props =>
    props.isShaved
      ? css`
          visibility: visible;
        `
      : css`
          visibility: hidden;
        `}
`;

const shaveWrapperStyle = css``;

const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  display: inline-block;
  width: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  padding: ${px2rem(4)} ${px2rem(16)};
  ${props => marginToPadding(props.margin)};
  ${B2RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${props => props.overrideStyle};

  &:hover ${FoldButton} {
    text-decoration: underline;
  }
`;

interface IProps extends Omit<Moim.Blockit.IShavedText, "type"> {
  shaveLine?: number;
  wrapperStyle?: FlattenInterpolation<any>;
}

const ShavedTextBlock: React.FC<IProps> = ({
  content,
  shaveLine = 3,
  margin,
  wrapperStyle,
}) => {
  const [isShaved, setShaved] = React.useState(false);
  const [isFolded, setFoldStatus] = React.useState(true);
  const isMobile = useIsMobile();

  const handleClickWrapper = React.useCallback(() => {
    if (isMobile) {
      setFoldStatus(!isFolded);
    }
  }, [isFolded, isMobile]);

  const handleClickFoldButton = React.useCallback(() => {
    setFoldStatus(!isFolded);
  }, [isFolded]);

  const contentElement = React.useMemo(
    () => <NativeEmojiSafeText value={content} />,
    [content],
  );
  const foldElement = React.useMemo(
    () => (
      <FoldButton
        role="button"
        isFolded={isFolded}
        isShaved={isShaved}
        onClick={handleClickFoldButton}
      >
        {isFolded ? (
          <FormattedMessage id="shaved_more" />
        ) : (
          <FormattedMessage id="shaved_hide" />
        )}
      </FoldButton>
    ),
    [handleClickFoldButton, isFolded, isShaved],
  );

  const innerElement = React.useMemo(() => {
    if (isFolded) {
      return (
        <ShavedText
          line={shaveLine}
          value={contentElement}
          wrapperStyle={shaveWrapperStyle}
          endFix={foldElement}
          onShaved={setShaved}
        />
      );
    } else {
      return (
        <>
          <TextContainer>{contentElement}</TextContainer>
          {foldElement}
        </>
      );
    }
  }, [contentElement, foldElement, isFolded, shaveLine]);

  return (
    <Wrapper
      role={isMobile ? "button" : undefined}
      overrideStyle={wrapperStyle}
      margin={margin}
      onClick={handleClickWrapper}
    >
      {innerElement}
    </Wrapper>
  );
};

export default React.memo(ShavedTextBlock);
