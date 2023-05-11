import * as React from "react";
import { Wrapper, Text, LoadIcon } from "./styledComponents";
import { FormattedMessage } from "react-intl";

interface IProps {
  onClick(): void;
}

function UpdateNotificator({ onClick }: IProps) {
  return (
    <Wrapper onClick={onClick}>
      <Text>
        <FormattedMessage id="post_list/list_new_event" />
      </Text>

      <LoadIcon />
    </Wrapper>
  );
}

export default UpdateNotificator;
