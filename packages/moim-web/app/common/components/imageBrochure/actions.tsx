import { ImageBrochureTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";

function createAction<T extends { type: ImageBrochureTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  openImageBrochure: (ownerId: Moim.Id) =>
    createAction({
      type: ImageBrochureTypes.OPEN_IMAGE_BROCHURE_DIALOG,
      payload: {
        ownerId,
      },
    }),
  openSrcImageBrochure: (src: string) =>
    createAction({
      type: ImageBrochureTypes.OPEN_SRC_IMAGE_BROCHURE_DIALOG,
      payload: {
        src,
      },
    }),
  closeImageBrochure: () =>
    createAction({
      type: ImageBrochureTypes.CLOSE_IMAGE_BROCHURE_DIALOG,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;
