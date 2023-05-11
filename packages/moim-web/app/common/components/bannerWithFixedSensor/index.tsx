// vendor
import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import { FlattenInterpolation } from "styled-components";
// component
import {
  BannerWrapper,
  CoverFixedSensor,
  bannerStyle,
  IBannerProps,
} from "./styled";

import Banner from "app/common/components/banner";

interface IProps {
  banner: Moim.IBanner;
  isFixed: boolean;
  bannerFixedStyle?: FlattenInterpolation<any>;
  children?: React.ReactNode;
  onClick?(): void;
}

const BannerWithFixedSensor: React.RefForwardingComponent<
  HTMLDivElement,
  React.PropsWithChildren<IProps>
> = ({ banner, isFixed, bannerFixedStyle, onClick, children }, ref) => {
  const bannerRef = React.useRef<HTMLDivElement>(null);
  const [bannerHeight, setBannerHeight] = React.useState(0);
  const handleResize = React.useCallback(() => {
    requestAnimationFrame(() => {
      if (bannerRef.current) {
        setBannerHeight(Math.floor(bannerRef.current.offsetWidth / 3));
      }
    });
  }, []);

  return (
    <ReactResizeDetector handleWidth={true} onResize={handleResize}>
      <BannerWrapper ref={bannerRef} onClick={onClick}>
        <Banner<IBannerProps>
          banner={banner}
          styles={bannerStyle}
          isFixed={isFixed}
          bannerHeight={bannerHeight}
          bannerFixedStyle={bannerFixedStyle}
        >
          {children}
        </Banner>
      </BannerWrapper>
      <CoverFixedSensor ref={ref} bannerHeight={bannerHeight} />
    </ReactResizeDetector>
  );
};

export default React.forwardRef(BannerWithFixedSensor);
