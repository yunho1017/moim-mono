import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  FlatButton,
  TextGeneralButton,
} from "common/components/designSystem/buttons";

export const Container = styled.div``;

export const MoimInfoWrapper = styled.div``;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: ${px2rem(24)} 0 ${px2rem(8)};
`;

const ButtonStyle = css`
  display: block;
  width: 100%;
`;

export const StartWithUsernameButton = styled(FlatButton)`
  ${ButtonStyle};
`;

export const StartWithNewProfileButton = styled(TextGeneralButton)`
  margin: ${px2rem(8)} 0;
`;
