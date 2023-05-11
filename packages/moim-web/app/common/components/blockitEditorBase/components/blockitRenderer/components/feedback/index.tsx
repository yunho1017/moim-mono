import React from "react";
import { FormattedMessage } from "react-intl";
import { Spacer } from "common/components/designSystem/spacer";
import { B2Regular } from "common/components/designSystem/typos";
import { Container, NoRightIcon, EmptyIcon } from "./styled";

interface IProps {
  textKey: string;
  textKeyValues?: Record<string, string | undefined>;
}
function NoRight({ textKey, textKeyValues }: IProps) {
  return (
    <Container>
      <NoRightIcon />
      <Spacer value={8} />
      <FormattedMessage id={textKey} values={textKeyValues} />
      <Spacer value={14} />
    </Container>
  );
}

function Empty({ textKey, textKeyValues }: IProps) {
  return (
    <Container>
      <EmptyIcon />
      <Spacer value={8} />
      <B2Regular>
        <FormattedMessage id={textKey} values={textKeyValues} />
      </B2Regular>
      <Spacer value={14} />
    </Container>
  );
}

export const BlockitFeedback = {
  NoRight,
  Empty,
};
