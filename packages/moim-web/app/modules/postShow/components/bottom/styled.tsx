import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CommentAreaHiddenWrapper = styled(Wrapper)`
  width: 100%;
  min-height: ${px2rem(30)};
`;

export const GroupInputWrapper = styled.div`
  position: sticky;
  bottom: 0;
  z-index: ${props => props.theme.zIndexes.default + 1};
`;

export const BottomSnackBarWrapper = styled.div`
  width: 100%;
  background-color: transparent;
`;

export const TopSnackBarWrapper = styled.div`
  position: sticky;
  width: 100%;
  top: ${px2rem(42)};
  background-color: transparent;
  z-index: ${props => props.theme.zIndexes.default};
`;
