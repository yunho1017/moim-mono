import * as React from "react";
import { components } from "react-select";
import {
  MenuItemWrapper,
  MenuItemPrefix,
  MenuItemContents,
  MenuItemRight,
  CheckMarkIcon,
} from "./styled";

export default function MenuItem(
  props: React.ComponentProps<typeof components.Option>,
) {
  const { isSelected, isDisabled, data } = props;
  const rightElement = React.useMemo(() => {
    const elements: React.ReactNode[] = [];
    if (data.suffix) {
      elements.push(data.suffix);
    }

    if (isSelected) {
      elements.push(<CheckMarkIcon />);
    }
    return elements;
  }, [data.suffix, isSelected]);

  return (
    <components.Option {...props}>
      <MenuItemWrapper
        selected={isSelected}
        disabled={isDisabled}
        leftPadding={data.prefix?.leftMargin}
      >
        {data.prefix && (
          <MenuItemPrefix
            touch={data.prefix.touch}
            rightMargin={data.prefix.rightMargin}
          >
            {data.prefix.element}
          </MenuItemPrefix>
        )}
        <MenuItemContents>{data.label}</MenuItemContents>
        <MenuItemRight>{rightElement}</MenuItemRight>
      </MenuItemWrapper>
    </components.Option>
  );
}
