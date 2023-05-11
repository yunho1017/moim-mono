import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
// icons
import MessageIconBase from "@icon/24-message-1.svg";
import OpenProfileShowIconBase from "@icon/24-expand-g.svg";
import MoreIconBase from "@icon/24-more-g.svg";
import ContentsBoxIconBase from "@icon/18-contentsbox-1.svg";

export const Wrapper = styled.div<{
  needTopPad?: boolean;
}>`
  width: 100%;
`;
export const ProfileContainer = styled.div<{
  bottomSpace?: number;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${px2rem(60)};
  background-color: ${props => props.theme.colorV2.primary.main};

  ${props =>
    props.bottomSpace ? `margin-bottom: ${px2rem(props.bottomSpace)};` : null}
`;

interface IProfileImageHolderProps {
  type: "preview" | "show";
}
export const ProfileImageHolder = styled.div.attrs<IProfileImageHolderProps>(
  props => ({
    role: props.type === "preview" ? "button" : undefined,
  }),
)<IProfileImageHolderProps>`
  position: absolute;
  top: 0;
  left: 0;
  transform: ${props =>
    `translate(${px2rem(17)}, ${
      props.type === "preview" ? px2rem(28) : px2rem(12)
    })`};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
  }
`;

export const MenuButtonWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  align-self: flex-end;
  margin-right: ${px2rem(10)};
`;

export const MessageIcon = styled(MessageIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.fog800,
}))``;
export const OpenProfileShowIcon = styled(OpenProfileShowIconBase).attrs(
  props => ({
    size: "s",
    iconColor: props.theme.colorV2.colorSet.fog800,
  }),
)``;
export const MoreIcon = styled(MoreIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.fog800,
}))``;

export const ContentsBoxIcon = styled(ContentsBoxIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.fog800,
}))``;

export const IconBox = styled.div.attrs({ role: "button" })`
  & + & {
    margin-left: ${px2rem(8)};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${px2rem(36)};
  height: ${px2rem(36)};

  border-radius: 50%;
  background-color: ${props => props.theme.colorV2.colorSet.fog50};

  &:hover {
    opacity: 0.8;
    transition: opacity 200ms ease-in;
  }
`;
