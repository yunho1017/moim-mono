import * as React from "react";
import { IHookProps } from "./useProps";
import isEmptyString from "common/helpers/isEmptyString";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const { mode, close, position, createPosition, editPosition } = hookProps;

  const handleSubmit = React.useCallback(
    async (data: Moim.Position.IPositionFormData) => {
      const { name, color, description: descriptionData } = data;

      if (mode === "create") {
        await createPosition({
          position: {
            name,
            color,
            description: descriptionData ? descriptionData : undefined,
          },
        });
      } else if (mode === "edit") {
        await editPosition({
          positionId: position!.id,
          position: {
            name,
            color,
            description:
              !descriptionData || isEmptyString(descriptionData)
                ? null
                : descriptionData,
          },
        });
      }

      close();
    },
    [close, createPosition, editPosition, mode, position],
  );

  return {
    handleSubmit,
  };
}
