import * as React from "react";
// hooks
import { useStoreState, useActions } from "app/store";
// action
import { getChannels } from "app/actions/channel";
// components
import { IProps as IRootProps } from "../..";
import { channelWithoutCategorySelector } from "app/selectors/channel";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { AsyncSelectBase, SearchOptions } from "../base";
import { Wrapper, InputContainer, H6, NoSidePaddingStyle } from "../styled";
import {
  SingleValue,
  SimpleOption,
} from "app/common/components/blockitEditorBase/components/blockitRenderer/components/inputs/select/base/styled";

interface IProps extends Omit<IRootProps, "element"> {
  element: Moim.Blockit.IInputChannelSelectBlock;
}

const ChannelSelect: React.FC<IProps> = ({
  name,
  label,
  element,
  wrapperStyle,
  margin,
  onChange,
}) => {
  const { placeholder, required, initialValue } = element;
  const [channelOptionsLoading, setChannelOptionsLoading] = React.useState(
    false,
  );
  const [getChannelCalled, setGetChannelCallStatus] = React.useState(false);
  const { channels, defaultOption } = useStoreState(state => {
    const chs = channelWithoutCategorySelector(state);
    const defaultOpt = initialValue
      ? chs.find(item => item.id === initialValue)
      : undefined;
    return {
      channels: chs,
      defaultOption: defaultOpt
        ? {
            label: defaultOpt.name,
            value: defaultOpt.id,
          }
        : undefined,
    };
  });

  const { dispatchGetChannels } = useActions({
    dispatchGetChannels: getChannels,
  });

  const channelOptions = React.useMemo(
    () => channels?.map(item => ({ label: item.name, value: item.id })),
    [channels],
  );

  const handleChange: Moim.Blockit.IInputBlockChangeEvent = React.useCallback(
    (value, validate, e) => {
      // Note: rewrap for hasError check
      onChange?.(value, validate, e);
    },
    [onChange],
  );

  const handleSearchOptions: SearchOptions = React.useCallback(
    async (newValue, callback) => {
      const response = channels
        ?.filter(item => item.name.includes(newValue))
        .map(item => ({ label: item.name, value: item.id }));
      callback(response);
    },
    [channels],
  );

  React.useEffect(() => {
    if (!channels?.length && !channelOptionsLoading && !getChannelCalled) {
      setChannelOptionsLoading(true);
      setGetChannelCallStatus(true);
      dispatchGetChannels({ limit: 100 }).finally(() => {
        setChannelOptionsLoading(false);
      });
    }
  }, [channels, channelOptionsLoading, getChannelCalled, dispatchGetChannels]);

  return (
    <Wrapper overrideStyle={wrapperStyle} margin={margin}>
      <H6>
        <NativeEmojiSafeText value={label} />
      </H6>
      <InputContainer>
        <AsyncSelectBase
          hasError={false}
          indicator="dropdown"
          required={required}
          id={name}
          name={name}
          placeholder={placeholder}
          defaultOption={defaultOption}
          defaultOptions={channelOptions}
          wrapperStyle={NoSidePaddingStyle}
          optionElement={{
            Option: SimpleOption,
            SingleValue,
          }}
          onChange={handleChange}
          onSearchOptions={handleSearchOptions}
        />
      </InputContainer>
    </Wrapper>
  );
};

export default ChannelSelect;
