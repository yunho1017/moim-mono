import styled from "styled-components";
import { H8Bold } from "common/components/designSystem/typos";
import AddIcon from "@icon/24-add-b.svg";
import EditIcon from "@icon/24-edit-b.svg";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div``;

export const Title = styled(H8Bold)`
  flex: 1;
  margin-left: ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Buttons = styled.div`
  margin-left: auto;
  line-height: 0;

  & > * + * {
    margin-left: ${px2rem(18)};
  }
`;

export const AddButton = styled(AddIcon).attrs({
  size: "s",
  touch: 24,
  role: "button",
})``;

export const EditButton = styled(EditIcon).attrs({
  size: "s",
  touch: 24,
  role: "button",
})``;

export const PositionList = styled.ol`
  padding: ${px2rem(16)} ${px2rem(16)} 0;
`;
