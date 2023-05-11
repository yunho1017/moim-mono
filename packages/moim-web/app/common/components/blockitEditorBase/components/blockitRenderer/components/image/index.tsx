import * as React from "react";
import shortid from "shortid";
import styled, { css, FlattenInterpolation } from "styled-components";
import useRedirect from "common/hooks/useRedirect";
import { useActions } from "app/store";
import { ActionCreators as ImageBrochureActionCreators } from "common/components/imageBrochure/actions";
import { withPlacement } from "../../hoc/withPlacement";

type IProps = Omit<Moim.Blockit.IImageBlock, "type"> & {
  wrapperStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
};

const ImageContainer = styled.div<{
  ratio?: string;
}>`
  ${props => {
    if (props.ratio) {
      const rW = parseInt(props.ratio.split(":")[0], 10);
      const rH = parseInt(props.ratio.split(":")[1], 10);
      return css`
        position: relative;
        width: 100%;
        height: 0;
        padding-top: ${Math.round(100 * (rH / rW))}%;

        & > img {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
      `;
    } else {
      return css`
        width: 100%;
        height: 100%;

        & > {
          width: 100%;
        }
      `;
    }
  }}
`;

const ImageBlock: React.FC<IProps> = ({
  src,
  ratio,
  imageHref,
  fallbackSrc,
}) => {
  const redirect = useRedirect();
  const [isError, setError] = React.useState(false);
  const [uniqueId] = React.useState(shortid.generate());
  const { openSrcImageBrochure } = useActions({
    openSrcImageBrochure: ImageBrochureActionCreators.openSrcImageBrochure,
  });
  const handleClick = React.useCallback<
    React.MouseEventHandler<HTMLImageElement>
  >(
    e => {
      if (imageHref) {
        redirect(imageHref);
      } else {
        const target = e.currentTarget;
        if (target) {
          target.dataset.brochureSelected = "true";
          openSrcImageBrochure(src);
        }
      }
    },
    [imageHref, redirect, openSrcImageBrochure, src],
  );

  const currentSrc = React.useMemo(() => {
    if (isError && fallbackSrc) {
      return fallbackSrc;
    }
    return src;
  }, [fallbackSrc, isError, src]);

  const handleError = React.useCallback(() => {
    setError(true);
  }, []);

  return (
    <ImageContainer ratio={ratio}>
      <img
        role="button"
        src={currentSrc}
        data-role={`brochure-thumbnail-${uniqueId}`}
        onError={handleError}
        onClick={handleClick}
      />
    </ImageContainer>
  );
};

export default withPlacement(ImageBlock);
