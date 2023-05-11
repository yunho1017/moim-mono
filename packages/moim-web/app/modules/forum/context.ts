import React, { createContext } from "react";

interface IForumContext {
  refBody?: React.RefObject<HTMLDivElement>;
  showType?: Moim.Enums.PostShowType;
}

// Note: post 필드는 무조건 있음
const initialValue: IForumContext = {};

const ForumContext = createContext<IForumContext>(initialValue);

export { ForumContext };
