import * as React from "react";
// components
import { FormattedMessage, useIntl } from "react-intl";
import {
  Container,
  MoimInfoWrapper,
  ButtonWrapper,
  StartWithUsernameButton,
  StartWithNewProfileButton,
} from "./styled";
import MoimInfo from "../moimInfo";
// hooks
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useStoreState } from "app/store";
import { useSnackbar } from "common/components/alertTemplates/alerts/globalSnackbar/useGlobalSnackbar";
// helpers
import { errorParseData } from "common/helpers/APIErrorParser";

export interface IProps {
  onClickSetUsername(): void;
  onNext(
    user: Partial<PickValue<Moim.User.IPostUserRequestBody, "user">>,
  ): Promise<void>;
}

export default function Main({ onClickSetUsername, onNext }: IProps) {
  const currentGroup = useCurrentGroup();
  const intl = useIntl();
  const { open: openSnackbar } = useSnackbar({
    text: intl.formatMessage({
      id: currentGroup?.config.useOnlyParentProfile
        ? "child_moim_join_by_only_parent_profile_duplicated_username_error"
        : "child_moim_join_by_parent_profile_duplicated_username_error",
    }),
  });
  const { parentUser } = useStoreState(state => ({
    parentUser: state.app.parentMoimUser,
  }));

  const handleNextButtonClick = React.useCallback(async () => {
    if (!parentUser) {
      return;
    }
    try {
      await onNext(parentUser);
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = errorParseData(error);
        switch (parsedError?.code) {
          case "DUPLICATED_USERNAME_IN_PARENT_GROUP":
          case "DUPLICATED_USERNAME":
            openSnackbar();
            break;
        }
      }
    }
  }, [onNext, openSnackbar, parentUser]);

  return (
    <>
      <Container>
        <MoimInfoWrapper>
          <MoimInfo name={currentGroup?.name} icon={currentGroup?.icon} />
        </MoimInfoWrapper>
        <ButtonWrapper>
          <StartWithUsernameButton onClick={handleNextButtonClick} size="l">
            <FormattedMessage
              id="join_dialog_start_with_username"
              values={{ name: parentUser?.name }}
            />
          </StartWithUsernameButton>
          {!currentGroup?.config.useOnlyParentProfile && (
            <StartWithNewProfileButton size="s" onClick={onClickSetUsername}>
              <FormattedMessage id="join_dialog_start_with_new_profile" />
            </StartWithNewProfileButton>
          )}
        </ButtonWrapper>
      </Container>
    </>
  );
}
