import * as React from "react";
import CollapsibleBox from "common/components/collapsibleBox";
import {
  BOX_HEIGHT,
  FilterBoxContainer,
  Left,
  Right,
  FilterSetIconHolder,
  FilterEmptyIcon,
  FilterHasIcon,
  TagSelectedCountBadge,
  OrderMenuBoxStyle,
} from "./styled";

interface IProps {
  menus: {
    filterSet: {
      enable: boolean;
      active: boolean;
      selectedTagCount: number;
      onClick(): void;
    };
    order: {
      enable: boolean;
      currentValue: any;
      onClick(): void;
    };
  };
  separateTagFilter: boolean;
}

const FilterBoxComponent: React.FC<IProps> = ({ menus, separateTagFilter }) => {
  const { filterSet, order } = menus;

  const handleClickOrder = React.useCallback(() => {
    order.onClick();
  }, [order]);

  const handleClickFilterSet = React.useCallback(() => {
    filterSet.onClick();
  }, [filterSet]);

  const orderMenu = React.useMemo(() => {
    if (!order.enable) return null;
    return (
      <div key="oreder_menu" onClick={handleClickOrder}>
        <CollapsibleBox
          open={false}
          iconSize={BOX_HEIGHT}
          title="TBD SORTKEY"
          headerWrapperStyle={OrderMenuBoxStyle}
        />
      </div>
    );
  }, [order.enable, handleClickOrder]);

  const filterSetMenu = React.useMemo(() => {
    if (!filterSet.enable) return null;

    return (
      <FilterSetIconHolder
        key="filterSet_menu"
        onlyOneMenuWithCountBadge={
          !orderMenu && filterSet.selectedTagCount > 0 && !separateTagFilter
        }
        onClick={handleClickFilterSet}
      >
        {filterSet.active ? <FilterHasIcon /> : <FilterEmptyIcon />}
        {filterSet.selectedTagCount > 0 && !separateTagFilter ? (
          <TagSelectedCountBadge>
            {filterSet.selectedTagCount}
          </TagSelectedCountBadge>
        ) : null}
      </FilterSetIconHolder>
    );
  }, [
    filterSet.active,
    filterSet.enable,
    filterSet.selectedTagCount,
    handleClickFilterSet,
    orderMenu,
    separateTagFilter,
  ]);

  const menuElement = React.useMemo(() => {
    const enabledMenuCount = [orderMenu, filterSetMenu].filter(item =>
      Boolean(item),
    ).length;
    let leftMenu: any = [];
    let rightMenu: any = [];
    if (enabledMenuCount === 1) {
      leftMenu = [];
      rightMenu = [orderMenu, filterSetMenu];
    } else {
      leftMenu = [filterSetMenu];
      rightMenu = [orderMenu];
    }

    return (
      <>
        <Left>{leftMenu}</Left>
        <Right>{rightMenu}</Right>
      </>
    );
  }, [filterSetMenu, orderMenu]);

  return <FilterBoxContainer>{menuElement}</FilterBoxContainer>;
};

export default FilterBoxComponent;
