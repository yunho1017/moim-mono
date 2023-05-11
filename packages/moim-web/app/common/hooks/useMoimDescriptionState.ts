import * as React from "react";
import useStateWithMaxLength from "common/hooks/useStateWithMaxLength";

export const MAX_MOIM_DESCRIPTION_LENGTH = 1000;

function useMoimDescriptionState(defaultValue?: string) {
  const descriptionParams = React.useMemo(
    () => ({
      defaultValue,
      minLength: 0,
      maxLength: MAX_MOIM_DESCRIPTION_LENGTH,
    }),
    [defaultValue],
  );

  const {
    state: description,
    error: descriptionError,
    handleChange: setDescription,
  } = useStateWithMaxLength(descriptionParams);

  return {
    description,
    descriptionError,
    setDescription,
  };
}

export default useMoimDescriptionState;
