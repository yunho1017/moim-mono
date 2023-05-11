import React from "react";
import styled, { css } from "styled-components";

import LineBlock from "common/components/blockitEditorBase/components/blockitRenderer/components/line";

const Wrapper = styled.div`
  width: 100%;
`;

const Progress = styled(LineBlock).attrs(props => ({
  type: "line",
  backgroundColor: props.theme.colorV2.primary.light,
  fillColor: props.theme.colorV2.accent,
  height: 2,
  margin: {
    left: 0,
    right: 0,
    top: 4,
    bottom: 4,
  },
  wrapperStyle: css`
    background-color: transparent;
  `,
}))``;

interface IProps {
  className?: string;
  productType: Moim.Commerce.PRODUCT_TYPE;
  goalAmount?: number;
  soldAmount: number;

  block: Moim.Component.ProductItem.IProgressBar;
}

const ProgressBar = ({
  className,
  productType,

  goalAmount,
  soldAmount,
}: IProps) => {
  if (productType !== "fund") {
    return null;
  }

  const achieveRate = goalAmount
    ? Math.round((soldAmount / goalAmount) * 100)
    : 0;

  return (
    <Wrapper className={className}>
      <Progress fillWidth={achieveRate} />
    </Wrapper>
  );
};

export default React.memo(ProgressBar);
