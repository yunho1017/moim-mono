import * as React from "react";

import ActionCount from "common/components/actionCount";
import {
  SmallUp,
  SmallUpSelectedUp,
  MiddleUp,
  MiddleUnSelectedUp,
  LargeUp,
  LargeUnSelectedUp,
  SmallDown,
  SmallDownSelectedDown,
  MiddleDown,
  MiddleUnSelectedDown,
  LargeDown,
  LargeUnSelectedDown,
  Wrapper,
  ButtonWrapper,
  LargeButtonWrapper,
  Count,
  LargeCount,
} from "./styled";

import useHover from "common/hooks/useHover";
import useHooks from "./hooks";

export interface IProps {
  upCount: number;
  downCount: number;
  threadId: Moim.Id;
  channelId?: Moim.Id;
  replyId?: Moim.Id;
  disabled?: boolean;
  status: Moim.Enums.VoteStatus;
  visibleNoneCountFallback?: boolean;
  disableOpenVotedUserList?: boolean;
  handler?: (type: Moim.Enums.VoteStatus) => void;
}

export function SmallUpDown(props: IProps) {
  const {
    upCount,
    downCount,
    disabled,
    isActiveUpButton,
    isActiveDownButton,
    handleUpClick,
    handleDownClick,
    handleUpCountClick,
    handleDownCountClick,
  } = useHooks(props);

  return (
    <Wrapper disabled={disabled}>
      <ButtonWrapper>
        {isActiveUpButton ? (
          <SmallUpSelectedUp disabled={disabled} onClick={handleUpClick} />
        ) : (
          <SmallUp disabled={disabled} onClick={handleUpClick} />
        )}

        {upCount > 0 && (
          <Count isLiked={isActiveUpButton} onClick={handleUpCountClick}>
            <ActionCount value={upCount} defaultValue="0" />
          </Count>
        )}
      </ButtonWrapper>
      <ButtonWrapper>
        {isActiveDownButton ? (
          <SmallDownSelectedDown
            disabled={disabled}
            onClick={handleDownClick}
          />
        ) : (
          <SmallDown disabled={disabled} onClick={handleDownClick} />
        )}
        {downCount > 0 && (
          <Count isLiked={isActiveDownButton} onClick={handleDownCountClick}>
            <ActionCount value={downCount} defaultValue="0" />
          </Count>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
}

export function MiddleUpDown(props: IProps) {
  const {
    upCount,
    downCount,
    disabled,
    isActiveUpButton,
    isActiveDownButton,
    handleUpClick,
    handleDownClick,
    handleUpCountClick,
    handleDownCountClick,
  } = useHooks(props);
  const [upHoverRef, isUpButtonHovered] = useHover<HTMLDivElement>();
  const [downHoverRef, isDownButtonHovered] = useHover<HTMLDivElement>();

  return (
    <Wrapper disabled={disabled}>
      <LargeButtonWrapper key="middle_up" ref={upHoverRef}>
        {!isActiveUpButton ? (
          <MiddleUnSelectedUp
            disabled={disabled}
            isActive={isActiveUpButton}
            isHovered={isUpButtonHovered}
            onClick={handleUpClick}
          />
        ) : (
          <MiddleUp
            disabled={disabled}
            isActive={isActiveUpButton}
            isHovered={isUpButtonHovered}
            onClick={handleUpClick}
          />
        )}

        {upCount > 0 && (
          <Count isLiked={isActiveUpButton} onClick={handleUpCountClick}>
            <ActionCount value={upCount} defaultValue="0" />
          </Count>
        )}
      </LargeButtonWrapper>

      <LargeButtonWrapper key="middle_down" ref={downHoverRef}>
        {!isActiveDownButton ? (
          <MiddleUnSelectedDown
            disabled={disabled}
            isActive={isActiveDownButton}
            isHovered={isDownButtonHovered}
            onClick={handleDownClick}
          />
        ) : (
          <MiddleDown
            disabled={disabled}
            isActive={isActiveDownButton}
            isHovered={isDownButtonHovered}
            onClick={handleDownClick}
          />
        )}
        {downCount > 0 && (
          <Count isLiked={isActiveDownButton} onClick={handleDownCountClick}>
            <ActionCount value={downCount} defaultValue="0" />
          </Count>
        )}
      </LargeButtonWrapper>
    </Wrapper>
  );
}

export function LargeUpDown(props: IProps) {
  const {
    upCount,
    downCount,
    disabled,
    isActiveUpButton,
    isActiveDownButton,
    handleUpClick,
    handleDownClick,
    handleUpCountClick,
    handleDownCountClick,
  } = useHooks(props);
  const [upHoverRef, isUpButtonHovered] = useHover<HTMLDivElement>();
  const [downHoverRef, isDownButtonHovered] = useHover<HTMLDivElement>();
  return (
    <Wrapper disabled={disabled}>
      <LargeButtonWrapper ref={upHoverRef}>
        {!isActiveUpButton ? (
          <LargeUnSelectedUp
            disabled={disabled}
            isActive={isActiveUpButton}
            isHovered={isUpButtonHovered}
            onClick={handleUpClick}
          />
        ) : (
          <LargeUp
            disabled={disabled}
            isActive={isActiveUpButton}
            isHovered={isUpButtonHovered}
            onClick={handleUpClick}
          />
        )}

        {upCount > 0 && (
          <LargeCount isLiked={isActiveUpButton} onClick={handleUpCountClick}>
            <ActionCount value={upCount} defaultValue="0" />
          </LargeCount>
        )}
      </LargeButtonWrapper>
      <LargeButtonWrapper ref={downHoverRef}>
        {!isActiveDownButton ? (
          <LargeUnSelectedDown
            disabled={disabled}
            isActive={isActiveDownButton}
            isHovered={isDownButtonHovered}
            onClick={handleDownClick}
          />
        ) : (
          <LargeDown
            disabled={disabled}
            isActive={isActiveDownButton}
            isHovered={isDownButtonHovered}
            onClick={handleDownClick}
          />
        )}
        {downCount > 0 && (
          <LargeCount
            isLiked={isActiveDownButton}
            onClick={handleDownCountClick}
          >
            <ActionCount value={downCount} defaultValue="0" />
          </LargeCount>
        )}
      </LargeButtonWrapper>
    </Wrapper>
  );
}
