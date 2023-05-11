import * as React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { AlertBadge } from "common/components/alertBadge";
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

export const CountBadge = styled(AlertBadge)`
  width: ${px2rem(18)};
  border: 1px solid ${props => props.theme.colorV2.colorSet.grey300};
  color: ${props => props.theme.colorV2.colorSet.grey600};
  user-select: none;
  margin-left: ${px2rem(4)};
  margin-top: -${px2rem(4)};
`;

const TagSetChip = React.forwardRef<IRefHandler, IProps>(
  ({ size, label, selected, onClick }, ref) => {
    const { selectedTagsCount } = label;
    const refThis = React.useRef<IRefChipHandler>(null);

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        onClick?.(label, e);
      },
      [label, onClick],
    );

    const handleGetLeftOffset = React.useCallback(
      () => refThis.current?.self.current?.offsetLeft || 0,
      [refThis],
    );

    React.useImperativeHandle(ref, () => ({
      getLeftOffset: handleGetLeftOffset,
    }));

    const overrideStyle = React.useMemo(
      () => css`
        height: ${px2rem(27)};
        max-width: 100%;
        padding-top: ${px2rem(4)};

        &[data-selected="true"] {
          color: ${props => props.theme.colorV2.colorSet.grey800};
          background-color: ${props => props.theme.colorV2.colorSet.grey50};
        }
        &[data-selected="false"] {
          color: ${props => props.theme.colorV2.colorSet.grey600};
        }

        @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
          &:hover {
            opacity: 0.6;
            background-color: ${props => props.theme.colorV2.colorSet.grey50};
          }
        }

        & + & {
          margin-left: ${px2rem(6)};
        }
      `,
      [],
    );

    return (
      <ChipBase
        ref={refThis}
        shape="rectangle"
        size={size}
        selected={selected}
        overrideStyle={overrideStyle}
        onClick={handleClick}
      >
        <LabelContent>
          <NativeEmojiSafeText value={label.text} />
        </LabelContent>
        {selectedTagsCount ? (
          <CountBadge>{selectedTagsCount}</CountBadge>
        ) : null}
      </ChipBase>
    );
  },
);
export default TagSetChip;
