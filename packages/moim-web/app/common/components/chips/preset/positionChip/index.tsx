import * as React from "react";
import { rgba } from "polished";
import styled, { css, FlattenInterpolation } from "styled-components";
import DeleteButtonIcon from "@icon/18-remove-dark.svg";
import { px2rem } from "common/helpers/rem";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import ChipBase, { ChipSize, IRefHandler as IRefChipHandler } from "../..";

const Content = styled.div<{
  size: ChipSize;
  maxWidth?: number;
}>`
  ${props => {
    if (props.maxWidth) {
      return `max-width: ${px2rem(props.maxWidth)}`;
    }
    switch (props.size) {
      case "medium": {
        return `max-width: ${px2rem(140)};`;
      }
      case "small": {
        return `max-width: ${px2rem(110)};`;
      }
    }
  }}
`;

const DeleteButtonWrapper = styled.div`
  margin-left: ${px2rem(4)};
  display: flex;
  align-items: center;
`;

interface IProps {
  id: Moim.Id;
  size: ChipSize;
  color: string;
  name: string;
  showDeleteButton?: boolean;
  maxContentWidth?: number;
  // Note 삭제해야됨
  overrideStyle?: FlattenInterpolation<any>;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDeleteClick?(id: Moim.Id): void;
}

const PositionChip = React.forwardRef<IRefChipHandler, IProps>(
  (
    {
      id,
      size,
      color,
      name,
      showDeleteButton,
      maxContentWidth,
      overrideStyle: propsOverrideStyle,
      className,
      onClick,
      onDeleteClick,
    },
    ref,
  ) => {
    const refThis = React.useRef<IRefChipHandler>(null);

    React.useImperativeHandle<IRefChipHandler | null, IRefChipHandler | null>(
      ref,
      () => refThis.current,
    );
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

    const overrideStyle = React.useMemo(
      () => css`
        min-width: 0;
        color: ${color};
        background-color: ${rgba(color, 0.15)};
        ${propsOverrideStyle}
      `,
      [color, propsOverrideStyle],
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

    return (
      <ChipBase
        ref={refThis}
        shape="rectangle"
        size={size}
        overrideStyle={overrideStyle}
        className={className}
        onClick={onClick}
      >
        <Content size={size} maxWidth={maxContentWidth}>
          <ShavedText
            value={<NativeEmojiSafeText value={name} />}
            endFix={deleteButton}
            wrapperStyle={shavedTextWrapperStyle}
          />
        </Content>
      </ChipBase>
    );
  },
);
export default PositionChip;
