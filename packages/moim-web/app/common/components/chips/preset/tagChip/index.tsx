import * as React from "react";
import { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import ShavedText from "common/components/shavedText";
import { MEDIA_QUERY } from "common/constants/responsive";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import ChipBase, { ChipSize, IRefHandler as IRefChipHandler } from "../..";

interface IProps {
  size: ChipSize;
  tagItem: Moim.TagSet.ITagItem;
  expanded?: boolean;
  selected?: boolean;
  readonly?: boolean;
  onClick?(tagItem: Moim.TagSet.ITagItem): void;
}

const TagChip = React.forwardRef<IRefChipHandler, IProps>(
  ({ size, tagItem, selected, expanded, readonly, onClick }, ref) => {
    const refThis = React.useRef<IRefChipHandler>(null);

    const handleClick = React.useCallback(() => {
      if (readonly) return;
      onClick?.(tagItem);
    }, [onClick, readonly, tagItem]);

    React.useImperativeHandle<IRefChipHandler | null, IRefChipHandler | null>(
      ref,
      () => refThis.current,
    );

    const overrideStyle = React.useMemo(
      () => css`
        ${readonly && `pointer-events: none;`};
        ${expanded && `margin: 0 0 ${px2rem(12)} ${px2rem(8)};`};
        &[data-selected="true"] {
          border: 1px solid ${props => props.theme.colorV2.colorSet.grey300};
          color: ${props => props.theme.colorV2.colorSet.grey600};
        }
        &[data-selected="false"] {
          border: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
          color: ${props => props.theme.colorV2.colorSet.grey300};
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
      [expanded, readonly],
    );

    return (
      <ChipBase
        ref={refThis}
        shape="round"
        size={size}
        selected={selected}
        overrideStyle={overrideStyle}
        onClick={handleClick}
      >
        <ShavedText value={<NativeEmojiSafeText value={tagItem.value} />} />
      </ChipBase>
    );
  },
);
export default TagChip;
