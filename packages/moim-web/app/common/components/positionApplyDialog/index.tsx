import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { PositionSelection } from "../designSystem/selection";

import {
  Wrapper,
  Section,
  SectionTitle,
  SectionContent,
  ButtonWrapper,
  ApplyButton,
  ApplicantName,
  PositionColor,
} from "./styled";

import useCurrentUser from "common/hooks/useCurrentUser";
import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";

import { positionsSelector } from "app/selectors/position";
import { appointPosition, getPositions } from "app/actions/position";

import { IOption } from "../designSystem/selection/type";

interface IProps {
  initialPosition?: Moim.Id;
  onApplyButtonClick?(): void;
}

export default function PositionApplyDialog({
  initialPosition,
  onApplyButtonClick,
}: IProps) {
  const intl = useIntl();
  const currentUser = useCurrentUser();
  const cancelToken = useCancelToken();
  const { positions } = useStoreState(state => ({
    positions: positionsSelector(state),
  }));
  const { dispatchApplyPosition, dispatchGetPositions } = useActions({
    dispatchApplyPosition: appointPosition,
    dispatchGetPositions: getPositions,
  });

  const [
    selectedPositionId,
    setSelectedPositionId,
  ] = React.useState<Moim.Id | null>(null);

  const selectedPosition = React.useMemo(
    () => positions.find(position => position.id === selectedPositionId),
    [positions, selectedPositionId],
  );

  const selfApprovablePositions = React.useMemo(
    () =>
      positions.filter(
        position =>
          position.config?.isApplyable &&
          !position.config?.isApprovable &&
          !currentUser?.positions?.find(id => id === position.id),
      ),
    [currentUser, positions],
  );

  const options: IOption[] = React.useMemo(
    () =>
      selfApprovablePositions.map(position => ({
        value: position.id,
        label: position.name,
        chipColor: position.color,
        prefix: {
          touch: 42,
          leftMargin: 7,
          rightMargin: 3,
          element: <PositionColor color={position.color} />,
        },
      })),
    [selfApprovablePositions],
  );

  const handleApplyButtonClick = React.useCallback(() => {
    if (!currentUser || !selectedPosition) {
      return;
    }
    dispatchApplyPosition(
      {
        appoint: { users: [currentUser.id] },
        positionId: selectedPosition.id,
      },
      {
        succeed: intl.formatMessage(
          {
            id: "claim_position/appointment_success_toast_message",
          },
          { position_name: selectedPosition.name },
        ),
        failed: intl.formatMessage({
          id: "claim_position/failure_toast_message",
        }),
      },
      cancelToken.current.token,
    );
    onApplyButtonClick?.();
  }, [
    cancelToken,
    currentUser,
    dispatchApplyPosition,
    intl,
    onApplyButtonClick,
    selectedPosition,
  ]);

  const handleChangePositionSelect = React.useCallback((option: Moim.Id) => {
    setSelectedPositionId(option);
  }, []);

  React.useEffect(() => {
    if (!positions.length) {
      dispatchGetPositions({}, cancelToken.current.token);
    }
  }, []);

  React.useEffect(() => {
    if (initialPosition) {
      setSelectedPositionId(initialPosition);
    }
  }, [initialPosition]);

  if (!currentUser) {
    return null;
  }

  return (
    <Wrapper>
      <Section>
        <SectionTitle>
          <FormattedMessage id="claim_position/applicant" />
        </SectionTitle>
        <SectionContent>
          <ApplicantName>{currentUser.name}</ApplicantName>
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>
          <FormattedMessage id="claim_position/position" />
        </SectionTitle>
        <PositionSelection
          size="l"
          state="normal"
          isMultiple={false}
          selected={selectedPositionId}
          options={options}
          placeholder={intl.formatMessage({
            id: "claim_position/position_placeholder",
          })}
          onChange={handleChangePositionSelect}
        />
      </Section>
      <ButtonWrapper>
        <ApplyButton
          size="l"
          onClick={handleApplyButtonClick}
          disabled={!selectedPositionId}
        >
          <FormattedMessage id="claim_position/request_button" />
        </ApplyButton>
      </ButtonWrapper>
    </Wrapper>
  );
}
