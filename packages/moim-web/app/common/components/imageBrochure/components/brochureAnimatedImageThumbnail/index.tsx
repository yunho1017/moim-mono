import * as React from "react";
import shortid from "shortid";
import { useActions } from "app/store";
import RawHlsVideo, {
  IProps as RawHlsVideoProps,
} from "common/components/hlsVideo";
import { ActionCreators as ImageBrochureActionCreators } from "common/components/imageBrochure/actions";

interface IProps extends RawHlsVideoProps {
  ownerId: Moim.Id;
  fileId: Moim.Id;
  dataRole?: string;
}

const BrochureAnimatedImageThumbnail: React.RefForwardingComponent<
  any,
  IProps
> = ({ ownerId, onClick, dataRole, fileId, ref: _ref, ...rest }, ref) => {
  const uniqueId = shortid.generate();
  const { openImageBrochure } = useActions({
    openImageBrochure: ImageBrochureActionCreators.openImageBrochure,
  });
  const handleClick = React.useCallback<
    React.MouseEventHandler<HTMLVideoElement>
  >(
    e => {
      const target = e.currentTarget;
      if (target) {
        target.dataset.brochureSelected = "true";
        openImageBrochure(ownerId);
      }
    },
    [ownerId, openImageBrochure],
  );

  return (
    <RawHlsVideo
      onClick={handleClick}
      ref={ref}
      data-role={
        dataRole ? `brochure-${dataRole}` : `brochure-thumbnail-${uniqueId}`
      }
      data-file-id={fileId}
      {...rest}
    />
  );
};

export default React.forwardRef<any, IProps>(BrochureAnimatedImageThumbnail);
