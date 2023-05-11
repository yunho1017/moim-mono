import styled from "styled-components";
import { px2rem } from "app/common/helpers/rem";

const CONTAINER_SIZE = 36;
const ICON_SIZE = 18;

export const BadgeWrapper = styled.a`
  display: inline-flex;
  width: ${px2rem(CONTAINER_SIZE)};
  height: ${px2rem(CONTAINER_SIZE)};
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  border-radius: 50%;

  &:hover {
    opacity: 0.6;
    transition: opacity 200ms ease-in;
  }

  & + & {
    margin-left: ${px2rem(6)};
  }
`;

export const BadgeIcon = styled.img`
  width: ${px2rem(ICON_SIZE)};
  height: ${px2rem(ICON_SIZE)};
`;
