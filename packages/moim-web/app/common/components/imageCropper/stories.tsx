import * as React from "react";
import useFileURL from "common/hooks/useFileURL";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import ImageCropper, { IImageCropperRef } from "./index";

const { storiesOf } = require("@storybook/react");

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/ImageCropper`, module).add(
  "index",
  () => {
    const { setFile, imageSrc } = useFileURL();
    const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
      e => {
        const target = e.target as HTMLInputElement;
        setFile(target.files?.[0] || null);
      },
      [setFile],
    );
    const imageCropperRef = React.useRef<IImageCropperRef>(null);
    const { setFile: setCropFile, imageSrc: cropImageSrc } = useFileURL();
    const handleSuccessCrop = React.useCallback(async () => {
      setCropFile((await imageCropperRef.current?.toBlob()) || null);
    }, [setCropFile]);
    return (
      <>
        <input type="file" onChange={handleChangeFile} accept="image/*" />
        {cropImageSrc ? (
          <div>
            <img src={cropImageSrc} />
          </div>
        ) : (
          imageSrc && (
            <div>
              <button onClick={handleSuccessCrop}>OK</button>
              <ImageCropper ref={imageCropperRef} src={imageSrc} />
            </div>
          )
        )}
      </>
    );
  },
);
