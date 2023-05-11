import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  H2BoldStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import { marginToPadding } from "../helper/blockitStyleHelpers";

const blinkAnimation = css`
  animation: 1s blinkAnim infinite ease-in-out;

  @keyframes blinkAnim {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;

export const TopChip = styled.div`
  padding: ${px2rem(1)} ${px2rem(6)};
  border-radius: ${px2rem(10)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
  ${B4RegularStyle}
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${px2rem(12)};
`;

export const ContentMessage = styled.h1`
  ${H2BoldStyle};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const TimeSep = styled.div`
  ${blinkAnimation};
`;

export const UnitCount = styled.div`
  ${H2BoldStyle};
`;

export const UnitDescription = styled.div`
  ${B4RegularStyle};
`;

export const Unit = styled.div<{ fixedWidth?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: ${px2rem(58)};
  ${props => (props.fixedWidth ? `width: ${px2rem(34)};` : null)};

  & + &,
  & + ${TimeSep} {
    margin-left: ${px2rem(14)};
  }
`;

export const Wrapper = styled.div<{
  bgStyle: "default" | "brand-colored" | "image";
  phase: "before" | "running" | "after";
  imageUrl?: string;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;

  margin: ${px2rem(8)};
  padding: ${px2rem(16)} ${px2rem(16)} ${px2rem(24)};
  border-radius: ${px2rem(4)};

  ${props => marginToPadding(props.margin)};

  ${props => {
    if (props.bgStyle === "default") {
      return css`
        border: solid 1px ${props.theme.colorV2.colorSet.grey50};
        box-shadow: 0 ${px2rem(2)} ${px2rem(6)} 1px
          ${props.theme.colorV2.colorSet.grey50};
        background-color: ${props.theme.colorV2.colorSet.white1000};
        ${TopChip} {
          color: ${props.theme.colorV2.colorSet.grey600};
        }
        ${ContentMessage},
        ${UnitCount} {
          color: ${props.theme.colorV2.colorSet.grey800};
        }
        ${UnitDescription} {
          color: ${props.theme.colorV2.colorSet.grey300};
        }
      `;
    } else if (props.bgStyle === "brand-colored") {
      if (props.phase === "running") {
        return css`
          background-color: ${props.theme.colorV2.primary.main};
          ${TopChip} {
            border-color: ${props.theme.colorV2.colorSet.fog50};
            color: ${props.theme.colorV2.colorSet.fog600};
          }
          ${ContentMessage},
          ${UnitCount} {
            color: ${props.theme.colorV2.colorSet.fog800};
          }

          ${UnitDescription} {
            color: ${props.theme.colorV2.colorSet.fog200};
          }
        `;
      } else {
        return css`
          background-image: linear-gradient(
            106deg,
            ${props.theme.colorV2.secondary.main},
            ${props.theme.colorV2.primary.main} 76%
          );

          ${TopChip} {
            border-color: ${props.theme.colorV2.colorSet.fog600};
            color: ${props.theme.colorV2.colorSet.fog600};
          }

          ${ContentMessage},
          ${UnitCount} {
            color: ${props.theme.colorV2.colorSet.fog900};
          }

          ${UnitDescription} {
            color: ${props.theme.colorV2.colorSet.fog300};
          }
        `;
      }
    }
  }}
`;
