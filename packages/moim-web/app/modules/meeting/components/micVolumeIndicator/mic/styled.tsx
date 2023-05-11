// NOTE: code from:
// https://github.com/aws/amazon-chime-sdk-component-library-react/blob/main/src/components/ui/icons/Svg.tsx
// https://github.com/aws/amazon-chime-sdk-component-library-react/blob/main/src/components/ui/icons/Microphone/Styled.tsx
import * as React from "react";
import styled from "styled-components";

import { MicrophoneProps } from "./";

export interface SvgProps extends React.SVGAttributes<HTMLOrSVGElement> {
  /** CSS classname to apply custom styles. */
  className?: string;
  /** Defines the position and dimension of an SVG viewport. viewBox attribute is a list of four numbers: min-x, min-y, width and height. */
  viewBox?: string;
  /** The horizontal length of a SVG component. */
  width?: string;
  /** The vertical length of a SVG component. */
  height?: string;
  /** The title of a SVG component. */
  title?: string;
  /** Optional styling via styled component string. */
  css?: string;
}

const Svg: React.FC<SvgProps> = ({
  className,
  children,
  viewBox = "0 0 24 24",
  xmlns = "http://www.w3.org/2000/svg",
  width,
  height,
  title,
  ...otherProps
}) => {
  // This is necessary because some versions of Firefox would not use rems as values
  // for width and height attributes: https://bugzilla.mozilla.org/show_bug.cgi?id=1231147
  const styles = {
    width,
    height,
  };

  return (
    <svg
      xmlns={xmlns}
      className={`Svg ${className || ""}`}
      height={height}
      style={styles}
      viewBox={viewBox}
      width={width}
      {...otherProps}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
};

const SvgWithoutMicrophoneProps = ({
  poorConnection,
  muted,
  ...rest
}: MicrophoneProps) => <Svg {...rest} />;

export const StyledSvg = styled(SvgWithoutMicrophoneProps)<MicrophoneProps>`
  ${props => (props.poorConnection ? `color: ${props.theme.color.red700}` : "")}
`;
