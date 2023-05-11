import { createContext } from "react";

interface IPostShowContext {
  isModalShow: boolean;
  containerRef: React.RefObject<HTMLDivElement> | null;
  forumShowRef: React.RefObject<HTMLDivElement> | null;
  post: Moim.Forum.IThread;
  showConfig: Omit<Moim.Forum.IForumShowConfig, "show_type">;
  onBack: () => void;
}

export const defaultShowConfig: Omit<
  Moim.Forum.IForumShowConfig,
  "show_type"
> = {
  reaction_type: "up",
  show_author: true,
  author_config: {
    position: "bottom",
  },
  show_comment_area: true,
  show_reaction: true,
  show_comment_reaction: true,
  comment_reaction_type: "up",
  show_bookmark: true,
  show_date: true,
};

// Note: post 필드는 무조건 있음
const initialValue: IPostShowContext = {
  containerRef: null,
  forumShowRef: null,
  isModalShow: false,
  post: {} as Moim.Forum.IThread,
  showConfig: defaultShowConfig,
  onBack: () => {},
};

const PostShowContext = createContext<IPostShowContext>(initialValue);

export { PostShowContext };
