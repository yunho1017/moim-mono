import * as React from "react";
import { EmptyWrapper, EmptyText } from "./styled";
import { FormattedMessage } from "react-intl";

export default function Empty({ textId }: { textId?: string }) {
  if (!textId) {
    return null;
  }
  return (
    <EmptyWrapper>
      <EmptyText>
        <FormattedMessage id={textId} />
      </EmptyText>
    </EmptyWrapper>
  );
}
