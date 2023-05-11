import * as React from "react";
import { SummaryDescription, SummaryTitle, SummaryWrapper } from "./styled";
import { BaseItemCell } from "common/components/itemCell";

interface IProps {
  title: string;
  description: string;
}

function Summary({ title, description }: IProps) {
  return (
    <SummaryWrapper>
      <BaseItemCell
        title={<SummaryTitle>{title}</SummaryTitle>}
        subTitle={<SummaryDescription>{description}</SummaryDescription>}
        size="s"
      />
    </SummaryWrapper>
  );
}

export default Summary;
