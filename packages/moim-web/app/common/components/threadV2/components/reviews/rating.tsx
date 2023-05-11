import * as React from "react";
import styled from "styled-components";
import { default as RatingComponent } from "@material-ui/lab/Rating";
import { B4RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  padding: ${px2rem(4)} 0;

  .count {
    margin-left: ${px2rem(6)};
    color: ${props => props.theme.colorV2.colorSet.grey300};
    ${B4RegularStyle}
  }
`;

interface IProps {
  ratingValue: number;
}

const Rating: React.FC<IProps> = ({ ratingValue }) => {
  return (
    <Wrapper>
      <RatingComponent precision={0.5} readOnly={true} value={ratingValue} />
      <span className="count">{ratingValue}</span>
    </Wrapper>
  );
};

export default Rating;
