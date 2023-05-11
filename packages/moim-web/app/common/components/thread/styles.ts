import { css } from "styled-components";
import { getFlexAlignStyle } from "./helper";

export const textAlignStyle = css<{
  textAlign?: Moim.Forum.ForumListConfigTextAlignment;
}>`
  display: flex;
  align-items: center;

  ${props => getFlexAlignStyle(props.textAlign)}
`;
