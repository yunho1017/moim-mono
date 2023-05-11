import styled from "styled-components";
import { H10Bold } from "common/components/designSystem/typos";
import { useHoverStyle } from "common/components/designSystem/styles";

import SettingSmallIconBase from "@icon/18-setting-g.svg";
import SettingIconBase from "@icon/24-setting-g.svg";
import AdminSettingSmallIconBase from "@icon/18-adminsetting-g.svg";
import AdminSettingIconBase from "@icon/24-adminsetting-g.svg";
import AppointMembersSmallIconBase from "@icon/18-invite-g.svg";
import AppointMembersIconBase from "@icon/24-invite-g.svg";
import ShareMoimSmallIconBase from "@icon/18-shareandr-g.svg";
import ShareMoimIconBase from "@icon/24-shareandr-g.svg";
import EditIconSmallBase from "@icon/18-edit-g.svg";
import EditIconBase from "@icon/24-edit-g.svg";
import AddIconBase from "@icon/18-add-g.svg";
import CoverSmallIconBase from "@icon/18-cover-g.svg";
import CoverIconBase from "@icon/24-cover-g.svg";
import MemberSmallIconBase from "@icon/18-member-g.svg";
import MemberIconBase from "@icon/24-member-g.svg";
import LogoutSmallIconBase from "@icon/18-logout-g.svg";
import LogoutIconBase from "@icon/24-logout-g.svg";
import PluginsSmallIconBase from "@icon/18-blocks-g.svg";
import PluginsIconBase from "@icon/24-blocks-g.svg";

import { MEDIA_QUERY } from "common/constants/responsive";

export const MenuList = styled.ul``;

export const MenuItem = styled.li.attrs({ role: "button" })`
  ${useHoverStyle};
`;

export const MenuText = styled(H10Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey600};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }
`;

export const SettingSmallIcon = styled(SettingSmallIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const SettingIcon = styled(SettingIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const AdminSettingSmallIcon = styled(AdminSettingSmallIconBase).attrs(
  props => ({
    size: "xs",
    iconColor: props.theme.colorV2.colorSet.grey300,
  }),
)``;

export const AdminSettingIcon = styled(AdminSettingIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const AppointMembersSmallIcon = styled(
  AppointMembersSmallIconBase,
).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const AppointMembersIcon = styled(AppointMembersIconBase).attrs(
  props => ({
    size: "s",
    iconColor: props.theme.colorV2.colorSet.grey300,
  }),
)``;

export const ShareMoimSmallIcon = styled(ShareMoimSmallIconBase).attrs(
  props => ({
    size: "xs",
    iconColor: props.theme.colorV2.colorSet.grey300,
  }),
)``;

export const ShareMoimIcon = styled(ShareMoimIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const EditSmallIcon = styled(EditIconSmallBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const EditIcon = styled(EditIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const AddSmallIcon = styled(AddIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const AddIcon = styled(AddIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const CoverSmallIcon = styled(CoverSmallIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const CoverIcon = styled(CoverIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const MemberSmallIcon = styled(MemberSmallIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const MemberIcon = styled(MemberIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const LogoutSmallIcon = styled(LogoutSmallIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const LogoutIcon = styled(LogoutIconBase).attrs({ size: "s" })``;

export const PluginsSmallIcon = styled(PluginsSmallIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const PluginsIcon = styled(PluginsIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
