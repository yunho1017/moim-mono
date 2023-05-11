import * as React from "react";

import { IStepProps } from "../interface";

import { FormattedMessage } from "react-intl";
import { Divider, LabelWithRadio } from "common/components/itemCell";
import BaseTemplate, { Description } from "../template";
import { Wrapper, RowWrapper } from "./styled";
import NonClickWrapper from "common/components/nonClickWrapper";

type IProps = IStepProps<Moim.Channel.AccessRight>;

const Accesses: {
  type: Moim.Channel.AccessRight;
  title: React.ReactNode;
  description: React.ReactNode;
}[] = [
  {
    type: "public",
    title: <FormattedMessage id="create_moim/set_private/public" />,
    description: <FormattedMessage id="create_moim/set_private/public_guide" />,
  },
  {
    type: "private",
    title: <FormattedMessage id="create_moim/set_private/private" />,
    description: (
      <FormattedMessage id="create_moim/set_private/private_guide" />
    ),
  },
];

export default function GroupAccess({
  data,
  stepData,
  handleButtonClick,
}: IProps) {
  const handleRadioClick = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value === "public" || value === "private") {
        data.handler(value);
      }
    },
    [data],
  );

  if (!stepData) {
    return null;
  }

  return (
    <BaseTemplate stepData={stepData} onClick={handleButtonClick}>
      <Wrapper>
        {Accesses.map(({ type, title, description }) => (
          <Row
            key={type}
            type={type}
            title={title}
            description={description}
            selectedAccess={data.value}
            onChange={handleRadioClick}
          />
        ))}
      </Wrapper>
    </BaseTemplate>
  );
}

interface IRowProps {
  type: Moim.Channel.AccessRight;
  title: React.ReactNode;
  description: React.ReactNode;
  selectedAccess: Moim.Channel.AccessRight;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function Row({
  type,
  title,
  description,
  selectedAccess,
  onChange,
}: IRowProps) {
  const checked = type === selectedAccess;

  return (
    <NonClickWrapper condition={type === "private"}>
      <RowWrapper selected={checked}>
        <Divider />
        <LabelWithRadio
          title={title}
          value={type}
          onChange={onChange}
          name="access"
          checked={checked}
          tabIndex={-1}
        />
        <Description>{description}</Description>
      </RowWrapper>
    </NonClickWrapper>
  );
}
