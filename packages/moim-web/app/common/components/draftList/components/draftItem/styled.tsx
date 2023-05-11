import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
// icons
import TrashIconBase from "@icon/18-trash-g.svg";
import { MEDIA_QUERY } from "common/constants/responsive";

export const TrashIcon = styled(TrashIconBase).attrs({
  role: "button",
  size: "xs",
  touch: 42,
})``;

export const DeleteWrapper = styled.div`
  visibility: hidden;
  display: flex;
  position: absolute;
  top: 0;
  bottom: ${px2rem(1)};
  right: 0;
  align-items: center;
  justify-content: flex-end;

  width: ${px2rem(95)};
  background-image: ${props => `linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    ${props.theme.colorV2.colorSet.white1000} 45%,
    ${props.theme.colorV2.colorSet.white1000} 100%
  )`};
`;

export const Wrapper = styled.div<{ showDeleteButton?: boolean }>`
  position: relative;
  width: 100%;
  max-width: ${px2rem(423)};
  transition: background-color 200ms ease-in;

  ${props =>
    props.showDeleteButton
      ? css`
          ${DeleteWrapper} {
            visibility: visible;
          }
        `
      : undefined};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    &:hover {
      background-color: ${props => props.theme.colorV2.colorSet.grey10};

      ${DeleteWrapper} {
        visibility: visible;
      }
    }
  }
`;
