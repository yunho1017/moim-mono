import React from "react";
import moment from "moment-timezone";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
// components
import { DefaultLoader as Loader } from "common/components/loading";
import Username from "../../component/username";
import Phone from "../../component/phone";

import { LoadingWrapper } from "../../styled";

import { useStoreState, useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import { useSnackbar } from "common/components/alertTemplates/alerts/globalSnackbar/useGlobalSnackbar";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";

import { ActionCreators as GroupActionCreators } from "app/actions/group";
import { postUser } from "app/actions/user";
import getUserLocale from "common/helpers/getUserLocale";
import { getHasSignUpConfig } from "../../helpers";
import * as CookieHandler from "common/helpers/cookieHandler";

import { GROUP_INVITE_CODE } from "common/constants/keys";

interface IProps {
  authentication: Moim.IAuthentication | null;
  step: Moim.Group.JoinGroupDialogStepType | undefined;
  setStep(step: Moim.Group.JoinGroupDialogStepType | undefined): void;
}

const ParentJoinDialogComponent: React.FC<IProps> = ({
  authentication,
  step,
  setStep,
}: IProps) => {
  const parentGroup = useCurrentHubGroup();
  const hasRequiredSignUpConfig = getHasSignUpConfig(parentGroup);
  const { isLoading } = useStoreState(state => ({
    isLoading:
      state.joinGroupDialog.isLoading ||
      state.joinGroupDialog.isGetParentMoimUserLoading,
  }));
  const { dispatchOpenDialog, dispatchJoinGroup } = useActions({
    dispatchOpenDialog: GroupActionCreators.openJoinGroupDialog,
    dispatchJoinGroup: postUser,
  });

  const intl = useIntl();
  const cancelToken = useCancelToken();
  const { open: openSnackbar } = useSnackbar({
    text: intl.formatMessage(
      { id: "join_moim_welcome_toast_message" },
      { moim_name: parentGroup?.name },
    ),
  });
  const [joinedUser, setJoinedUser] = React.useState<
    Moim.User.IOriginalUserDatum | undefined
  >();

  const handleAfterJoinGroup = React.useCallback(() => {
    openSnackbar();
    dispatchOpenDialog("current");
  }, [dispatchOpenDialog, openSnackbar]);

  const handleNextButtonClick = React.useCallback(
    async (
      user: Partial<PickValue<Moim.User.IPostUserRequestBody, "user">>,
    ) => {
      const username = user.name;
      if (!parentGroup || !authentication || !username) {
        return;
      }

      try {
        const inviteCode = CookieHandler.get(GROUP_INVITE_CODE(parentGroup.id));
        const result = await dispatchJoinGroup(
          {
            groupId: parentGroup.id,
            user: {
              name: username,
              tz: moment.tz.guess(),
              locale: getUserLocale(),
              authentication: { ...authentication, provider: "cryptobadge" },
              ...user,
            },
            referral: inviteCode
              ? { code: inviteCode, url: location.href }
              : undefined,
          },
          cancelToken.current.token,
        );

        setJoinedUser(result);
        if (hasRequiredSignUpConfig) {
          setStep("phone");
        } else {
          handleAfterJoinGroup();
        }
      } catch (error) {
        throw error;
      }
    },
    [
      parentGroup,
      authentication,
      dispatchJoinGroup,
      cancelToken,
      hasRequiredSignUpConfig,
      handleAfterJoinGroup,
    ],
  );

  const stepData = React.useMemo(
    () => ({
      title: <FormattedMessage id="sign_up_form_verify_phone_number_title" />,
      subTitle: (
        <FormattedMessage
          id={
            parentGroup?.event_noti_config?.phoneAuthentication?.kakaoTalk
              ?.active
              ? "sign_up_form_verify_phone_number_description_kakao"
              : "sign_up_form_verify_phone_number_description"
          }
        />
      ),
      buttonText: <FormattedMessage id="set_your_name/button_set" />,
    }),
    [parentGroup],
  );

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loader />
      </LoadingWrapper>
    );
  }

  switch (step) {
    case "username":
      return (
        <Username
          group={parentGroup as Moim.Group.INormalizedGroup}
          onNext={handleNextButtonClick}
        />
      );

    case "phone":
      return (
        <Phone
          stepData={stepData}
          onNext={handleAfterJoinGroup}
          groupId={parentGroup?.id}
          defaultPhone={joinedUser?.phoneNumber}
        />
      );
    default:
      return null;
  }
};

export default React.memo(ParentJoinDialogComponent);
