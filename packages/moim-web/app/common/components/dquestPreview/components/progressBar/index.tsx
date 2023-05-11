import * as React from "react";
import { rgba } from "polished";
import { LinearProgress } from "@mui/material";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  width: 100%;
  height: ${px2rem(16)};
  background-color: ${props => rgba(props.theme.color.jade400, 0.15)};
  border-radius: ${px2rem(3)};
  padding: ${px2rem(2)};

  .lp-root {
    height: ${px2rem(12)};
    border-radius: ${px2rem(3)};
    background-color: transparent;
  }

  .lp-barPrimary {
    height: ${px2rem(12)};
    border-radius: ${px2rem(3)};
    background-color: ${props => props.theme.color.jade400};
  }
`;

interface IProps {
  value: number;
  max: number;
}

const QuestLinearProgressBar: React.FC<IProps> = ({ value, max }) => {
  return (
    <Wrapper>
      <LinearProgress
        variant="determinate"
        classes={{ root: "lp-root", barColorPrimary: "lp-barPrimary" }}
        value={Math.round((value / max) * 100)}
      />
    </Wrapper>
  );
};

export default QuestLinearProgressBar;
