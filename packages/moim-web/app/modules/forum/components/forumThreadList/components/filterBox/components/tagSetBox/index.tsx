import * as React from "react";
import { FormattedMessage } from "react-intl";
import ResponsiveMenu from "common/components/responsiveMenu";
import TagChip from "common/components/chips/preset/tagChip";
import HorizontalLabelList from "common/components/horizontalLabelList";
import { useProps, useHandlers } from "./useHooks";
import FilterDialog, { IFilterOption } from "../filterDialog";
import {
  Container,
  TagItemWrapper,
  LabelListSectionStyle,
  LabelListWrapperStyle,
} from "./styled";

export interface IProps {
  tagSets: Moim.TagSet.ITagSet[];
  selectedTagSetItems: Moim.TagSet.ITagItem[];
  visibleTopTabNavigation?: boolean;
  onChangeSelectedTags(filterOption: IFilterOption): void;
}

const TagSetBox: React.FC<IProps> = props => {
  const {
    refContainer,
    refFilterDialog,
    open,
    tagSets,
    labels,
    renderTagItems,
    clickedTagSet,
    selectedLabels,
    selectedTagItems,
    selectedTagSetItems,
    popoverPosition,
    visibleTopTabNavigation,
    handleOpenDialog,
    handleDialogEmptyClick,
    handleDialogApplyClick,
    handleLabelClick,
    handleMenuClose,
    handleClickTagChip,
    setSelectedTagItems,
  } = useHandlers(useProps(props));

  const tagItemElements = React.useMemo(
    () =>
      renderTagItems.map(item => {
        const selected = Boolean(selectedTagItems.find(i => i.id === item.id));
        return (
          <TagChip
            key={item.id}
            size="medium"
            expanded={true}
            tagItem={item}
            selected={selected}
            onClick={handleClickTagChip}
          />
        );
      }),
    [handleClickTagChip, renderTagItems, selectedTagItems],
  );

  React.useEffect(() => {
    setSelectedTagItems(selectedTagSetItems);
  }, [selectedTagSetItems, setSelectedTagItems]);

  return (
    <Container
      ref={refContainer}
      visibleTopTabNavigation={visibleTopTabNavigation}
    >
      <HorizontalLabelList
        disableDim={true}
        disableExpand={true}
        disableSelectCount={true}
        labelType="tagSet"
        labelSize="medium"
        labels={labels}
        selectedLabels={selectedLabels}
        sectionStyle={LabelListSectionStyle}
        listWrapperStyle={LabelListWrapperStyle}
        disableMoreButton={selectedLabels.length === 0}
        onLabelClick={handleLabelClick}
        onMoreClick={handleOpenDialog}
      />
      <FilterDialog
        titleElement={<FormattedMessage id="post_list/filter_dialog_title" />}
        enableTagSetFilter={true}
        enableTagSetFilterOnly={true}
        ref={refFilterDialog}
        tagSet={tagSets}
        selectedTagItems={selectedTagItems.map(item => item.id)}
        initialOpenTagSets={[clickedTagSet]}
        onApplyClick={handleDialogApplyClick}
        onResetClick={handleDialogEmptyClick}
        onClose={handleDialogEmptyClick}
      />

      <ResponsiveMenu
        open={open.status}
        anchorPosition={popoverPosition}
        onCloseRequest={handleMenuClose}
      >
        <TagItemWrapper>{tagItemElements}</TagItemWrapper>
      </ResponsiveMenu>
    </Container>
  );
};

export default TagSetBox;
