// vendor
import { matchPath, useLocation } from "react-router";
// hook
import useIsMobile from "common/hooks/useIsMobile";
// helper
import { IProps } from "../";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const { basePathPattern } = props;
  const isMobile = useIsMobile();
  const location = useLocation();

  const isSettingListPage = Boolean(
    matchPath(location.pathname, {
      path: basePathPattern,
      exact: true,
    }),
  );

  return {
    ...props,
    isMobile,
    isSettingListPage,
  };
}
