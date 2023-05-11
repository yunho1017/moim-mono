import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { FlatButton } from "common/components/designSystem/buttons";

export const MintButton = styled(FlatButton).attrs({ size: "s" })<{
  disabled?: boolean;
}>`
  width: 100%;
  margin-top: ${px2rem(8)};
`;
