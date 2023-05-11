import * as React from "react";
import { AxiosError } from "axios";
import moment from "moment-timezone";

import { IHookProps } from "./";
import { CreateMoimStep } from "app/enums";
import { MoimURL } from "common/helpers/url";
import getUserLocale from "common/helpers/getUserLocale";
import { errorParseData } from "common/helpers/APIErrorParser";
import {
  getCryptoBadgeToken,
  removeCryptoBadgeToken,
} from "common/helpers/cryptoBadgeHandlerWithInMemory";
import { checkAndLogException } from "common/helpers/errorLogger";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const {
    intl,
    cancelToken,
    step,
    setStep,
    name,
    domain,
    access,
    icon,
    username,
    push,
    goBack,
    usernameSetError,
    dispatchCreateGroup,
  } = props;

  const handleCreateGroupError = React.useCallback(
    (err: AxiosError) => {
      const parsedError = errorParseData(err);
      if (!parsedError) return;

      switch (parsedError.code) {
        case "INVALID_USERNAME_LENGTH":
        case "DUPLICATED_USERNAME_IN_PARENT_GROUP":
        case "DUPLICATED_USERNAME":
        case "INVALID_USERNAME":
        case "FORBIDDEN_USERNAME":
        case "INVALID_PARAMETER": {
          usernameSetError(parsedError);
          break;
        }
        case "DOMAIN_ALREADY_IN_USE": {
          window.alert("domain already in use!!!");
          break;
        }
        default: {
          removeCryptoBadgeToken();
          window.alert(
            intl.formatMessage({ id: "popup_session_expired_body" }),
          );
          location.reload();
          break;
        }
      }
    },
    [intl, usernameSetError],
  );

  const handleCreateGroupButtonClick = React.useCallback(async () => {
    const createGroupData: Moim.Group.ICreateGroupRequestBody = {
      name: name.value,
      domain: domain.value,
      is_public: access.value === "public",
      icon: icon.value.icon && {
        type: "image",
        data: { id: icon.value.icon.id },
      },
      creator: {
        name: username.value,
        tz: moment.tz.guess(),
        locale: getUserLocale(),
        authentication: {
          provider: "cryptobadge",
          token: getCryptoBadgeToken() || "",
        } as any,
      },
    };

    try {
      await dispatchCreateGroup(
        createGroupData,
        cancelToken.current.token,
        handleCreateGroupError,
      );
    } catch (err) {
      throw err;
    }
  }, [
    name.value,
    domain.value,
    access.value,
    icon.value.icon,
    username.value,
    dispatchCreateGroup,
    cancelToken,
    handleCreateGroupError,
  ]);

  const moveStep = React.useCallback(
    (direction: 1 | -1) => {
      const newStep = step + direction;
      if (newStep > CreateMoimStep.MOIM_RESULT) {
        push(new MoimURL.HubHome().toString());
        return;
      }

      setStep(newStep);
    },
    [setStep, step, push],
  );
  const handleNextButtonClick = React.useCallback(async () => {
    try {
      if (step === CreateMoimStep.USER_NAME) {
        await handleCreateGroupButtonClick();
      }
      moveStep(1);
    } catch (err) {
      checkAndLogException(new Error("Failed to create group"), err);
    }
  }, [handleCreateGroupButtonClick, moveStep, step]);

  const handleBackButtonClick = React.useCallback(() => {
    if (step === CreateMoimStep.MOIM_NAME) {
      goBack();
    } else {
      moveStep(-1);
    }
  }, [goBack, step, moveStep]);

  return {
    handleNextButtonClick,
    handleBackButtonClick,
  };
}
