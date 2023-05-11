import React from "react";
import { useIntlShort } from "common/hooks/useIntlShort";
import { Spacer } from "common/components/designSystem/spacer";
import { B2Regular } from "common/components/designSystem/typos";
import { Container, NoRightIcon, EmptyIcon } from "./styled";

interface IProps {
  textKey: string;
}
function NoRight({ textKey }: IProps) {
  const intl = useIntlShort();
  return (
    <Container>
      <NoRightIcon />
      <Spacer value={8} />
      {intl(textKey)}
      <Spacer value={14} />
    </Container>
  );
}

function Empty({ textKey }: IProps) {
  const intl = useIntlShort();
  return (
    <Container>
      <EmptyIcon />
      <Spacer value={8} />
      <B2Regular>{intl(textKey)}</B2Regular>
      <Spacer value={14} />
    </Container>
  );
}

export const BlockitFeedback = {
  NoRight,
  Empty,
};
