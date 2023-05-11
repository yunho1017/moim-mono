import * as React from "react";
import { useIntl } from "react-intl";
import { IProps } from "../";
// hooks
import { useStoreState } from "app/store";
import { getEditPositionLoadingSelector } from "app/selectors/position";
import useCurrentUser from "common/hooks/useCurrentUser";
import useStateWithError from "common/hooks/useStateWithError";
// helper
import { validatePositionName, validatePositionDescription } from "../helper";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const { mode, positionId } = props;
  const intl = useIntl();

  const { createPositionLoading, editPositionLoading } = useStoreState(
    storeState => ({
      createPositionLoading: storeState.position.createPositionLoading,
      editPositionLoading: getEditPositionLoadingSelector(
        storeState,
        positionId,
      ),
    }),
  );

  const {
    state: name,
    setState: setName,
    error: nameValidationError,
  } = useStateWithError<string>(props.name ?? "", validatePositionName, {
    invalidateNotSet: false,
  });

  const {
    state: description,
    setState: setDescription,
    error: descriptionValidationError,
  } = useStateWithError<string>(
    props.description ?? "",
    validatePositionDescription,
    {
      invalidateNotSet: false,
    },
  );
  const [color, setColor] = React.useState<string | undefined>(props.color);
  const currentUser = useCurrentUser();
  const requiredData = [name, color];
  const requiredDataError = [nameValidationError, descriptionValidationError];
  const hasRequiredData = requiredData.every(val => Boolean(val));
  const hasRequireDataNoError = requiredDataError.every(val => !Boolean(val));
  const isCanSubmit = Boolean(
    hasRequiredData &&
      hasRequireDataNoError &&
      !createPositionLoading &&
      !editPositionLoading,
  );
  const buttonText = intl.formatMessage({
    id: mode === "create" ? "create_button" : "edit_button",
  });

  return {
    ...props,

    name,
    setName,
    nameValidationError,

    description,
    setDescription,
    descriptionValidationError,

    color,
    setColor,

    userName: currentUser?.name,
    userProfileImage: currentUser?.avatar_url,
    buttonText,
    isCanSubmit,
  };
}
