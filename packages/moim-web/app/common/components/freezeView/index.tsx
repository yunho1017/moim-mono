import * as React from "react";
import Freeze from "app/common/helpers/freeze";
import { isBrowser } from "app/common/helpers/envChecker";

/*
 * Have bug to cast HTMLElement => HTMLDivElement (missing align attribute)
 * So, it's temporary type to cast HTMLElement...
 */
type ChildrenCallbackWithRef = (refCallback: React.Ref<any>) => React.ReactNode;

interface IProps {
  isFreeze?: boolean;
  delayedFreeze?: number;
  children: React.ReactNode | ChildrenCallbackWithRef;
}

class FreezeView extends React.Component<IProps> {
  public static defaultProps: Pick<IProps, "isFreeze"> = {
    isFreeze: true,
  };

  private readonly freezer: Freeze = new Freeze();

  public componentDidMount() {
    if (this.props.isFreeze) {
      this.freeze(true);
    }
  }

  public componentDidUpdate(prevProps: IProps) {
    if (Boolean(prevProps.isFreeze) !== Boolean(this.props.isFreeze)) {
      if (this.props.isFreeze) {
        this.freeze(true);
      } else {
        this.freeze(false);
      }
    }
  }

  public componentWillUnmount() {
    requestAnimationFrame(() => {
      this.freeze(false);
    });
  }

  public render() {
    return typeof this.props.children === "function"
      ? (this.props.children as ChildrenCallbackWithRef)(
          this.setScrollLockScrollable,
        )
      : React.cloneElement(
          React.Children.only(this.props.children) as React.ReactElement,
          { ref: this.setScrollLockScrollable },
        ) || null;
  }

  private readonly setScrollLockScrollable = (el: HTMLElement | null) => {
    if (isBrowser() && el && el.nodeType && el.nodeType === 1) {
      el.setAttribute("data-scroll-lock-scrollable", "");
    }
  };

  private freeze(turnOn: boolean) {
    const handler = () => {
      if (turnOn) {
        this.freezer.on();
      } else {
        this.freezer.off();
      }
    };

    if (this.props.delayedFreeze) {
      setTimeout(() => {
        handler();
      }, this.props.delayedFreeze);
    } else {
      handler();
    }
  }
}

export default FreezeView;
