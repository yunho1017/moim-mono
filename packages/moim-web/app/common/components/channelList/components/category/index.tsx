// vendor
import * as React from "react";
// hooks
import { useProps, useHandlers } from "./hooks";
// components
import { BaseItemCell } from "common/components/itemCell";
import { CategoryName, InnerWrapper, Wrapper, DownArrowIcon } from "./styled";
import ChannelAddButton from "./components/addChannelButton";
import { PaletteDivider } from "common/components/divider";

export interface IProps {
  categoryName: string;
  useCollapse: boolean;
  showChannelAddButton: boolean;
  isCollapsed?: boolean;
  textColorPaletteKey?: Moim.Theme.SideAreaElementThemePaletteKey;
  elementPaletteKey?: Moim.Theme.SideAreaElementThemePaletteKey;
  onClickChannelAddButton?: (categoryName: string) => void;
  onClickCategory?: (categoryName: string) => void;
}

function Category(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  const {
    categoryName,
    isCollapsed,
    useCollapse,
    showChannelAddButton,
    elementPaletteKey,
    textColorPaletteKey,
  } = hookProps;
  const { handleClickCategory, handleClickChannelAddButton } = hookHandlers;

  const rightElement: React.ReactNode = React.useMemo(() => {
    const elements: React.ReactNode[] = [];

    if (showChannelAddButton) {
      elements.push(
        <ChannelAddButton
          key="channel-add-button"
          elementPaletteKey={textColorPaletteKey}
          onClick={handleClickChannelAddButton}
        />,
      );
    }

    if (isCollapsed) {
      elements.push(
        <DownArrowIcon
          key="channel-drop-down"
          elementPaletteKey={textColorPaletteKey}
        />,
      );
    }

    return elements;
  }, [
    textColorPaletteKey,
    handleClickChannelAddButton,
    isCollapsed,
    showChannelAddButton,
  ]);

  const titleElement = React.useMemo(
    () => (
      <CategoryName
        categoryName={categoryName}
        elementPaletteKey={textColorPaletteKey}
      />
    ),
    [categoryName, textColorPaletteKey],
  );

  return (
    <Wrapper onClick={handleClickCategory}>
      <PaletteDivider
        elementPaletteProps={{ type: "sideArea", key: "menuText" }}
      />

      <InnerWrapper
        useCollapse={useCollapse}
        isCollapsed={isCollapsed}
        elementPaletteKey={elementPaletteKey}
      >
        <BaseItemCell
          title={titleElement}
          rightElement={rightElement}
          size="s"
        />
      </InnerWrapper>
    </Wrapper>
  );
}

export default Category;
