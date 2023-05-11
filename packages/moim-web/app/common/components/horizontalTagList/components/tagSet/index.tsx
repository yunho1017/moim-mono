import React from "react";
import { useIntl } from "react-intl";
// types
import { ITextKeyLabelsTagset } from "../..";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import { NFTTagItem } from "./components/tag";
// styled
import {
  TagSet,
  TagSetWrapper,
  FilterButton,
  FilterIcon,
  TagSetFilterButtonStyle,
  FilterButtonWrapper,
  TagsCount,
} from "./styled";
import FilterDialog from "../filterDialog";

interface IProps {
  tags: Record<Moim.Id, string[]>;
  selectedTags: Record<Moim.Id, string[]>;
  textKeyLabelsByTagset?: Record<string, ITextKeyLabelsTagset>;
  selectedAllTagsCount: number;
  hasFilterButton: boolean;
  isOpenDialog: boolean;
  openDialog(): void;
  closeDialog(): void;
  onSelectTag(checked: boolean, checkboxElement: HTMLInputElement): void;
  onSelectAllByTagSet(TagSetkey?: string): void;
  onDeselectAllByTagSet(TagSetkey?: string): void;
  onApply(data: Record<Moim.Id, string[]>): void;
}

export const TagList: React.FC<IProps> = ({
  tags,
  selectedTags,
  textKeyLabelsByTagset,
  selectedAllTagsCount,
  hasFilterButton,
  isOpenDialog,
  openDialog,
  closeDialog,
  onSelectTag,
  onSelectAllByTagSet,
  onDeselectAllByTagSet,
  onApply,
}) => {
  const intl = useIntl();
  const isMobile = useIsMobile();
  const [selectedTagKey, setSelectedTagKey] = React.useState<
    string | undefined
  >(undefined);
  const [refs, setRefs] = React.useState<Record<string, HTMLDivElement>>({});

  const getOpenStatus = React.useCallback((status: boolean) => {
    if (!status) {
      setSelectedTagKey(undefined);
    }
  }, []);

  const handleCloseFilterDialog = React.useCallback(() => {
    if (isMobile) {
      setSelectedTagKey(undefined);
    }
    closeDialog();
  }, [closeDialog, isMobile]);

  const handleOpenFilterDialog = React.useCallback(() => {
    openDialog();
  }, [openDialog]);

  const handleClickTagSet = React.useCallback(
    (key: string) => {
      if (isMobile && tags[key].length > 1) {
        openDialog();
      }
      setSelectedTagKey(key);
    },
    [isMobile, openDialog, tags],
  );

  const opendTagSets = React.useMemo(() => {
    return Object.keys(tags).reduce<Record<string, boolean>>(
      (acc, current) => {
        if (selectedTagKey === current || selectedTags[current]) {
          acc[current] = true;
        }
        return acc;
      },
      Object.keys(selectedTags)?.length || selectedTagKey
        ? {}
        : { [Object.keys(tags)?.[0]]: true },
    );
  }, [selectedTagKey, selectedTags, tags]);

  const tagSetElement = React.useMemo(
    () =>
      Object.keys(tags).map(key => {
        const labelText =
          textKeyLabelsByTagset && textKeyLabelsByTagset[key]?.tagSet
            ? intl.formatMessage({
                id: textKeyLabelsByTagset[key].tagSet.textKey ?? "",
              })
            : key;
        return (
          <div>
            <TagSet
              ref={ref => {
                if (ref) {
                  refs[ref.id] = ref;
                  setRefs(refs);
                }
              }}
              id={key}
              isActivated={Boolean(key === selectedTagKey)}
              isSelected={Boolean(
                selectedTags[key] && selectedTags[key].length > 0,
              )}
              onClick={() => handleClickTagSet(key)}
            >
              {selectedTags[key] && selectedTags[key].length ? (
                <span>
                  {labelText}({selectedTags[key].length})
                </span>
              ) : (
                <span>{labelText}</span>
              )}
            </TagSet>
          </div>
        );
      }),
    [
      handleClickTagSet,
      intl,
      refs,
      selectedTagKey,
      selectedTags,
      tags,
      textKeyLabelsByTagset,
    ],
  );

  const tagElement = React.useMemo(() => {
    if (isMobile) return null;
    return (
      <>
        {selectedTagKey && tags[selectedTagKey].length && (
          <NFTTagItem
            anchorElement={refs[selectedTagKey]}
            isOpened={true}
            tagSetKey={selectedTagKey}
            tagItems={tags[selectedTagKey]}
            selectedTagsByKey={selectedTags[selectedTagKey]}
            textKeyLabels={textKeyLabelsByTagset?.[selectedTagKey]}
            selectedTagKey={selectedTagKey}
            getOpenStatus={getOpenStatus}
            onSelectTag={onSelectTag}
            onSelectAllByTagSet={onSelectAllByTagSet}
            onDeselectAllByTagSet={onDeselectAllByTagSet}
          />
        )}
      </>
    );
  }, [
    isMobile,
    selectedTagKey,
    tags,
    refs,
    selectedTags,
    textKeyLabelsByTagset,
    getOpenStatus,
    onSelectTag,
    onSelectAllByTagSet,
    onDeselectAllByTagSet,
  ]);

  return (
    <>
      <TagSetWrapper>
        <>
          {tagSetElement}
          {hasFilterButton && (
            <FilterButtonWrapper>
              <FilterButton
                overrideStyle={TagSetFilterButtonStyle}
                onClick={handleOpenFilterDialog}
              >
                <FilterIcon />
              </FilterButton>
              {selectedAllTagsCount ? (
                <TagsCount>{selectedAllTagsCount}</TagsCount>
              ) : null}
            </FilterButtonWrapper>
          )}
        </>
        {tagElement}
      </TagSetWrapper>
      <FilterDialog
        tags={tags}
        selectedTags={selectedTags}
        opendTagSets={opendTagSets}
        textKeyLabelsByTagset={textKeyLabelsByTagset}
        groupFilterDialogOpen={isOpenDialog}
        onApply={onApply}
        onClose={handleCloseFilterDialog}
      />
    </>
  );
};
