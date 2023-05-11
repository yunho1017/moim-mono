import * as React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import DeleteButtonIcon from "@icon/18-remove-dark.svg";
import ChipBase, { ChipSize, IRefHandler as IRefChipHandler } from "../..";

interface IProps {
  id: Moim.Id;
  size: ChipSize;
  title: string;
  showDeleteButton?: boolean;
  onDeleteClick?(id: Moim.Id): void;
}
const overrideStyle = css`
  margin: 0 0 ${px2rem(8)} ${px2rem(8)};
  color: ${props => props.theme.colorV2.colorSet.grey600};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
`;

const DeleteButtonWrapper = styled.div`
  margin-left: ${px2rem(2)};
  display: flex;
  align-items: center;
`;

const ChannelTag = React.forwardRef<IRefChipHandler, IProps>(
  ({ size, title, id, showDeleteButton, onDeleteClick }, ref) => {
    const refThis = React.useRef<IRefChipHandler>(null);

    const handleDeleteClick = React.useCallback(() => {
      onDeleteClick?.(id);
    }, [id, onDeleteClick]);

    const shavedTextWrapperStyle = React.useMemo(
      () =>
        showDeleteButton
          ? css`
              display: inline-flex;
              align-items: center;
            `
          : undefined,
      [showDeleteButton],
    );

    const deleteButton = React.useMemo(
      () =>
        showDeleteButton ? (
          <DeleteButtonWrapper>
            <DeleteButtonIcon
              size="xs"
              role="button"
              onClick={handleDeleteClick}
            />
          </DeleteButtonWrapper>
        ) : null,
      [handleDeleteClick, showDeleteButton],
    );

    React.useImperativeHandle<IRefChipHandler | null, IRefChipHandler | null>(
      ref,
      () => refThis.current,
    );

    return (
      <ChipBase
        ref={refThis}
        shape="rectangle"
        size={size}
        overrideStyle={overrideStyle}
      >
        <ShavedText
          value={<NativeEmojiSafeText value={title} />}
          endFix={deleteButton}
          wrapperStyle={shavedTextWrapperStyle}
        />
      </ChipBase>
    );
  },
);
export default ChannelTag;
