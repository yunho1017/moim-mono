import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { TextInput, NumberInput } from "./textInput";
import CheckBox from "./checkbox";
import DateTimePicker from "./dateTimePicker";
import StaticSelect from "./select/static";
import UserSelect from "./select/user";
import ChannelSelect from "./select/channel";

export type IProps = Omit<Moim.Blockit.IInputBlock, "type"> & {
  wrapperStyle?: FlattenInterpolation<any>;
};

const Inputs: React.FC<IProps> = props => {
  const { element, ...rest } = props;
  switch (props.element.type) {
    case "number-input": {
      return (
        <NumberInput
          {...rest}
          element={element as Moim.Blockit.IInputNumberBlock}
        />
      );
    }
    case "text-input": {
      return (
        <TextInput
          {...rest}
          element={element as Moim.Blockit.IInputTextBlock}
        />
      );
    }

    case "static-select-input": {
      return (
        <StaticSelect
          {...rest}
          element={element as Moim.Blockit.IInputStaticSelectBlock}
        />
      );
    }

    case "user-select-input": {
      return (
        <UserSelect
          {...rest}
          element={element as Moim.Blockit.IInputUserSelectBlock}
        />
      );
    }

    case "channel-select-input": {
      return (
        <ChannelSelect
          {...rest}
          element={element as Moim.Blockit.IInputChannelSelectBlock}
        />
      );
    }

    case "check-box-input": {
      return (
        <CheckBox
          {...rest}
          element={element as Moim.Blockit.IInputCheckBoxBlock}
        />
      );
    }

    case "date-select-input": {
      return (
        <DateTimePicker
          {...rest}
          element={element as Moim.Blockit.IInputDateSelectBlock}
        />
      );
    }

    default: {
      return null;
    }
  }
};

export default Inputs;
