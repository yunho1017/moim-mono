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
  color: ${props => props.theme.colorV2.colorSet.grey300};
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
  description?: string;
  block: Moim.Component.ProductItem.IDescription;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}

const Description = ({
  className,
  description,
  block,
  horizontalAlign,
}: IProps) => {
  if (!description) {
    return null;
  }
  const Text = getTextComponent(block.textStyle ?? "body3");
  return (
    <Wrapper className={className} horizontalAlign={horizontalAlign}>
      <Text>
        <ShavedText line={block.maxLine ?? 3}>{description}</ShavedText>
      </Text>
    </Wrapper>
  );
};

export default React.memo(Description);
