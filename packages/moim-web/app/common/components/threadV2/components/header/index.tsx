import * as React from "react";

import ShavedText from "common/components/shavedText";
import CreateDayOMeter from "common/components/createDayOMeter";
import { Wrapper, Title, CreatedAt } from "./styled";

interface IProps {
  userId: Moim.Id;
  title?: React.ReactNode;
  createdAt?: number;
  reverse?: boolean;
  isAnonymous?: boolean;
}

export default function Header({
  title,
  createdAt,
  reverse,
  isAnonymous,
}: IProps) {
  const visibleTitle = !reverse && title;

  return (
    <Wrapper reverse={reverse}>
      {visibleTitle && (
        <Title role={!isAnonymous ? "button" : undefined}>{title}</Title>
      )}
      {createdAt && (
        <CreatedAt>
          <ShavedText
            value={<CreateDayOMeter givenDate={createdAt} />}
            line={1}
          />
        </CreatedAt>
      )}
    </Wrapper>
  );
}
