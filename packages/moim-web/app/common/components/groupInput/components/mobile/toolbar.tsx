import * as React from "react";
import cx from "classnames";
// components
import ToolButton from "./toolButton";
import {
  IconButton,
  ToolbarContainer,
  ToolbarRight,
  ToolbarLeft,
  TextStyleTools,
  DownCircleIcon,
} from "./styled";
import GroupInputContext from "../../context";
import GroupInputTypes from "../../type";
import "animate.css";

interface IProps {
  id: Moim.Id;
  isExpand: boolean;
}

function renderToolButton(
  key: GroupInputTypes.ToolButtonType,
  value: GroupInputTypes.IToolButtonValue,
) {
  if (!value.visible) {
    return null;
  }

  return (
    <IconButton
      key={key}
      className={value.className}
      disabled={value.disabled}
      onClick={value.onClick}
      ref={value.ref}
    >
      <ToolButton type={key} touch={30} isActive={Boolean(value.isActive)} />
    </IconButton>
  );
}
// 포커싱 문제 해결되면 이걸로 교체 ..
export function TODO_MobileToolbar({ id, isExpand }: IProps) {
  const { tools, focusEditor } = React.useContext(GroupInputContext);
  const [showTextStyleTool, setShowTextStyleTool] = React.useState(false);
  const toggleShowTextStyleTool = React.useCallback(() => {
    setShowTextStyleTool(status => !status);
    focusEditor();
  }, [focusEditor]);

  const textStyleValue = React.useMemo(
    () => ({
      visible: true,
      isActive: showTextStyleTool,
      onClick: toggleShowTextStyleTool,
    }),
    [showTextStyleTool, toggleShowTextStyleTool],
  );

  return (
    <ToolbarContainer
      key={`${id}_toolbar`}
      id={`${id}_toolbar`}
      isExpand={isExpand}
    >
      {!isExpand && renderToolButton("send", tools.send)}

      <ToolbarLeft showTextStyleTool={showTextStyleTool}>
        {renderToolButton("textStyle", textStyleValue)}
      </ToolbarLeft>
      <ToolbarRight showTextStyleTool={showTextStyleTool}>
        {renderToolButton("meeting", tools.meeting)}
        {renderToolButton("mention", tools.mention)}
        {renderToolButton("file", tools.file)}
        {renderToolButton("image", tools.image)}
        {renderToolButton("emoji", tools.emoji)}
        {renderToolButton("send", tools.send)}
      </ToolbarRight>

      <TextStyleTools
        show={showTextStyleTool}
        className={cx({
          animate__fadeInUp: showTextStyleTool,
          animate__fadeOutDown: !showTextStyleTool,
        })}
      >
        <IconButton onClick={toggleShowTextStyleTool}>
          <DownCircleIcon />
        </IconButton>

        {renderToolButton("bold", tools.bold)}
        {renderToolButton("italic", tools.italic)}
        {renderToolButton("link", tools.link)}
      </TextStyleTools>
    </ToolbarContainer>
  );
}

export default function MobileToolbar({ id, isExpand }: IProps) {
  const { tools } = React.useContext(GroupInputContext);

  return (
    <ToolbarContainer
      key={`${id}_toolbar`}
      id={`${id}_toolbar`}
      isExpand={isExpand}
    >
      {!isExpand && renderToolButton("send", tools.send)}
      <ToolbarLeft>
        {renderToolButton("bold", tools.bold)}
        {renderToolButton("italic", tools.italic)}
      </ToolbarLeft>
      <ToolbarRight>
        {renderToolButton("meeting", tools.meeting)}
        {renderToolButton("link", tools.link)}
        {renderToolButton("mention", tools.mention)}
        {renderToolButton("image", tools.image)}
        {renderToolButton("file", tools.file)}
        {renderToolButton("emoji", tools.emoji)}
        {renderToolButton("send", tools.send)}
      </ToolbarRight>
    </ToolbarContainer>
  );
}
