import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  height: ${px2rem(92)};
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
  background-color: var(--external-main-color);
  ${props =>
    props.bottomSpace ? `margin-bottom: ${px2rem(props.bottomSpace)};` : null};
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
    background-color: white;
  }
`;
