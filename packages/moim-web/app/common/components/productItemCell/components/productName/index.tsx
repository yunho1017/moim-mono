import React from "react";
import styled from "styled-components";
import ShavedText from "common/components/shavedText/v2";
import { getTextComponent } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { getFlexAlignStyle } from "../wrapper/styled";

const Wrapper = styled.div<{
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}>`
  width: 100%;
  padding: ${px2rem(4)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  display: flex;
  ${props =>
    props.horizontalAlign &&
    getFlexAlignStyle({
      direction: "row",
      horizontalAlign: props.horizontalAlign,
    })}}
`;

interface IProps {
  className?: string;
  productName: string;
  block: Moim.Component.ProductItem.IProductName;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}

const ProductName = ({
  className,
  productName,
  block,
  horizontalAlign,
}: IProps) => {
  const Text = getTextComponent(block.textStyle ?? "body3");
  return (
    <Wrapper className={className} horizontalAlign={horizontalAlign}>
      <Text>
        <ShavedText line={block.maxLine ?? 2}>{productName}</ShavedText>
      </Text>
    </Wrapper>
  );
};

export default React.memo(ProductName);
