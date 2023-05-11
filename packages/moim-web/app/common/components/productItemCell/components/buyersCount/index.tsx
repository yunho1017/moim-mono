import React from "react";
import styled from "styled-components";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { px2rem } from "common/helpers/rem";
import { getTextComponent } from "common/components/designSystem/typos";
import { getHorizontalAlignStyle } from "../wrapper/styled";

const Wrapper = styled.div<{
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}>`
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  width: 100%;
  display: inline-block;
  ${props =>
    props.horizontalAlign && getHorizontalAlignStyle(props.horizontalAlign)}
  {useSingleLineStyle}
`;

interface IProps {
  className?: string;
  buyersCount: number;
  block: Moim.Component.ProductItem.IBuyersCount;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}

const BuyersCount = ({
  className,
  buyersCount,
  block,
  horizontalAlign,
}: IProps) => {
  if (!buyersCount) {
    return null;
  }
  const Text = getTextComponent(block.textStyle ?? "caption");
  return (
    <Wrapper className={className} horizontalAlign={horizontalAlign}>
      <Text>
        <FormattedMessage
          id="backers_count"
          values={{
            plain_count: buyersCount,
            formattedCount: (
              <FormattedNumber useGrouping={true} value={buyersCount} />
            ),
          }}
        />
      </Text>
    </Wrapper>
  );
};

export default React.memo(BuyersCount);
