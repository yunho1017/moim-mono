import * as React from "react";
import styled, { css } from "styled-components";
import DeleteButtonIcon from "@icon/18-remove-dark.svg";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import UserProfileImage from "common/components/userProfileImage";
import ChipBase, {
  IRefHandler as IRefChipHandler,
} from "common/components/chips";
import { px2rem } from "common/helpers/rem";
import { B1RegularStyle } from "common/components/designSystem/typos";

const LeftContainer = styled.div`
  margin-right: ${px2rem(4)};
`;

const ShaveTextWrapperStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  > span {
    display: inline-flex;
    align-items: center;
  }
`;

const DeleteIconWrapper = styled.span`
  margin-left: ${px2rem(4)};
`;

interface IProps {
  name: string;
  showAvatar?: boolean;
  avatarUrl?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDeleteClick?(): void;
}

const SelectValueOptionChip = React.forwardRef<IRefChipHandler, IProps>(
  ({ name, showAvatar, avatarUrl, onClick, onDeleteClick }, ref) => {
    const refThis = React.useRef<IRefChipHandler>(null);

    React.useImperativeHandle<IRefChipHandler | null, IRefChipHandler | null>(
      ref,
      () => refThis.current,
    );
    const handleDeleteClick = React.useCallback(() => {
      onDeleteClick?.();
    }, [onDeleteClick]);

    const overrideStyle = React.useMemo(
      () => css`
        min-width: 0;
        padding: ${px2rem(1)} ${px2rem(4)};
        background-color: ${props => props.theme.colorV2.colorSet.grey50};
        ${B1RegularStyle};
      `,
      [],
    );

    const leftElement = React.useMemo(
      () =>
        showAvatar ? (
          <LeftContainer>
            <UserProfileImage
              src={avatarUrl}
              size="xs"
              canOpenProfileDialog={false}
            />
          </LeftContainer>
        ) : null,
      [avatarUrl, showAvatar],
    );

    return (
      <ChipBase
        ref={refThis}
        shape="rectangle"
        size="small"
        overrideStyle={overrideStyle}
        onClick={onClick}
      >
        {leftElement}
        <ShavedText
          value={<NativeEmojiSafeText value={name} />}
          endFix={
            <DeleteIconWrapper>
              <DeleteButtonIcon
                size="xs"
                role="button"
                onClick={handleDeleteClick}
              />
            </DeleteIconWrapper>
          }
          endFixPreWrapMargin={4}
          wrapperStyle={ShaveTextWrapperStyle}
        />
      </ChipBase>
    );
  },
);
export default SelectValueOptionChip;
