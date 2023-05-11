import * as React from "react";
import isBoolean from "lodash/isBoolean";

interface IFrag {
  invalidateNotSet: boolean;
}

const DEFAULT_FLAGS = {
  invalidateNotSet: true,
};

function useStateWithError<T>(
  defaultState: T,
  validator: (newState: T) => true | Moim.IErrorResponse,
  flags: IFrag = DEFAULT_FLAGS,
) {
  const { invalidateNotSet } = flags;
  const [state, setState] = React.useState<T>(defaultState);
  const [error, setError] = React.useState<Moim.IErrorResponse | undefined>(
    undefined,
  );
  const handleSetValue = React.useCallback(
    (newState: T) => {
      const validateResult = validator(newState);

      if (!isBoolean(validateResult)) {
        setError(validateResult);

        if (invalidateNotSet) {
          return;
        }
      } else {
        setError(undefined);
      }

      setState(newState);
    },
    [invalidateNotSet, validator],
  );

  return {
    state,
    error,
    setError,
    setState: handleSetValue,
  };
}

export default useStateWithError;
