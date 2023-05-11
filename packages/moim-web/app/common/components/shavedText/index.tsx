import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import { FlattenInterpolation } from "styled-components";
import shave from "shave";
import { isBrowser } from "common/helpers/envChecker";
import {
  WebkitShavedText,
  SingleShavedText,
  ShavedTextWrapper,
} from "./styled";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  shaveHeight?: number;
  line?: number;
  ellipsisText?: string;
  endFix?: React.ReactNode;
  endFixPreWrapMargin?: number;
  forceShaveByLibrary?: boolean;
  wrapperStyle?: FlattenInterpolation<any>;
  onShaved?(flag: boolean): void;
}

interface IState {
  shaved: boolean;
  visibleEndFix: boolean;
  shavedByLibrary: boolean;
  lineClamp: number;
  component: string | React.ComponentType;
}
const SPACES_REGEXP = /\s/;
const isWebkitBrowser = isBrowser() && "webkitCancelAnimationFrame" in document;

class ShavedText extends React.PureComponent<IProps, IState> {
  public state = {
    shaved: false,
    visibleEndFix: false,
    lineClamp: 0,
    shavedByLibrary: false,
    component: ShavedTextWrapper,
  };
  private readonly textElement: React.RefObject<
    HTMLSpanElement
  > = React.createRef();
  private textElementOffsetHeight = 0;

  public componentDidMount() {
    this.updateShaveText();
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.textElement.current) {
      requestAnimationFrame(() => {
        this.textElementOffsetHeight =
          this.textElement.current?.offsetHeight ?? 0;
      });
    }

    const isDiffText =
      typeof this.props.value === "string" &&
      prevProps.value &&
      prevProps.value !== this.props.value;
    if (
      isDiffText ||
      prevProps.shaveHeight !== this.props.shaveHeight ||
      prevProps.line !== this.props.line
    ) {
      this.updateShaveText();
    }

    this.onShaved();
  }

  public render() {
    const {
      value,
      shaveHeight,
      ellipsisText: _var2,
      endFixPreWrapMargin: _var3,
      endFix,
      wrapperStyle,
      ...props
    } = this.props;
    const { component, visibleEndFix } = this.state;

    return React.createElement(
      component,
      {
        ...props,
        line: this.state.lineClamp as any,
        overrideStyle: wrapperStyle,
      },
      <ReactResizeDetector
        handleWidth={true}
        handleHeight={true}
        onResize={this.updateShaveText}
        refreshMode="debounce"
        refreshRate={500}
      >
        {!visibleEndFix && endFix ? this.renderEndFixPreWrap() : null}
        <span
          ref={this.textElement}
          style={{ verticalAlign: "top", wordBreak: "break-all" }}
        >
          {value}
        </span>
        {visibleEndFix && endFix ? endFix : null}
      </ReactResizeDetector>,
    );
  }

  private readonly onShaved = () => {
    let flag = false;
    if (!this.state.shavedByLibrary) {
      flag = false;
    }
    const textElement = this.textElement.current;
    if (textElement) {
      flag = textElement.firstElementChild?.classList[0] === "js-shave-char";
    }

    this.setState({
      shaved: flag,
    });
    this.props.onShaved?.(flag);
  };

  private readonly shaveTextFromLibrary = () => {
    const textElement = this.textElement.current;
    if (!textElement) {
      return;
    }

    this.setState({
      visibleEndFix: false,
      shavedByLibrary: true,
    });

    const { shaveHeight, line = 1, ellipsisText } = this.props;
    requestAnimationFrame(() => {
      const text = textElement.textContent ?? "";
      const offsetHeight = this.textElementOffsetHeight;
      const spaces = !SPACES_REGEXP.test(text.trim());
      const shaveHeightCalc =
        shaveHeight || Math.round(this.getTextElementLineHeight()) * line;
      const adjustmentShaveHeight = shaveHeightCalc + 2;
      shave(textElement, adjustmentShaveHeight, {
        character: ellipsisText,
        spaces,
      });
      // re-check
      if (offsetHeight > adjustmentShaveHeight) {
        shave(textElement, adjustmentShaveHeight, {
          character: ellipsisText,
          spaces: false,
        });
      }
      if (!this.state.visibleEndFix) {
        this.setState({
          visibleEndFix: true,
        });
      }
    });
  };

  private readonly getTextElementLineHeight = () => {
    if (this.textElement.current) {
      const textElement = this.textElement.current;
      const styles = window.getComputedStyle(textElement);
      let fontSize = parseFloat(styles.lineHeight as string);
      if (isNaN(fontSize)) {
        fontSize = parseFloat(styles.fontSize as string);
        if (isNaN(fontSize)) {
          return 0;
        }
      }
      return fontSize;
    }
    return 0;
  };

  private readonly shaveText = () => {
    requestAnimationFrame(() => {
      if (this.props.endFix || this.props.ellipsisText) {
        this.shaveTextFromLibrary();
      } else if (this.textElement.current) {
        const { shaveHeight, line = 1 } = this.props;
        const lineClamp = shaveHeight
          ? Math.floor(shaveHeight / this.getTextElementLineHeight())
          : line;
        const isMultiLimeClamp = lineClamp > 1;
        if (
          this.props.forceShaveByLibrary ||
          (!isWebkitBrowser && isMultiLimeClamp)
        ) {
          this.shaveTextFromLibrary();
        } else {
          this.setState({
            shavedByLibrary: false,
            lineClamp,
            component: isMultiLimeClamp ? WebkitShavedText : SingleShavedText,
          });
        }
      }
    });
  };

  private readonly updateShaveText = () => {
    if (isBrowser() && !this.state.shaved) {
      this.shaveText();
    }
  };

  private readonly renderEndFixPreWrap = () => {
    const styles = {
      marginRight: this.props.endFixPreWrapMargin
        ? this.props.endFixPreWrapMargin
        : 15,
    };
    return <span style={styles}>{this.props.endFix}</span>;
  };
}

export default React.memo(ShavedText);
