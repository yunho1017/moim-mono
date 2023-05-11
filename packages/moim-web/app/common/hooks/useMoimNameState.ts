import * as React from "react";
import useStateWithMaxLength from "common/hooks/useStateWithMaxLength";

const MAX_MOIM_NAME_LENGTH = 60;

function useMoimNameState(defaultValue?: string) {
  const nameParams = React.useMemo(
    () => ({ defaultValue, minLength: 2, maxLength: MAX_MOIM_NAME_LENGTH }),
    [defaultValue],
  );

  const {
    state: name,
    error: nameError,
    handleChange: setName,
  } = useStateWithMaxLength(nameParams);

  return {
    name,
    nameError,
    setName,
  };
}

export default useMoimNameState;
