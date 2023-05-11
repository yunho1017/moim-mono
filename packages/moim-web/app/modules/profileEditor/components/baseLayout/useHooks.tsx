import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import useStateWithMaxLength from "common/hooks/useStateWithMaxLength";
import useProfileInputDisabled from "common/hooks/useProfileInputDisabled";
import useUsernameValidation, {
  ErrorStatusCode,
  REGEX_SPECIAL_CHARACTER,
} from "common/hooks/useValidNameCheck";
import { IReasonType } from "common/components/reasonInput";

export const BIO_MAX_LENGTH = 300;

export interface ProfileEditorChangeEvent extends Moim.User.IUpdatableInfo {
  nameHasError: boolean;
  bioHasError: boolean;
}

export interface IProps {
  userData: Moim.User.IUser;
  isAvatarUpdating: boolean;
  onChange(profile: ProfileEditorChangeEvent): void;
}

export function useProps(props: IProps) {
  const { onChange } = props;
  const intl = useIntl();
  const [avatarId, setAvatarId] = React.useState<Moim.Id | undefined>(
    undefined,
  );
  const nameHandler = useUsernameValidation();
  const bioHandler = useStateWithMaxLength({
    maxLength: 300,
    minLength: 0,
  });
  const inputDisabled = useProfileInputDisabled();

  React.useEffect(() => {
    const profile = {
      name: nameHandler.changed ? nameHandler.state : undefined,
      nameHasError: Boolean(nameHandler.error),
      bio: bioHandler.changed ? bioHandler.state : undefined,
      bioHasError: Boolean(bioHandler.error),
      avatar_id: avatarId,
    };
    if (nameHandler.changed || bioHandler.changed || avatarId !== undefined) {
      onChange(profile);
    }
  }, [
    onChange,
    nameHandler.state,
    bioHandler.state,
    nameHandler.error,
    bioHandler.error,
    nameHandler.changed,
    bioHandler.changed,
    avatarId,
  ]);

  return {
    ...props,
    intl,
    nameHandler,
    bioHandler,
    avatarId,
    inputDisabled,
    setAvatarId,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const { nameHandler, bioHandler, setAvatarId } = props;

  const handleChangeName: React.FormEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      nameHandler.handleChange(e.currentTarget.value.trimLeft());
    },
    [nameHandler],
  );

  const nameErrorMessage = React.useMemo(() => {
    const error = nameHandler.error;
    if (Boolean(nameHandler.state)) {
      if (!error) {
        return (
          <FormattedMessage id="set_your_name/input_field_guide_success" />
        );
      }

      switch (error.code as ErrorStatusCode) {
        case "INVALID_USERNAME":
          return (
            <FormattedMessage
              id="set_your_name/input_field_error_substrings"
              values={{
                substring:
                  new RegExp(REGEX_SPECIAL_CHARACTER).exec(
                    nameHandler.state,
                  )?.[0] || "",
              }}
            />
          );
        case "INVALID_USERNAME_LENGTH":
          return (
            <FormattedMessage id="set_your_name/input_field_error_character" />
          );

        case "DUPLICATED_USERNAME_IN_PARENT_GROUP":
        case "DUPLICATED_USERNAME":
          return (
            <FormattedMessage id="set_your_name/input_field_error_duplicated" />
          );
        case "FORBIDDEN_USERNAME":
          return (
            <FormattedMessage
              id="set_your_name/input_field_error_ban"
              values={{ name: nameHandler.state }}
            />
          );
        case "INVALID_PARAMETER": {
          return null;
        }

        default:
          return <span>{error.message}</span>;
      }
    }
  }, [nameHandler.state, nameHandler.error]);

  const nameErrorType: IReasonType = React.useMemo(() => {
    if (Boolean(nameHandler.state)) {
      if (nameHandler.error) {
        return "error";
      } else {
        return "success";
      }
    }
    return "normal";
  }, [nameHandler.state, nameHandler.error]);

  const handleChangeBio = React.useCallback(
    value => {
      bioHandler.handleChange(value.trimLeft());
    },
    [bioHandler],
  );

  const bioErrorMessage = React.useMemo(() => {
    const error = bioHandler.error;
    if (Boolean(bioHandler.state)) {
      if (!error) {
        return <span></span>;
      }

      switch (error.code) {
        case "START_WITH_WHITE_SPACE":
        case "TOO_SHORT":
        case "TOO_LONG":
          return (
            <FormattedMessage
              id="error_character_number_limit"
              values={{ count: BIO_MAX_LENGTH }}
            />
          );

        default:
          return <span>{error.message}</span>;
      }
    }
  }, [bioHandler.state, bioHandler.error]);

  const bioErrorType: IReasonType = React.useMemo(() => {
    if (Boolean(bioHandler.state)) {
      if (bioHandler.error) {
        return "error";
      } else {
        return "success";
      }
    }
    return "normal";
  }, [bioHandler.state, bioHandler.error]);

  const handleChangeAvatar = React.useCallback(
    (avatarId: Moim.Id) => {
      setAvatarId(avatarId);
    },
    [setAvatarId],
  );

  return {
    ...props,
    handleChangeName,
    nameErrorMessage,
    nameErrorType,
    handleChangeBio,
    handleChangeAvatar,
    bioErrorMessage,
    bioErrorType,
  };
}
