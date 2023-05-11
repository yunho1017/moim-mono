import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import SmallRemoveIcon from "@icon/24-delete-g.svg";
import { rgba } from "polished";
export const SIZE = 52;

export const Wrapper = styled.div`
  position: relative;
  width: ${px2rem(SIZE)};
  height: ${px2rem(SIZE)};
`;

export const RemoveButtonContainer = styled.div`
  position: absolute;
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  top: -${px2rem(6)};
  right: -${px2rem(6)};
  background-color: ${props => rgba(props.theme.colorV2.colorSet.grey800, 0.9)};
  border-radius: 100%;
`;

export const SmallRemoveButton = styled(SmallRemoveIcon).attrs({
  role: "button",
  size: "xs",
})``;

export const ImageWrapperStyle = css`
  width: 100%;
  padding-top: 100%;
`;

export const ImageStyle = css`
  object-fit: cover;
  border-radius: ${px2rem(4)};
`;
