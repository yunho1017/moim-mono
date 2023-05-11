// javascript
import React from "react";
import GroupInput from "./type";

const initialValue: GroupInput.IGroupInputContextValue = {
  tools: {
    bold: { visible: true, className: "ql-bold", onClick: () => {} },
    italic: { visible: true, className: "ql-italic", onClick: () => {} },
    link: { visible: true, className: "ql-add-link", onClick: () => {} },
    meeting: { visible: true, onClick: () => {} },
    emoji: { visible: true, onClick: () => {} },
    file: { visible: true, onClick: () => {} },
    image: { visible: true, onClick: () => {} },
    mention: { visible: true, onClick: () => {} },
    send: { visible: true, onClick: () => {} },
  },
  focusEditor: () => {},
};

const GroupInputContext = React.createContext<
  GroupInput.IGroupInputContextValue
>(initialValue);

export default GroupInputContext;
