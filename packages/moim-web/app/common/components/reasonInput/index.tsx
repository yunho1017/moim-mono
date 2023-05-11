import * as React from "react";
import styled, { FlattenInterpolation } from "styled-components";
import TextInputWithSuffix, {
  IProps as TextInputWithSuffixProps,
} from "common/components/textInputWithSuffix";
import { B4Regular, Label } from "common/components/designSystem/typos";
import AutoHeightInput from "common/components/autoHeightInput";

export type IReasonType = "normal" | "error" | "success";

interface IReasonBoxProps {
  reasonType: "normal" | "error" | "success";
  reasonBoxOverrideStyle?: FlattenInterpolation<any>;
}

const FullWidthWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colorV2.colorSet.grey300};

  &:focus-within {
    ${Label} {
      color: ${props => props.theme.colorV2.accent};
    }
  }
`;

export const ReasonBox = styled(B4Regular)<IReasonBoxProps>`
  color: ${props => {
    switch (props.reasonType) {
      case "normal":
        return props.theme.colorV2.colorSet.grey300;
      case "success":
        return props.theme.colorV2.accent;
      case "error":
        return props.theme.color.red700;
    }
  }};
  ${props => props.reasonBoxOverrideStyle};
`;

interface IReasonInputProps extends TextInputWithSuffixProps, IReasonBoxProps {
  reasonMessage: React.ReactNode;
  label?: string;
}

export const ReasonInput = ({
  reasonMessage,
  reasonType,
  label,
  reasonBoxOverrideStyle,
  ...rest
}: IReasonInputProps) => (
  <FullWidthWrapper>
    {label && <Label>{label}</Label>}
    <TextInputWithSuffix {...rest} />
    <ReasonBox
      reasonType={reasonType}
      reasonBoxOverrideStyle={reasonBoxOverrideStyle}
    >
      {reasonMessage}
    </ReasonBox>
  </FullWidthWrapper>
);

interface IReasonTextAreaProps
  extends React.ComponentProps<typeof AutoHeightInput>,
    IReasonBoxProps {
  reasonMessage: React.ReactNode;
  label?: string;
}

export const ReasonTextArea = ({
  reasonMessage,
  reasonType,
  label,
  reasonBoxOverrideStyle,
  ...rest
}: IReasonTextAreaProps) => (
  <FullWidthWrapper>
    {label && <Label>{label}</Label>}
    <AutoHeightInput {...rest} />
    <ReasonBox
      reasonType={reasonType}
      reasonBoxOverrideStyle={reasonBoxOverrideStyle}
    >
      {reasonMessage}
    </ReasonBox>
  </FullWidthWrapper>
);
