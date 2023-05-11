import styled from "styled-components";
import EditIconBase from "@icon/24-edit-g.svg";
import AppointMemberIconBase from "@icon/18-appointmember-g.svg";
import DismissMemberIconBase from "@icon/18-dismissmember-g.svg";
import TrashIconBase from "@icon/18-trash-g.svg";
import { B1Regular } from "common/components/designSystem/typos";

export const Wrapper = styled.div``;

export const EditIcon = styled(EditIconBase).attrs({ size: "s", touch: 18 })``;

export const AppointMemberIcon = styled(AppointMemberIconBase).attrs({
  size: "s",
  touch: 18,
})``;

export const DismissMemberIcon = styled(DismissMemberIconBase).attrs({
  size: "s",
  touch: 18,
})``;

export const TrashIcon = styled(TrashIconBase).attrs({
  size: "s",
  touch: 18,
})``;

export const ButtonText = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;
