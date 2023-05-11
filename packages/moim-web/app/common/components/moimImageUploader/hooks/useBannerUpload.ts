import * as React from "react";
import { useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";

import { cropGroupBanner } from "app/actions/group";

export function useBannerUpload() {
  const { dispatchCropBanner } = useActions({
    dispatchCropBanner: cropGroupBanner,
  });
  const cancelToken = useCancelToken();
  const handleCrop = React.useCallback(
    async (id: string, cropData: Cropper.CropBoxData) => {
      dispatchCropBanner(
        {
          id,
          extract: {
            top: Math.round(cropData.top),
            left: Math.round(cropData.left),
            width: Math.round(cropData.width),
            height: Math.round(cropData.height),
          },
        },
        cancelToken.current.token,
      );
    },
    [dispatchCropBanner, cancelToken],
  );

  return {
    handleCrop,
  };
}
