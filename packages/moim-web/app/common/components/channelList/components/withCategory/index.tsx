// vendor
import * as React from "react";
// component
import { ItemWrapper, Wrapper } from "./styled";
import Category from "../category";

// hooks
import { useHandlers, useProps } from "./hooks";

export interface IProps {
  useCollapse: boolean;
  showChannelAddButton: boolean;
  categoryName?: string;
  collapsed?: boolean;
  textColorPaletteKey?: Moim.Theme.SideAreaElementThemePaletteKey;
  elementPaletteKey?: Moim.Theme.SideAreaElementThemePaletteKey;
  onClickChannelAddButton?(categoryName: string): void;
  onClickCategoryName?(categoryName: string, collapsed: boolean): void;
}

export function WithCategory({
  children,
  ...props
}: React.PropsWithChildren<IProps>) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  const {
    categoryName,
    useCollapse,
    collapsedState,
    showChannelAddButton,
    elementPaletteKey,
    textColorPaletteKey,
  } = hookProps;
  const { handleClickCategoryName, handleClickChannelAddButton } = hookHandlers;

  return (
    <Wrapper>
      {categoryName && (
        <Category
          categoryName={categoryName}
          useCollapse={useCollapse}
          isCollapsed={collapsedState}
          showChannelAddButton={showChannelAddButton}
          textColorPaletteKey={textColorPaletteKey}
          elementPaletteKey={elementPaletteKey}
          onClickCategory={handleClickCategoryName}
          onClickChannelAddButton={handleClickChannelAddButton}
        />
      )}

      {!collapsedState && <ItemWrapper>{children}</ItemWrapper>}
    </Wrapper>
  );
}
