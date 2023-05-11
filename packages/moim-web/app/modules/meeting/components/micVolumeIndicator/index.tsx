import * as React from "react";
import { px2rem } from "app/common/helpers/rem";
import Microphone from "./mic";
import { BaseProps, StyledMicVolumeIndicator } from "./styled";

export interface MicVolumeIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "css">,
    BaseProps {
  /* Whether or not the attendee is muted */
  muted?: boolean;
  hostMuted?: boolean;
  /* The measure of an attendee's network connection on a scale of 0 to 1.
  A bad connection is .5 or below. */
  signalStrength: number | undefined;
}

export const MicVolumeIndicator = React.forwardRef(
  (
    {
      muted = false,
      signalStrength,
      hostMuted,
      className: propClassName,
      ...rest
    }: MicVolumeIndicatorProps,
    bgRef: React.Ref<HTMLDivElement>,
  ) => {
    const poorConnection =
      signalStrength !== undefined && signalStrength <= 0.5;
    const className = propClassName
      ? `${propClassName} ch-mic-volume-indicator`
      : "ch-mic-volume-indicator";

    return (
      <StyledMicVolumeIndicator
        className={className}
        signalStrength={signalStrength}
        muted={muted}
        {...rest}
      >
        <Microphone
          width={px2rem(18)}
          height={px2rem(18)}
          viewBox="0 0 18 18"
          muted={muted}
          className="ch-mic-icon"
          poorConnection={poorConnection}
          hostMuted={hostMuted}
        />
        <div className="ch-bg-volume-wrapper">
          <div
            ref={bgRef}
            className="ch-bg-volume-fill"
            data-testid="volume-fill"
          />
        </div>
      </StyledMicVolumeIndicator>
    );
  },
);

export default MicVolumeIndicator;
