import * as React from "react";
import VerticalScrollLayout from "./layouts/verticalScroll";
import HorizontalScrollLayout from "./layouts/horizontalScroll";

import useIsMobile from "common/hooks/useIsMobile";

interface IProps {
  element: Moim.Blockit.IListStyleElement;
  children: React.ReactNode[];
  rightArrow?: React.ElementType;
  leftArrow?: React.ElementType;
  arrowPortalTargetId?: string;
}

const BlockitListLayout: React.FC<IProps> = ({
  element,
  children,
  rightArrow,
  leftArrow,
  arrowPortalTargetId,
}) => {
  const isMobile = useIsMobile();
  const type = React.useMemo(
    () => (isMobile ? element.scrollDirection : element.scrollDirection_web),
    [isMobile, element.scrollDirection_web, element.scrollDirection],
  );

  const fallbackType = React.useMemo(
    () => (isMobile ? element.type : element.type_web),
    [isMobile, element.type, element.type_web],
  );

  switch (type) {
    case "vertical":
      return (
        <VerticalScrollLayout {...element}>{children}</VerticalScrollLayout>
      );
    case "horizontal":
      return (
        <HorizontalScrollLayout
          {...element}
          rightArrow={rightArrow}
          leftArrow={leftArrow}
          portalTargetId={arrowPortalTargetId}
        >
          {children}
        </HorizontalScrollLayout>
      );

    default:
      if (fallbackType === "grid") {
        return (
          <VerticalScrollLayout {...element}>{children}</VerticalScrollLayout>
        );
      } else if (fallbackType === "scroll") {
        return (
          <HorizontalScrollLayout
            {...element}
            rightArrow={rightArrow}
            leftArrow={leftArrow}
            portalTargetId={arrowPortalTargetId}
          >
            {children}
          </HorizontalScrollLayout>
        );
      }
      return null;
  }
};

export default BlockitListLayout;
