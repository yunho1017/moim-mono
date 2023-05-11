import * as React from "react";
import shortid from "shortid";
const grapesJS = require("grapesjs");
require("grapesjs-preset-newsletter");

import { StyleContainer } from "./styled";

interface IProps {
  id?: string;
  width?: number | string;
  height?: number | string;
}

export default class GrapesJSEditor extends React.PureComponent<IProps> {
  public static defaultProps = {
    id: shortid(),
    width: "auto",
    height: "100%",
  };
  private grapesInst: null | any = null;

  public componentDidMount() {
    const { id, width, height } = this.props;
    if (!this.grapesInst) {
      this.grapesInst = grapesJS.init({
        container: `#${id}`,
        plugins: ["gjs-preset-newsletter"],
        pluginsOpts: {
          "gjs-preset-newsletter": {
            // options
          },
        },
        blocks: [],
        blockManager: {},
        storageManager: {},
        styleManager: {},
        width,
        height,
      });
    }
  }

  public componentWillUnmount() {
    if (this.grapesInst) {
      this.grapesInst.destory();
      this.grapesInst = null;
    }
  }

  public render() {
    const { id } = this.props;

    return (
      <StyleContainer>
        <div id={id}></div>
      </StyleContainer>
    );
  }

  public getEditorInst = () => this.grapesInst;
}
