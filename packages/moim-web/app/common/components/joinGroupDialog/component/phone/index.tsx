import * as React from "react";
import moment from "moment";
import { FormattedMessage } from "react-intl";

import BaseTemplate from "app/hub/createGroup/components/step/template";
import PhoneNumberInput, {
  IRefHandler as IPhoneRefHandler,
} from "./components/phoneNumberInput";
import VerifyCodeInput from "./components/verifyCodeInput";
import { Wrapper, Title, ErrorMessage } from "./styled";

import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import { updateMyProfile } from "app/actions/me";

interface IProps {
  stepData: Moim.Group.ICreateMoimStepData;
  defaultPhone?: Moim.User.IUserPhone;
  groupId?: string;
  onNext(): void;
}

export default function Phone({
  stepData,
  onNext,
  groupId,
  defaultPhone,
}: IProps) {
  const { isUpdateProfileLoading } = useStoreState(state => ({
    isUpdateProfileLoading: state.profileEditorPage.isUpdateLoading,
  }));
  const { dispatchUpdateProfile } = useActions({
    dispatchUpdateProfile: updateMyProfile,
  });
  const cancelToken = useCancelToken();
  const refPhoneInput = React.useRef<IPhoneRefHandler>(null);
  const [phoneValidationSucceed, setPhoneValidationSucceed] = React.useState(
    false,
  );
  const [verifyError, setVerifyError] = React.useState<
    Moim.IErrorResponse | undefined
  >(undefined);
  const [updateProfileError, setUpdateProfileError] = React.useState<
    Moim.IErrorResponse | undefined
  >(undefined);
  const [verifyInputShowStatus, setVerifyInputShowStatus] = React.useState(
    false,
  );
  const [verifyEndTime, setVerifyEndTime] = React.useState<
    number | undefined
  >();

  const resetVerifyTimer = React.useCallback(() => {
    setVerifyEndTime(
      moment()
        .add(3, "minutes")
        .valueOf(),
    );
    setVerifyError(undefined);
  }, []);
  const handleVerifyTimeout = React.useCallback(() => {
    setVerifyEndTime(undefined);
  }, []);

  const showVerifyInput = React.useCallback(() => {
    setVerifyInputShowStatus(true);
  }, []);

  const handleClickDoneButton = React.useCallback(async () => {
    const phoneNumber = refPhoneInput.current?.getPhoneNumber();
    const { success, error } = await dispatchUpdateProfile(
      { signUpInfo: { phoneNumber } },
      cancelToken.current.token,
      groupId,
    );
    if (success) {
      onNext();
    } else {
      setUpdateProfileError(error);
    }
  }, [groupId, cancelToken, dispatchUpdateProfile, onNext]);

  return (
    <BaseTemplate
      stepData={stepData}
      onClick={handleClickDoneButton}
      waitingButton={isUpdateProfileLoading}
      disabledButton={!phoneValidationSucceed}
    >
      <Wrapper>
        <Title>
          <FormattedMessage id="mobile_phone_number_verification/title" />
        </Title>
        <PhoneNumberInput
          ref={refPhoneInput}
          defaultPhone={defaultPhone}
          phoneValidationSucceed={phoneValidationSucceed}
          groupId={groupId}
          showVerifyInput={showVerifyInput}
          resetVerifyTimer={resetVerifyTimer}
        />
        {verifyInputShowStatus && (
          <VerifyCodeInput
            verifyEndTime={verifyEndTime}
            phoneValidationSucceed={phoneValidationSucceed}
            setPhoneValidationSucceed={setPhoneValidationSucceed}
            error={verifyError}
            setError={setVerifyError}
            onVerifyTimeout={handleVerifyTimeout}
          />
        )}
        {updateProfileError && (
          <ErrorMessage>{updateProfileError.message}</ErrorMessage>
        )}
      </Wrapper>
    </BaseTemplate>
  );
}
