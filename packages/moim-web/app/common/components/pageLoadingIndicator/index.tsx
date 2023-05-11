import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useStoreState } from "app/store";
import { px2rem } from "common/helpers/rem";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndexes.toast * 2};

  .root {
    height: ${px2rem(2)};
  }
  ${props => {
    if (props.theme.colorV2.accent) {
      return `
        .primary {
          background-color: ${props.theme.colorV2.colorSet.fog50};
        }
        .barColorPrimary {
          background-color: ${props.theme.colorV2.accent};
        }
        `;
    }
  }}
`;

const PageLoadingIndicator: React.FC = () => {
  const { visible } = useStoreState(state => state.pageLoadingIndicator);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <Container>
      <LinearProgress
        classes={{
          root: "root",
          colorPrimary: "primary",
          barColorPrimary: "barColorPrimary",
        }}
        color="primary"
      />
    </Container>,
    document.body,
  );
};

export default PageLoadingIndicator;
