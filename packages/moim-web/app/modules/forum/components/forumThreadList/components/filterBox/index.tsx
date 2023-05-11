import * as React from "react";
import { Wrapper } from "./styled";
import FilterBoxComponent from "./component";
import FilterDialog from "./components/filterDialog";
import TagSetBox from "./components/tagSetBox";
import { IProps, useProps, useHandlers } from "./useHooks";

const FilterBoxContainer: React.FC<IProps> = props => {
  const {
    refFilterDialog,
    filterOption,
    tagSets,
    menus,
    tagSetFilterBoxType,
    selectedTagItems,
    visibleTopTabNavigation,
    handleDialogResetClick,
    handleDialogApplyClick,
    handleDialogClose,
  } = useHandlers(useProps(props));
  const disableFilterBox = React.useMemo(
    () => !menus.filterSet.enable && !menus.order.enable,
    [menus.filterSet.enable, menus.order.enable],
  );
  const showTagSetBox = React.useMemo(
    () => Boolean(tagSets.length) && tagSetFilterBoxType,
    [tagSetFilterBoxType, tagSets.length],
  );
  const wrapperDividerEnable = React.useMemo(
    () => !disableFilterBox || showTagSetBox,
    [disableFilterBox, showTagSetBox],
  );

  return (
    <Wrapper
      showDiv={wrapperDividerEnable}
      visibleTopTabNavigation={visibleTopTabNavigation}
    >
      {disableFilterBox ? null : (
        <FilterBoxComponent
          menus={menus}
          separateTagFilter={tagSetFilterBoxType}
        />
      )}
      {showTagSetBox ? (
        <TagSetBox
          tagSets={tagSets}
          selectedTagSetItems={selectedTagItems}
          onChangeSelectedTags={handleDialogApplyClick}
          visibleTopTabNavigation={visibleTopTabNavigation}
        />
      ) : null}

      <FilterDialog
        ref={refFilterDialog}
        tagSet={tagSets}
        selectedTagItems={filterOption.tagSets?.selectedTags || []}
        enableTagSetFilter={true}
        onResetClick={handleDialogResetClick}
        onApplyClick={handleDialogApplyClick}
        onClose={handleDialogClose}
      />
    </Wrapper>
  );
};

export default FilterBoxContainer;
