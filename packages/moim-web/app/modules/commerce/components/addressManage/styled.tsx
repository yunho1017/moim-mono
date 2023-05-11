import styled from "styled-components";
import AddIconBase from "@icon/18-add-g.svg";
import { GhostGeneralButton } from "common/components/designSystem/buttons";
import { px2rem } from "common/helpers/rem";
import { pB2RegularStyle } from "common/components/designSystem/typos";

export const Wrapper = styled.div<{ isEmpty: boolean }>`
  width: 100%;
  height: 100%;
  padding: ${px2rem(16)};
  background-color: ${props =>
    props.isEmpty ? "transparent" : props.theme.colorV2.colorSet.grey10};
`;

export const CreateButtonWrapper = styled.div`
  width: 100%;
  padding: ${px2rem(12)} 0 0;
  display: flex;
  justify-content: center;
`;

export const CreateButton = styled(GhostGeneralButton).attrs({ size: "m" })`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.colorV2.colorSet.grey100};

  span {
    color: ${props => props.theme.colorV2.colorSet.grey800};
    margin-right: ${px2rem(8)};
  }
`;

export const EmptyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 ${px2rem(16)};
  margin-top: 50%;
`;

export const EmptyTextGuide = styled.div`
  padding: ${px2rem(8)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${pB2RegularStyle}
`;

export const AddIcon = styled(AddIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
