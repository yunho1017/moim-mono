import styled, { css } from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import { DefaultDivider } from "common/components/divider";
import { H10BoldStyle } from "common/components/designSystem/typos";
import {
  GhostGeneralButton,
  FlatButton,
} from "common/components/designSystem/buttons";

export const Wrapper = styled.div`
  padding: 0 ${px2rem(24)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0;
  }
`;

export const Row = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;

  & + & {
    margin: ${px2rem(4)} 0;
  }
`;

export const Field = styled.div`
  padding-top: ${px2rem(8)};
  padding-left: ${px2rem(16)};
  width: ${px2rem(78)};
  white-space: pre-wrap;
  align-self: flex-start;
  color: ${props => props.theme.colorV2.colorSet.grey600};
  ${H10BoldStyle}
`;

export const Content = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;

  padding: 0 ${px2rem(16)};
`;

export const Divider = styled(DefaultDivider)`
  margin: ${px2rem(8)} 0;
`;

export const SelectionOverrideStyle = css`
  padding: 0;
  height: ${px2rem(42)};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding: ${px2rem(16)};
`;

export const CancelButton = styled(GhostGeneralButton).attrs({ size: "l" })`
  flex: 1;
  min-width: 0;
`;

export const SubmitButton = styled(FlatButton).attrs({ size: "l" })`
  flex: 1;
  min-width: 0;
  margin-left: ${px2rem(11)};
`;
