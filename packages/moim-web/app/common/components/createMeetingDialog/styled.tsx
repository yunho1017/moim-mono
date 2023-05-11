import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";
import { FlatButton } from "common/components/designSystem/buttons";

export const Inner = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
  padding: 0 ${px2rem(24)} ${px2rem(24)};
`;

export const HeaderWrapperStyle = css`
  padding: 0 ${px2rem(16)};
`;

export const TitleWrapper = styled(H8Bold)`
  margin: ${px2rem(11)} ${px2rem(16)};
`;

export const InputWrapper = styled.div`
  padding: ${px2rem(4)} ${px2rem(16)};
`;

export const ButtonWrapper = styled.div`
  padding: ${px2rem(16)};
`;

export const ErrorText = styled.div`
  color: ${props => props.theme.color.red700};
`;

export const Spacer = styled.div<{ height: number }>`
  width: 100%;
  height: ${props => px2rem(props.height)};
`;

export const CreateButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
`;
