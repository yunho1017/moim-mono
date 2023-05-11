import * as React from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { px2rem } from "common/helpers/rem";

const Trigger = styled.div`
  position: absolute;
  top: ${px2rem(-200)};
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
`;

interface IProps {
  onVisible: () => void;
}
export default function InViewTrigger({ onVisible }: IProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  React.useLayoutEffect(() => {
    if (inView) {
      onVisible();
    }
  }, [inView]);

  return <Trigger ref={ref} />;
}
