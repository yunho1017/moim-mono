import * as React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import ImageCropper, { IImageCropperRef } from "./";
import { TextButton } from "common/components/designSystem/buttons";
import { FormattedMessage } from "react-intl";

interface IProps
  extends Omit<React.ComponentProps<typeof ImageCropper>, "src" | "ref"> {
  open: boolean;
  src?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const ImageCropperDialog = React.forwardRef<IImageCropperRef, IProps>(
  ({ open, onClose, onSuccess, src, ...rest }: IProps, ref) => (
    <Dialog open={open}>
      <DialogTitle>
        <FormattedMessage id="image_crop_dialog_title" />
      </DialogTitle>
      <DialogContent>
        {src && <ImageCropper src={src} {...rest} ref={ref} />}
      </DialogContent>
      <DialogActions>
        <TextButton size="m" onClick={onClose}>
          <FormattedMessage id="cancel_button" />
        </TextButton>
        <TextButton size="m" onClick={onSuccess} autoFocus>
          <FormattedMessage id="save_button" />
        </TextButton>
      </DialogActions>
    </Dialog>
  ),
);

export default ImageCropperDialog;
