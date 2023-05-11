import * as React from "react";
import * as ReactDOM from "react-dom";
import { FlattenInterpolation } from "styled-components";
import {
  Layer,
  BGWrapper,
  Container,
  RightAction,
} from "common/components/snackbar/styled";
import { TransitionDirection } from "common/components/snackbar/types";

type IProps<T> = {
  isOpen: boolean;
  content: React.ReactNode;
  transitionDirection: TransitionDirection;
  enablePortal?: boolean;
  rightAction?: React.ReactNode;
  bgColor?: string;
  wrapperStyle?: FlattenInterpolation<any>;
  styles?: FlattenInterpolation<T>;
  onClickSnackbar?: () => void;
  onClickRightAction?: () => void;
} & T;

function Snackbar<T>(props: IProps<T>) {
  const {
    isOpen,
    content,
    enablePortal,
    rightAction,
    transitionDirection,
    bgColor,
    wrapperStyle,
    styles,
    onClickSnackbar,
    onClickRightAction,
    ...rest
  } = props;

  const handleClickSnackbar = React.useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(
    event => {
      event.stopPropagation();
      event.preventDefault();
      onClickSnackbar?.();
    },
    [onClickSnackbar],
  );
  const handleClickRightAction = React.useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(() => {
    onClickRightAction?.();
  }, [onClickRightAction]);

  const element = React.useMemo(
    () => (
      <Layer
        isOpen={isOpen}
        transitionDirection={transitionDirection}
        wrapperStyle={wrapperStyle}
      >
        <BGWrapper
          bgColor={bgColor}
          onClick={handleClickSnackbar}
          styles={styles}
          {...rest}
        >
          <Container>{content}</Container>
          {rightAction && (
            <RightAction onClick={handleClickRightAction}>
              {rightAction}
            </RightAction>
          )}
        </BGWrapper>
      </Layer>
    ),
    [
      bgColor,
      content,
      handleClickRightAction,
      handleClickSnackbar,
      isOpen,
      rest,
      rightAction,
      styles,
      transitionDirection,
      wrapperStyle,
    ],
  );

  if (!isOpen) {
    return null;
  }

  if (enablePortal) {
    return ReactDOM.createPortal(element, document.body);
  }

  return element;
}

export default Snackbar;
