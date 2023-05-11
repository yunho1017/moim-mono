import * as React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import ChipBase from "common/components/chips";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;

  margin-top: ${px2rem(4)};
  margin-bottom: ${px2rem(9)};
`;

const ChipStyle = css`
  pointer-events: none;
  &[data-selected="true"] {
    border: 1px solid ${props => props.theme.colorV2.colorSet.grey300};
    color: ${props => props.theme.colorV2.colorSet.grey600};
  }
  &[data-selected="false"] {
    border: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
    color: ${props => props.theme.colorV2.colorSet.grey300};
  }

  & + & {
    margin-left: ${px2rem(4)};
  }
`;

const MAX_VISIBLE_CHIPS = 2;

interface IProps {
  chips: string[];
}

const Chips: React.FC<IProps> = ({ chips }) => {
  const remainCount = React.useMemo(() => {
    if (chips.length > MAX_VISIBLE_CHIPS) {
      return (
        <ChipBase
          key={`chips_remain_count`}
          shape="rectangle"
          size="small"
          overrideStyle={ChipStyle}
        >
          +{chips.length - MAX_VISIBLE_CHIPS}
        </ChipBase>
      );
    }
    return null;
  }, [chips.length]);
  const elements = React.useMemo(
    () =>
      chips.slice(0, MAX_VISIBLE_CHIPS).map(chip => (
        <ChipBase
          key={`chips_${chip}`}
          shape="rectangle"
          size="small"
          overrideStyle={ChipStyle}
        >
          <ShavedText value={<NativeEmojiSafeText value={chip} />} line={1} />
        </ChipBase>
      )),
    [chips],
  );
  return (
    <Wrapper>
      {elements}
      {remainCount}
    </Wrapper>
  );
};

export default Chips;
