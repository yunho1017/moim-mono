import * as React from "react";
import shortid from "shortid";
import { useActions } from "app/store";
import ImageHolder, {
  IProps as IImageHolderProps,
} from "common/components/imageHolder";

import { ActionCreators as ImageBrochureActionCreators } from "common/components/imageBrochure/actions";

interface IProps extends IImageHolderProps {
  ownerId: Moim.Id;
  fileId: Moim.Id;
  disableClick?: boolean;
  dataRole?: string;
}

const BrochureImageThumbnail: React.RefForwardingComponent<any, IProps> = (
  { ownerId, disableClick, onClick, fileId, dataRole, ref: _ref, ...rest },
  ref,
) => {
  const [uniqueId] = React.useState(shortid.generate());
  const { openImageBrochure } = useActions({
    openImageBrochure: ImageBrochureActionCreators.openImageBrochure,
  });
  const handleClick = React.useCallback<
    React.MouseEventHandler<HTMLImageElement>
  >(
    e => {
      if (disableClick) {
        return;
      }
      const target = e.currentTarget;
      if (target) {
        target.dataset.brochureSelected = "true";
        openImageBrochure(ownerId);
      }
      if (onClick) {
        onClick(e);
      }
    },
    [disableClick, ownerId, onClick, openImageBrochure],
  );

  return (
    <ImageHolder
      ref={ref}
      data-role={
        dataRole ? `brochure-${dataRole}` : `brochure-thumbnail-${uniqueId}`
      }
      onClick={handleClick}
      data-file-id={fileId}
      {...rest}
    />
  );
};

export default React.forwardRef<{}, IProps>(BrochureImageThumbnail);
