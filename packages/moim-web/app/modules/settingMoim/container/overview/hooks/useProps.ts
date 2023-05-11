import { useContext } from "react";

// hook
import useRedirect from "common/hooks/useRedirect";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
// selector
import {
  getUpdateMoimErrorSelector,
  isUpdateMoimLoadingSelector,
} from "app/selectors/moim";
// action
import {
  renameMoim as renameMoimAction,
  setMoimDescription as setMoimDescriptionAction,
  updateMoimIcon as updateMoimIconAction,
  updateMoimBanner,
} from "app/actions/group";
// type
import { IProps } from "../";

import BannerContext from "app/modules/settingMoim/context";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const states = useStoreState(storeState => ({
    loading: isUpdateMoimLoadingSelector(storeState),
    error: getUpdateMoimErrorSelector(storeState),
  }));
  const actions = useActions({
    renameMoim: renameMoimAction,
    setDescriptionMoim: setMoimDescriptionAction,
    updateMoimIcon: updateMoimIconAction,
    dispatchUpdateMoimBanner: updateMoimBanner,
  });
  const redirect = useRedirect();
  const currentGroup = useCurrentGroup();
  const cancelToken = useCancelToken();
  const { bannerPreview } = useContext(BannerContext);

  return {
    ...props,
    ...states,
    ...actions,
    redirect,
    currentGroup,
    cancelToken,
    bannerPreview,
  };
}
