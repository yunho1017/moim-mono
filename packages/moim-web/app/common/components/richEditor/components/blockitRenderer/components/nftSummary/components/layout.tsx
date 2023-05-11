import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";
import { Left, Right } from "../styled";

interface IProps {
  mediaElement: React.ReactNode;
  detailElement: React.ReactNode;
  propertyElement: React.ReactNode;
  descriptionElement: React.ReactNode;
}

const Layout: React.FC<IProps> = ({
  mediaElement,
  detailElement,
  propertyElement,
  descriptionElement,
}: IProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        {mediaElement}
        {detailElement}
        {propertyElement}
        {descriptionElement}
      </>
    );
  }
  return (
    <>
      <Left>
        {mediaElement}
        {descriptionElement}
      </Left>
      <Right>
        {detailElement}
        {propertyElement}
      </Right>
    </>
  );
};

export default React.memo(Layout);
