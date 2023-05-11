import * as React from "react";
import { goBack } from "connected-react-router";
import { ThemeContext } from "styled-components";
import { useIntl } from "react-intl";

import useGroupDomainValidation from "common/hooks/useGroupDomainValidation";
import useCancelToken from "common/hooks/useCancelToken";
import { useProgressStyle } from "../components/styled";
import useUsernameValidation from "common/hooks/useValidNameCheck";
import useFileURL from "common/hooks/useFileURL";
import useMoimNameState from "common/hooks/useMoimNameState";
import { getCryptoBadgeToken } from "common/helpers/cryptoBadgeHandlerWithInMemory";
// actions
import { useActions, useStoreState } from "app/store";
import useRedirect from "common/hooks/useRedirect";
import {
  createGroup,
  ActionCreators as GroupHubActionCreators,
} from "app/actions/group";
// component
import { CreateMoimStep } from "app/enums";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps() {
  const intl = useIntl();
  const states = useStoreState(state => ({
    isIconUploadLoading: state.hubPage.isIconUploadLoading,
    isCreateMoimLoading: state.hubPage.isCreateMoimLoading,
    moimIcon: state.hub.app.moimIcon,
  }));
  const actions = useActions({
    dispatchCreateGroup: createGroup,
    clearMoimIcon: GroupHubActionCreators.clearMoimIcon,
    goBack,
  });
  const push = useRedirect();
  const cancelToken = useCancelToken();
  const classes = useProgressStyle(React.useContext(ThemeContext));
  const [step, setStep] = React.useState<number>(CreateMoimStep.MOIM_NAME);
  const percentOfStep = React.useMemo(
    () => Math.round((step / CreateMoimStep.MOIM_RESULT) * 100),
    [step],
  );
  const cryptoBadgeAccessToken = getCryptoBadgeToken();

  const { name, nameError, setName } = useMoimNameState();
  const {
    domain,
    setDomain,
    error: domainError,
    isLoading: domainIsLoading,
  } = useGroupDomainValidation();
  const [access, setAccess] = React.useState<Moim.Channel.AccessRight>(
    "public",
  );
  const { setFile: setCropIcon, imageSrc: cropIconSrc } = useFileURL();
  const {
    state: username,
    error: usernameError,
    setError: usernameSetError,
    handleChange: handleUsernameChange,
  } = useUsernameValidation();

  const handleSetIcon = React.useCallback(
    (blob: Blob | null) => {
      setCropIcon(blob);
    },
    [setCropIcon],
  );

  return {
    ...actions,
    intl,
    push,
    cancelToken,
    cryptoBadgeAccessToken,

    classes,
    percentOfStep,

    step,
    setStep,

    name: {
      value: name,
      error: nameError,
      handler: setName,
    },
    domain: {
      value: domain,
      error: domainError,
      isLoading: domainIsLoading,
      handler: setDomain,
    },
    access: {
      value: access,
      handler: setAccess,
    },
    icon: {
      value: {
        src: cropIconSrc,
        icon: states.moimIcon,
      },
      isLoading: states.isIconUploadLoading,
      handler: handleSetIcon,
    },
    username: {
      value: username,
      error: usernameError,
      isLoading: states.isCreateMoimLoading,
      handler: handleUsernameChange,
    },
    usernameSetError,
  };
}
