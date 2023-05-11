import * as React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { ILabel } from "common/components/horizontalLabelList";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import ChipBase, { ChipSize, IRefHandler as IRefChipHandler } from "../..";

export interface IRefHandler {
  getLeftOffset(): number;
}

interface IProps {
  label: ILabel;
  size: ChipSize;
  expanded?: boolean;
  selected?: boolean;
  onClick?(label: ILabel, e: React.MouseEvent<HTMLElement>): void;
}

const LabelContent = styled.span`
  display: inline-block;
  width: 100%;
  ${useSingleLineStyle};
`;

const MoimChip = React.forwardRef<IRefHandler, IProps>(
  ({ size, label, selected, expanded, onClick }, ref) => {
    const [leftOffset, setLeftOffset] = React.useState(0);
    const refThis = React.useRef<IRefChipHandler>(null);

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        onClick?.(label, e);
      },
      [label, onClick],
    );

    const handleGetLeftOffset = React.useCallback(() => leftOffset, [
      leftOffset,
    ]);

    React.useImperativeHandle(ref, () => ({
      getLeftOffset: handleGetLeftOffset,
    }));

    const overrideStyle = React.useMemo(
      () => css`
        height: fit-content;
        max-width: 100%;

        ${expanded && `margin: 0 0 ${px2rem(12)} ${px2rem(8)};`};

        &[data-selected="true"] {
          color: ${props => props.theme.colorV2.colorSet.white1000};
          background-color: ${props => props.theme.colorV2.colorSet.grey600};
        }
        &[data-selected="false"] {
          color: ${props => props.theme.colorV2.colorSet.grey900};
          background-color: ${props => props.theme.colorV2.colorSet.grey50};
        }

        @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
          &:hover {
            opacity: 0.6;
          }
        }

        & + & {
          margin-left: ${px2rem(8)};
        }
      `,
      [expanded],
    );

    React.useLayoutEffect(() => {
      setLeftOffset(refThis.current?.self.current?.offsetLeft || 0);
    }, []);

    return (
      <ChipBase
        ref={refThis}
        shape="round"
        size={size}
        selected={selected}
        overrideStyle={overrideStyle}
        onClick={handleClick}
      >
        <LabelContent>
          <NativeEmojiSafeText value={label.text} />
        </LabelContent>
      </ChipBase>
    );
  },
);
export default MoimChip;
