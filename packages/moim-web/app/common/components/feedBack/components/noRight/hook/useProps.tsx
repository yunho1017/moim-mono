import { useHistory } from "react-router";
import { useIntl } from "react-intl";
import useRedirect from "common/hooks/useRedirect";
import useCurrentGroup from "common/hooks/useCurrentGroup";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps() {
  const intl = useIntl();
  const history = useHistory();
  const redirect = useRedirect();
  const currentGroup = useCurrentGroup();

  return {
    intl,
    history,
    redirect,
    currentGroup,
  };
}
