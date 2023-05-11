import styled from "styled-components";
import DeletedIconResource from "@icon/24-delete-g";
import { B4RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${px2rem(16)};
`;

export const Avatar = styled.div`
  width: ${px2rem(36)};
  height: ${px2rem(36)};
  border: 50%;
  background-color: ${props => props.theme.colorV2.colorSet.grey300};
`;
export const DeletedIcon = styled(DeletedIconResource).attrs({
  size: "s",
  touch: 36,
  role: "button",
})``;

export const Message = styled.div`
  margin-left: ${px2rem(8)};
  color: ${props => props.theme.colorV2.colorSet.grey300};

  span {
    ${B4RegularStyle};
  }
`;
