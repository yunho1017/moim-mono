import React from "react";
import moment from "moment-timezone";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
// components
import { DefaultLoader as Loader } from "common/components/loading";
import Username from "../../component/username";
import Main from "../../component/main";
import Phone from "../../component/phone";

import { LoadingWrapper } from "../../styled";

import { useStoreState, useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import { useSnackbar } from "common/components/alertTemplates/alerts/globalSnackbar/useGlobalSnackbar";

import { ActionCreators as GroupActionCreators } from "app/actions/group";
import { postUser } from "app/actions/user";
import { currentGroupSelector } from "app/selectors/app";
import getUserLocale from "common/helpers/getUserLocale";
import { getHasSignUpConfig } from "../../helpers";
import * as CookieHandler from "common/helpers/cookieHandler";

import { GROUP_INVITE_CODE } from "common/constants/keys";

interface IProps {
  authentication: Moim.IAuthentication | null;
  step: Moim.Group.JoinGroupDialogStepType | undefined;
  setStep(step: Moim.Group.JoinGroupDialogStepType | undefined): void;
}

const CurrentJoinDialogComponent: React.FC<IProps> = ({
  authentication,
  step,
  setStep,
}: IProps) => {
  const { isLoading, currentGroup, hasSignUpConfig } = useStoreState(state => {
    const currentGroup = currentGroupSelector(state);
    return {
      isLoading:
        state.joinGroupDialog.isLoading ||
        state.joinGroupDialog.isGetParentMoimUserLoading,
      currentGroup,
      hasSignUpConfig: getHasSignUpConfig(currentGroup),
    };
  });
  const { dispatchCloseDialog, dispatchJoinGroup } = useActions({
    dispatchCloseDialog: GroupActionCreators.closeJoinGroupDialog,
    dispatchJoinGroup: postUser,
  });

  const intl = useIntl();
  const cancelToken = useCancelToken();
  const { open: openSnackbar } = useSnackbar({
    text: intl.formatMessage(
      { id: "join_moim_welcome_toast_message" },
      { moim_name: currentGroup?.name },
    ),
  });
  const [joinedUser, setJoinedUser] = React.useState<
    Moim.User.IOriginalUserDatum | undefined
  >();

  const handleAfterJoinGroup = React.useCallback(() => {
    openSnackbar();
    dispatchCloseDialog();
  }, [currentGroup, dispatchCloseDialog, openSnackbar]);

  const handleNextButtonClick = React.useCallback(
    async (
      user: Partial<PickValue<Moim.User.IPostUserRequestBody, "user">>,
    ) => {
      const username = user.name;
      if (!currentGroup || !authentication || !username) {
        return;
      }

      try {
        const inviteCode = CookieHandler.get(
          GROUP_INVITE_CODE(
            currentGroup.is_hub ? currentGroup.id : currentGroup.parent!,
          ),
        );
        const result = await dispatchJoinGroup(
          {
            groupId: currentGroup.id,
            useParentProfile: currentGroup.config.useOnlyParentProfile,
            user: {
              name: username,
              tz: moment.tz.guess(),
              locale: getUserLocale(),
              authentication: { ...authentication, provider: "cryptobadge" },
              ...user,
            },
            referral:
              inviteCode && currentGroup.is_hub
                ? { code: inviteCode, url: location.href }
                : undefined,
          },
          cancelToken.current.token,
        );

        setJoinedUser(result);

        if (hasSignUpConfig) {
          setStep("phone");
        } else {
          handleAfterJoinGroup();
        }
      } catch (error) {
        throw error;
      }
    },
    [
      currentGroup,
      authentication,

      cancelToken,
      hasSignUpConfig,
      dispatchJoinGroup,
      handleAfterJoinGroup,
    ],
  );

  const handleSetUsernameStep = React.useCallback(() => {
    if (step !== "username") {
      setStep("username");
    }
  }, [setStep, step]);

  const stepData = React.useMemo(
    () => ({
      title: <FormattedMessage id="sign_up_form_verify_phone_number_title" />,
      subTitle: (
        <FormattedMessage
          id={
            currentGroup?.event_noti_config?.phoneAuthentication?.kakaoTalk
              ?.active
              ? "sign_up_form_verify_phone_number_description_kakao"
              : "sign_up_form_verify_phone_number_description"
          }
        />
      ),
      buttonText: <FormattedMessage id="set_your_name/button_set" />,
    }),
    [currentGroup],
  );

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loader />
      </LoadingWrapper>
    );
  }

  switch (step) {
    case "main":
      return (
        <Main
          onClickSetUsername={handleSetUsernameStep}
          onNext={handleNextButtonClick}
        />
      );
    case "username":
      return <Username group={currentGroup} onNext={handleNextButtonClick} />;

    case "phone":
      return (
        <Phone
          stepData={stepData}
          onNext={handleAfterJoinGroup}
          defaultPhone={joinedUser?.phoneNumber}
        />
      );
    default:
      return null;
  }
};

export default React.memo(CurrentJoinDialogComponent);
