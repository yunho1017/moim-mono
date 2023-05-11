import styled from "styled-components";
// icons
import RoundedLeftArrowIconResource from "@icon/24-sectionfolder-g.svg";
import RoundedLeftArrowHoverIconResource from "@icon/24-sectionfolder-g-hover.svg";

export const ButtonWrapper = styled.button.attrs({ role: "button" })``;

export const RoundedLeftArrowIcon = styled(RoundedLeftArrowIconResource).attrs({
  role: "button",
  size: "s",
  touch: 24,
})``;
export const RoundedLeftArrowHoverIcon = styled(
  RoundedLeftArrowHoverIconResource,
).attrs({ role: "button", size: "s", touch: 24 })``;

export const RoundedRightArrowIcon = styled(RoundedLeftArrowIconResource).attrs(
  {
    role: "button",
    size: "s",
    touch: 24,
  },
)`
  transform: rotate(180deg);
`;
export const RoundedRightArrowHoverIcon = styled(
  RoundedLeftArrowHoverIconResource,
).attrs({ role: "button", size: "s", touch: 24 })`
  transform: rotate(180deg);
`;
