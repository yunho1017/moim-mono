import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B1Regular } from "common/components/designSystem/typos";
import RemoveIcon from "@icon/18-remove-dark.svg";

export const Wrapper = styled.div`
  max-width: 100%;
  height: ${px2rem(24)};
  display: inline-flex;
  align-items: center;
  margin-right: ${px2rem(8)};
  margin-bottom: ${px2rem(8)};
  padding: 0 ${px2rem(4)};
  border-radius: ${px2rem(2)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
  }
`;

export const Name = styled(B1Regular)`
  margin: 0 ${px2rem(6)} 0 ${px2rem(4)};
  padding-top: ${px2rem(3)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  flex: 1;
  min-width: 0;
`;

export const RemoveButton = styled(RemoveIcon).attrs({
  size: "s",
  touch: 18,
})``;
