import styled from "styled-components";

export const ShavedTextV2Wrapper = styled.div<{ line: number }>`
  width: fit-content;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${props => props.line};
  line-clamp: ${props => props.line};
  word-break: break-word;
`;
