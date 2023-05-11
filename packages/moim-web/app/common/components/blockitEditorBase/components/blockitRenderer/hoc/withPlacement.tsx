import React from "react";
import styled, { FlattenInterpolation } from "styled-components";

import { MEDIA_QUERY } from "common/constants/responsive";
import { marginToPadding } from "../components/helper/blockitStyleHelpers";
import { px2rem } from "common/helpers/rem";

const PlacementContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Section = styled.div<{
  sectionWidth?: "fit-container" | number;
  sectionMaxWidth?: number;
  sectionMinWidth?: number;
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  max-width: ${props =>
    props.sectionMaxWidth ? px2rem(props.sectionMaxWidth) : "initial"};
  min-width: ${props =>
    props.sectionMinWidth ? px2rem(props.sectionMinWidth) : "initial"};

  width: ${props => {
    if (!props.sectionWidth || props.sectionWidth === "fit-container") {
      return "100%";
    }
    return `${props.sectionWidth}%`;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
  }
  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

export function withPlacement<
  T extends Moim.Blockit.BaseBlock & {
    wrapperStyle?: FlattenInterpolation<any>;
  }
>(WrappedComponent: React.ComponentType<T>) {
  return class extends React.PureComponent<T> {
    public render() {
      return (
        <PlacementContainer>
          <Section
            sectionWidth={this.props.sectionWidth}
            sectionMinWidth={this.props.sectionMinWidth}
            sectionMaxWidth={this.props.sectionMaxWidth}
            overrideStyle={this.props.wrapperStyle}
            margin={this.props.margin}
          >
            <WrappedComponent {...this.props} />
          </Section>
        </PlacementContainer>
      );
    }
  };
}
