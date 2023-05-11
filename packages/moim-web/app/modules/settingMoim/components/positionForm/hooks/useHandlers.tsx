import * as React from "react";
import { IHookProps } from "./useProps";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const {
    name,
    setName,
    description,
    setDescription,
    color,
    setColor,
    onSubmit,
  } = hookProps;

  const handleChangeName = React.useCallback(
    (changedName: string) => {
      setName(changedName);
    },
    [setName],
  );

  const handleChangeDescription = React.useCallback(
    (changedDescription: string) => {
      setDescription(changedDescription);
    },
    [setDescription],
  );

  const handleChangeColor = React.useCallback(
    (currentColor: string) => {
      setColor(currentColor);
    },
    [setColor],
  );

  const handleSubmit = React.useCallback(() => {
    onSubmit({
      name,
      description,
      color: color!,
    });
  }, [onSubmit, name, description, color]);

  return {
    handleChangeName,
    handleChangeDescription,
    handleChangeColor,
    handleSubmit,
  };
}
