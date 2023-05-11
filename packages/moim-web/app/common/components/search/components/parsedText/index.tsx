import * as React from "react";
import shortid from "shortid";
import RichEditor from "common/components/richEditor";

interface IProps {
  id?: string;
  content: string;
}

const ParsedText: React.FC<IProps> = ({ id, content }) => {
  const contents = React.useMemo(() => [{ type: "text" as const, content }], [
    content,
  ]);

  return (
    <RichEditor id={id ?? shortid()} readonly={true} contents={contents} />
  );
};

export default ParsedText;
