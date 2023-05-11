import * as React from "react";

// components
import ToolButton from "./toolButton";
import {
  IconButton,
  ToolbarContainer,
  ToolbarWrapper,
  ToolbarRight,
  ToolbarLeft,
} from "./styled";
import GroupInputContext from "../../context";
import GroupInputTypes from "../../type";

interface IProps {
  id: Moim.Id;
  showTextStyle: boolean;
  onClickShowTextStyleButton(): void;
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
      onClick={value.onClick}
      ref={value.ref}
      disabled={value.disabled}
    >
      <ToolButton type={key} touch={30} isActive={Boolean(value.isActive)} />
    </IconButton>
  );
}
export default function DesktopToolbar({
  id,
  showTextStyle,
  onClickShowTextStyleButton,
}: IProps) {
  const { tools } = React.useContext(GroupInputContext);
  return (
    <ToolbarContainer>
      <ToolbarWrapper
        key={`${id}_toolbar`}
        id={`${id}_toolbar`}
        showTextStyle={showTextStyle}
      >
        <ToolbarLeft>
          {renderToolButton("bold", tools.bold)}
          {renderToolButton("italic", tools.italic)}
        </ToolbarLeft>
        <ToolbarRight>
          {renderToolButton("textStyle", {
            visible: true,
            isActive: showTextStyle,
            onClick: onClickShowTextStyleButton,
          })}
          {renderToolButton("meeting", tools.meeting)}
          {renderToolButton("link", tools.link)}
          {renderToolButton("mention", tools.mention)}
          {renderToolButton("image", tools.image)}
          {renderToolButton("file", tools.file)}
          {renderToolButton("emoji", tools.emoji)}
          {renderToolButton("send", tools.send)}
        </ToolbarRight>
      </ToolbarWrapper>
    </ToolbarContainer>
  );
}
