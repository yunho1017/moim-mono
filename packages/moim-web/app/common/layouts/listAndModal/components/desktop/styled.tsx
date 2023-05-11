import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const List = styled.div<{
  disableRightBorder?: boolean;
}>`
  width: 100%;
  height: 100%;
`;
