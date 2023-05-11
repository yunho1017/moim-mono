import * as React from "react";

const { storiesOf } = require("@storybook/react");
import ShavedText from ".";
import { px2rem } from "app/common/helpers/rem";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/ShavedText`, module)
  .add("Custom", () => <MockShavedText />)
  .add("Basic", () => (
    <div style={{ width: px2rem(360), height: px2rem(60) }}>
      <ShavedText
        style={{ fontSize: px2rem(18), lineHeight: px2rem(18) }}
        shaveHeight={36}
        value="가나다라마바사아자차카파타하1가나다라마바사아자차카파타하2가나다라마바사아자차카파타하3"
      />
    </div>
  ))
  .add("with endFix", () => (
    <div style={{ width: px2rem(360), height: px2rem(60) }}>
      <ShavedText
        style={{ fontSize: px2rem(18), lineHeight: px2rem(18) }}
        shaveHeight={36}
        value="가나다라마바사아자차카파타하1가나다라마바사아자차카파타하2가나다라마바사아자차카파타하3"
        endFixPreWrapMargin={8}
        endFix={<span>[Image-icon]</span>}
      />
    </div>
  ));

interface IState {
  text: string;
  enableEndfix: boolean;
}

class MockShavedText extends React.PureComponent<{}, IState> {
  public state: IState = {
    text: "",
    enableEndfix: false,
  };

  public render() {
    return (
      <div>
        <div>
          <textarea onChange={this.handleChange}>{this.state.text}</textarea>
          <input
            type="checkbox"
            onChange={this.handleEnableChange}
            checked={this.state.enableEndfix}
          />
        </div>
        <br />
        Result:
        <div
          style={{
            width: px2rem(360),
            height: px2rem(60),
            border: `${px2rem(1)} solid gray`,
          }}
        >
          <ShavedText
            style={{ fontSize: px2rem(18), lineHeight: px2rem(18) }}
            shaveHeight={36}
            value={this.state.text}
            endFixPreWrapMargin={8}
            endFix={this.state.enableEndfix ? <span>[Image-icon]</span> : null}
          />
        </div>
      </div>
    );
  }

  private readonly handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    this.setState({
      text: e.currentTarget.value,
    });
  };

  private readonly handleEnableChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({
      enableEndfix: e.currentTarget.checked,
    });
  };
}
