import * as React from "react";
// style
import { Description, HeaderWrapper, Title } from "./styled";

interface IProps {
  title: string;
  description?: string;
}

const NFTSetShowHeader: React.FC<IProps> = ({ title, description }) => (
  <HeaderWrapper>
    <Title>{title}</Title>
    {description && <Description>{description}</Description>}
  </HeaderWrapper>
);

export default NFTSetShowHeader;
