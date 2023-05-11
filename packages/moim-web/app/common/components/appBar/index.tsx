import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import { IProps, useProps } from "./useHooks";
import {
  Wrapper,
  StickyWrapper,
  stickyWrapperStyle,
  AppBarWrapper,
  LeftWrapper,
  RightWrapper,
  CenterWrapper,
  TitleContainer,
  MainTitle,
  SubTitle,
  ScrollParallaxWrapper,
  IScrollParallaxContainer,
} from "./styledComponent";
import DisplayController from "../displayControllerAboutScrollDirection";

const AppBar: React.FC<IProps> = props => {
  const {
    refThis,
    refParallax,
    sideElementWidth,
    wrapperStyle,
    wrapperStickyStyle,
    wrapperStickedStyle,
    isParallaxVisible,
    alwaysShowAppBarTitle,
    titleOpacity,
    parallaxOpacity,
    titleElement,
    titleAlignmentState,
    subTitleElement,
    leftButton,
    rightButton,
    enableScrollParallax,
    parallaxWrapperComponent: ParallaxWrapper = ScrollParallaxWrapper,
    useScrollDownHide,
    expendScrollParallaxElement,
    parentWidth,
    handleResize,
    handleResizeSideWidth,
  } = useProps(props);

  const subTitle = React.useMemo(
    () => (subTitleElement ? <SubTitle>{subTitleElement}</SubTitle> : null),
    [subTitleElement],
  );

  const leftElement = React.useMemo(
    () => (
      <LeftWrapper sideElementWidth={sideElementWidth}>
        <ReactResizeDetector
          handleWidth={true}
          onResize={handleResizeSideWidth}
        >
          {leftButton}
        </ReactResizeDetector>
      </LeftWrapper>
    ),
    [leftButton, sideElementWidth, handleResizeSideWidth],
  );

  const rightElement = React.useMemo(
    () => (
      <RightWrapper sideElementWidth={sideElementWidth}>
        <ReactResizeDetector
          handleWidth={true}
          onResize={handleResizeSideWidth}
        >
          {rightButton}
        </ReactResizeDetector>
      </RightWrapper>
    ),
    [rightButton, sideElementWidth, handleResizeSideWidth],
  );

  const parallaxElement = React.useMemo(
    () =>
      enableScrollParallax && expendScrollParallaxElement ? (
        <ParallaxWrapper ref={refParallax} opacity={parallaxOpacity}>
          {expendScrollParallaxElement}
        </ParallaxWrapper>
      ) : null,
    [
      enableScrollParallax,
      expendScrollParallaxElement,
      parallaxOpacity,
      refParallax,
    ],
  );

  const appBarElement = React.useMemo(() => {
    const contents = (
      <AppBarWrapper wrapperStyle={wrapperStyle} fixedWidth={parentWidth}>
        {leftElement}
        <CenterWrapper>
          <TitleContainer
            alignment={titleAlignmentState}
            opacity={alwaysShowAppBarTitle ? 1 : titleOpacity}
          >
            <MainTitle>{titleElement}</MainTitle>
            {subTitle}
          </TitleContainer>
        </CenterWrapper>
        {rightElement}
      </AppBarWrapper>
    );

    if (useScrollDownHide) {
      return (
        <DisplayController<{
          overrideStickyStyle?: FlattenInterpolation<any>;
        }>
          overrideStyle={stickyWrapperStyle}
          overrideStickyStyle={wrapperStickyStyle}
        >
          {contents}
        </DisplayController>
      );
    }

    return (
      <StickyWrapper overrideStickyStyle={wrapperStickyStyle}>
        {contents}
      </StickyWrapper>
    );
  }, [
    alwaysShowAppBarTitle,
    leftElement,
    parentWidth,
    rightElement,
    subTitle,
    titleAlignmentState,
    titleElement,
    titleOpacity,
    useScrollDownHide,
    wrapperStickyStyle,
    wrapperStyle,
  ]);

  return (
    <ReactResizeDetector
      handleWidth={true}
      refreshMode="debounce"
      onResize={handleResize}
    >
      <Wrapper
        ref={refThis}
        isSticky={enableScrollParallax}
        isParallaxVisible={isParallaxVisible}
        wrapperStickedStyle={wrapperStickedStyle}
      >
        {appBarElement}
        {parallaxElement}
      </Wrapper>
    </ReactResizeDetector>
  );
};

export default AppBar;
export { IScrollParallaxContainer };
