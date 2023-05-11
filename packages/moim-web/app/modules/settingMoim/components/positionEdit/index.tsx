import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Wrapper, Title, Header, PositionList } from "./styled";
import { TextButton } from "common/components/designSystem/buttons";
import PositionEditItem from "../position/components/positionItem/item/edit";

interface IProps {
  positions: Moim.Position.IPosition[];
  onClickPriorityUp: (positionId: string) => void;
  onClickPriorityDown: (positionId: string) => void;
  onClickDoneButton: () => void;
}

function PositionEdit(props: IProps) {
  const intl = useIntl();
  const {
    positions,
    onClickPriorityUp,
    onClickPriorityDown,
    onClickDoneButton,
  } = props;

  return (
    <Wrapper>
      <Header
        title={
          <Title>
            {intl.formatMessage({ id: "position_settings/edit/title" })}
          </Title>
        }
        rightElement={
          <TextButton size="s" onClick={onClickDoneButton}>
            <FormattedMessage id="done_button" />
          </TextButton>
        }
      />

      <PositionList>
        {positions.map(position => (
          <PositionEditItem
            key={position.id}
            positionId={position.id}
            name={position.name}
            color={position.color}
            onClickUpButton={onClickPriorityUp}
            onClickDownButton={onClickPriorityDown}
          />
        ))}
      </PositionList>
    </Wrapper>
  );
}

export default PositionEdit;
