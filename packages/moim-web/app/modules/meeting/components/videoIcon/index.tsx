import * as React from "react";
import styled from "styled-components";
// icons
import EnableVideoIconBase from "@icon/18-video-solid.svg";
import DisableVideoIconBase from "@icon/18-video-off-solid.svg";
import HostDisableVideoIconBase from "@icon/18-video-prohibition-solid.svg";

interface IIconColorSwitch {
  colorSwitch?: "original" | "white"; // Default: grey
}

export const EnableVideoIcon = styled(EnableVideoIconBase).attrs<
  IIconColorSwitch
>(props => ({
  size: "xs",
  iconColor:
    props.colorSwitch === "white"
      ? props.theme.colorV2.colorSet.white1000
      : props.theme.colorV2.colorSet.grey600,
}))``;

export const DisableVideoIcon = styled(DisableVideoIconBase).attrs<
  IIconColorSwitch
>(props => ({
  size: "xs",
  iconColor:
    props.colorSwitch === "white"
      ? props.theme.colorV2.colorSet.white1000
      : props.theme.colorV2.colorSet.grey600,
}))`
  path:nth-of-type(2) {
    fill: ${props => props.theme.color.red700};
  }
`;

export const HostDisableVideoIcon = styled(HostDisableVideoIconBase).attrs<
  IIconColorSwitch
>(props => ({
  size: "xs",
  iconColor:
    props.colorSwitch === "white"
      ? props.theme.colorV2.colorSet.white1000
      : props.theme.colorV2.colorSet.grey600,
}))``;

interface IProps extends IIconColorSwitch {
  enabled?: boolean;
  hostDisabled?: boolean;
}

const VideoIcon: React.FC<IProps> = ({
  enabled,
  hostDisabled,
  colorSwitch,
}) => {
  if (typeof enabled !== "boolean") return null;

  if (hostDisabled) {
    return <HostDisableVideoIcon colorSwitch={colorSwitch} />;
  }
  return enabled ? (
    <EnableVideoIcon colorSwitch={colorSwitch} />
  ) : (
    <DisableVideoIcon colorSwitch={colorSwitch} />
  );
};

export default VideoIcon;
