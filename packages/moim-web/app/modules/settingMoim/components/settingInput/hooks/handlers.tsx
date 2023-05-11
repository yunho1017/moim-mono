import * as React from "react";
import { IProps } from "../";
import { BaseItemCell } from "common/components/itemCell";
import {
  VerticalContainer,
  Title,
  IconWrapper,
  WithIconWrapper,
} from "../styled";

export function useHandlers(props: IProps) {
  const { title, direction, input, leftIconElement } = props;

  const renderContent = React.useCallback(() => {
    if (title) {
      switch (direction) {
        case "horizontal": {
          return !leftIconElement ? (
            <BaseItemCell
              size="xs"
              title={<Title>{title}</Title>}
              rightElement={input}
              disableRightPadding={true}
            />
          ) : (
            <WithIconWrapper>
              <IconWrapper>{leftIconElement}</IconWrapper>
              <BaseItemCell
                size="xs"
                title={<Title>{title}</Title>}
                rightElement={input}
                disableRightPadding={true}
              />
            </WithIconWrapper>
          );
        }

        case "vertical":
        default: {
          return (
            <VerticalContainer>
              <BaseItemCell size="xs" title={<Title>{title}</Title>} />
              {input}
            </VerticalContainer>
          );
        }
      }
    }

    return input;
  }, [title, input, direction, leftIconElement]);

  return {
    renderContent,
  };
}
