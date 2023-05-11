import * as React from "react";
import { ToolBarContainer } from "./styled";

interface IProps {
  emojiMenuRef: React.RefObject<HTMLButtonElement>;
  onClickFileUpload(): void;
}

const Toolbar = ({ onClickFileUpload, emojiMenuRef: emojiRef }: IProps) => {
  return (
    <ToolBarContainer>
      <button className="ql-file" onClick={onClickFileUpload}>
        File Upload
      </button>
      <button className="ql-bold">B</button>
      <button className="ql-italic">I</button>
      <button className="ql-link">Li</button>
      <button className="ql-mention">Me</button>
      <button ref={emojiRef} className="ql-addEmoji">
        Em
      </button>
    </ToolBarContainer>
  );
};

export default Toolbar;
