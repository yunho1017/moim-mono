import * as React from "react";
import { useDebounce } from "react-use";

import { useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import { errorParseData } from "common/helpers/APIErrorParser";

// actions
import { validateGroupDomain } from "app/actions/group";

export default function(prefix?: string) {
  const cancelToken = useCancelToken();
  const { dispatchValidateGroupDomain } = useActions({
    dispatchValidateGroupDomain: validateGroupDomain,
  });

  const [domain, setDomain] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Moim.IErrorResponse | undefined>(
    undefined,
  );

  const handleDomainChange = React.useCallback(
    (newDomain: string) => {
      setIsLoading(true);
      setDomain(newDomain);
    },
    [setDomain],
  );

  useDebounce(
    async () => {
      try {
        if (domain.length) {
          await dispatchValidateGroupDomain(
            {
              domain: (prefix || "") + domain,
            },
            cancelToken.current.token,
          );
          setError(undefined);
        }
      } catch (err) {
        setError(errorParseData(err));
      } finally {
        setIsLoading(false);
      }
    },
    500,
    [domain, cancelToken, dispatchValidateGroupDomain, setError],
  );

  return {
    error,
    domain,
    isLoading,
    setDomain: handleDomainChange,
    validation: Boolean(error),
  };
}
