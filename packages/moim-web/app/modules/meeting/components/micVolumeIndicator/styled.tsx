// NOTE: code from https://github.com/aws/amazon-chime-sdk-component-library-react/blob/main/src/components/ui/MicVolumeIndicator/index.tsx
import styled from "styled-components";
import { MicVolumeIndicatorProps } from ".";

export interface BaseProps {
  /** Optional tag to render the component as a different HTML tag */
  tag?: any;
  id?: string;
  /** Optional css */
  css?: string;
  /** Optional class names to apply to the element */
  className?: string;
}

const baseStyles = ({ css }: BaseProps) => (css ? `@media { ${css} };` : "");

export const StyledMicVolumeIndicator = styled.div<MicVolumeIndicatorProps>`
  position: relative;
  line-height: 0;
  ${baseStyles}
  .ch-mic-icon {
    position: relative;
    z-index: 2;
    width: 100%;
  }
  .ch-bg-volume-wrapper {
    position: absolute;
    bottom: 43%;
    left: 38%;
    height: 38%;
    width: 21%;
    border-radius: 20%;
    overflow: hidden;
  }
  .ch-bg-volume-fill {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform-origin: bottom;
    will-change: transform;
    background-color: ${props =>
      props.signalStrength && props.signalStrength <= 0.5
        ? props.theme.color.red200
        : props.theme.color.cobalt800};
  }
`;

export default StyledMicVolumeIndicator;
