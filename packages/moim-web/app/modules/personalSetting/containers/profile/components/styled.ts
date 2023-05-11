import styled from "styled-components";
import { B2Regular, H8Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import EditIconBase from "@icon/18-edit-g.svg";

export const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled(H8Bold)`
  width: 100%;
  height: ${px2rem(44)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const InputWrapper = styled.div`
  padding: 0 ${px2rem(16)};
`;

export const ReadonlySingleLineInputWrapper = styled(B2Regular)<{
  isEmpty?: boolean;
}>`
  padding: ${px2rem(10)} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props =>
    props.isEmpty
      ? props.theme.colorV2.colorSet.grey300
      : props.theme.colorV2.colorSet.grey800};
`;
export const ReadonlyMultiLineInputWrapper = styled(B2Regular)<{
  isEmpty?: boolean;
}>`
  padding: ${px2rem(15)} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: pre-line;
  word-break: break-word;
  color: ${props =>
    props.isEmpty
      ? props.theme.colorV2.colorSet.grey300
      : props.theme.colorV2.colorSet.grey800};
`;

export const EditIcon = styled(EditIconBase).attrs(props => ({
  size: "xs",
  touch: 48,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
