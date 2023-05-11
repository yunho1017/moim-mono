import * as React from "react";
import { FormattedMessage } from "react-intl";
import { AppointButton, Badge, Description, Title, Wrapper } from "./styled";
import { BaseItemCell } from "common/components/itemCell";

interface IProps {
  onClickAppointButton: () => void;
}

function EmptyMembers(props: IProps) {
  const { onClickAppointButton } = props;

  return (
    <Wrapper>
      <Badge>🎖</Badge>

      <BaseItemCell
        size="s"
        title={
          <Title>
            <FormattedMessage id="position_settings/position/list_empty_title" />
          </Title>
        }
      />

      <Description>
        <FormattedMessage id="position_settings/position/list_empty_description" />
      </Description>

      <AppointButton onClick={onClickAppointButton}>
        <FormattedMessage id="position_settings/position/appoint_members" />
      </AppointButton>
    </Wrapper>
  );
}

export default EmptyMembers;
