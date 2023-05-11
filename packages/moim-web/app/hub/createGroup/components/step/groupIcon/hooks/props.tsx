import * as React from "react";

import { getURLtoIcon } from "app/hub/createGroup/helpers/getIcon";
import { IProps } from "../";
import { useActions, useStoreState } from "app/store";
import { ActionCreators as HubActionCreators } from "app/actions/hub/app";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps(props: IProps) {
  const { data } = props;
  const storeState = useStoreState(state => ({
    isIconLoading: state.hubPage.isIconUploadLoading,
  }));
  const actions = useActions({
    startIconUpload: HubActionCreators.startFileUpload,
    successIconUpload: HubActionCreators.succeededFileUpload,
    failIconUpload: HubActionCreators.failedFileUpload,
  });

  const cropIcon: Moim.IIcon | null = React.useMemo(
    () => getURLtoIcon(data.value.src),
    [getURLtoIcon, data.value.src],
  );

  return {
    ...props,
    ...storeState,
    ...actions,
    cropIcon,
  };
}
