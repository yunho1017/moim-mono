import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
// type
import { ITextKeyLabelsTagset } from "common/components/horizontalTagList";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import Checkbox from "common/components/blockitEditorBase/components/blockitRenderer/components/inputs/checkbox/index";
// styled
import { DefaultDivider } from "app/common/components/divider/styled";
import {
  FilterDialogTagItemContainer,
  DialogTagSet,
  DialogTagItemsWrapper,
  CollapseIconButton,
  ArrowIcon,
  DialogTagSetTitleWrapper,
  DialogTagSetCount,
  GroupFilterButton,
  FilterCheckboxWrapperStyle,
  FilterSelectAllCheckboxWrapperStyle,
} from "./styled";
import {
  GroupFilterDialogWrapper,
  GroupFilterContainer,
  GroupFilterButtonContainer,
} from "../styled";

interface IProps {
  tags: Record<string, string[]>;
  selectedTags: Record<string, string[]>;
  opendTagSets: Record<string, boolean>;
  textKeyLabelsByTagset?: Record<string, ITextKeyLabelsTagset>;
  onApply(data: Record<string, string[]>): void;
  onClose(): void;
}

export const FilterDialogTagItem: React.FC<IProps> = ({
  tags,
  selectedTags,
  opendTagSets,
  textKeyLabelsByTagset,
  onApply,
  onClose,
}) => {
  const intl = useIntl();
  const isMobile = useIsMobile();
  const [selectedItems, setSelectedItems] = React.useState<
    Record<Moim.Id, string[]>
  >(selectedTags);
  const [opendItems, setOpenedItems] = React.useState<Record<string, boolean>>(
    opendTagSets,
  );
  const [selectedTagKey, setSelectedTagKey] = React.useState<
    string | undefined
  >(undefined);

  const selectedAllItemsCount = React.useMemo(
    () =>
      Object.values(selectedItems).reduce(
        (prev, curr) => prev + curr.length,
        0,
      ),
    [selectedItems],
  );

  const handleClickTagSet = React.useCallback((key: string) => {
    setOpenedItems(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  }, []);

  const handleClick = React.useCallback(
    (checked: boolean, _undefined, checkboxElement: HTMLInputElement) => {
      const checkboxName = checkboxElement.name.split(":")[0];
      const { [checkboxName]: currentTags, ...rest } = selectedItems;
      setSelectedTagKey(checkboxName);
      if (checked) {
        if (currentTags) {
          setSelectedItems({
            ...rest,
            [checkboxName]: [...currentTags, checkboxElement.name],
          });
        } else {
          setSelectedItems({
            ...rest,
            [checkboxName]: [checkboxElement.name],
          });
        }
      } else {
        const filteredTagSet = currentTags.filter(
          tag => tag !== checkboxElement.name,
        );
        setSelectedItems(
          filteredTagSet.length
            ? {
                ...rest,
                [checkboxName]: filteredTagSet,
              }
            : { ...rest },
        );
      }
    },
    [selectedItems],
  );

  const handleClose = React.useCallback(() => {
    if (isMobile) {
      setSelectedTagKey(undefined);
    }
    onClose();
  }, [isMobile, onClose]);

  const handleSelectAll = React.useCallback(
    (checked: boolean, _undefined, checkboxElement: HTMLInputElement) => {
      const checkboxName = checkboxElement.name;
      if (checked) {
        setSelectedItems(prevState => ({
          ...prevState,
          [checkboxElement.name]: tags[checkboxElement.name].map(
            item => `${checkboxName}:${item}`,
          ),
        }));
      } else {
        setSelectedItems(prevState => ({
          ...prevState,
          [checkboxElement.name]: [],
        }));
      }
    },
    [tags],
  );

  const handleDeselectAll = React.useCallback(() => {
    setSelectedItems({});
  }, []);

  const handleApply = React.useCallback(() => {
    onApply({ ...selectedItems });
    handleClose();
  }, [handleClose, onApply, selectedItems]);

  const itemElements = React.useMemo(
    () =>
      Object.entries(tags).map(tag => {
        const [key, value] = tag;
        const selectedTagsData = key ? selectedItems[key] ?? [] : [];

        const tagItemsData = value.map(item => {
          const checkboxLabelText =
            textKeyLabelsByTagset && textKeyLabelsByTagset[key]?.tags[item]
              ? intl.formatMessage({
                  id: textKeyLabelsByTagset[key]?.tags[item].textKey,
                })
              : item;
          return {
            label: checkboxLabelText,
            name: `${key}:${item}`,
            checked: selectedTagsData.includes(`${key}:${item}`),
          };
        });

        return (
          <div>
            <DialogTagSet
              key={`tag-set-${key}`}
              id={key}
              isSelected={Boolean(key === selectedTagKey)}
              onClick={() => handleClickTagSet(key)}
            >
              <DialogTagSetTitleWrapper>
                <>
                  <span>
                    {textKeyLabelsByTagset && textKeyLabelsByTagset[key]?.tagSet
                      ? intl.formatMessage({
                          id: textKeyLabelsByTagset[key].tagSet.textKey,
                        })
                      : key}
                  </span>
                  {selectedItems[key]?.length > 0 && (
                    <DialogTagSetCount>
                      {selectedItems[key].length}
                    </DialogTagSetCount>
                  )}
                </>
              </DialogTagSetTitleWrapper>
              <CollapseIconButton open={Boolean(opendItems[key])}>
                <ArrowIcon />
              </CollapseIconButton>
            </DialogTagSet>
            {opendItems[key] && (
              <DialogTagItemsWrapper>
                {isMobile && (
                  <Checkbox
                    key={`tagset-checkbox-${key}-all`}
                    wrapperStyle={FilterSelectAllCheckboxWrapperStyle}
                    label={`${intl.formatMessage({
                      id: "select_tag_dialog_select_all",
                    })}(${tags[key].length})`}
                    name={key}
                    element={{
                      type: "check-box-input",
                      initialChecked:
                        selectedTagsData.length === tags[key].length,
                    }}
                    checked={selectedTagsData.length === tags[key].length}
                    onChange={handleSelectAll}
                  />
                )}
                {tagItemsData.length
                  ? tagItemsData.map(item => (
                      <Checkbox
                        key={`tag-checkbox-${item.name}`}
                        wrapperStyle={FilterCheckboxWrapperStyle}
                        label={item.label}
                        name={item.name}
                        element={{
                          type: "check-box-input",
                          initialChecked: item.checked,
                        }}
                        checked={item.checked}
                        onChange={handleClick}
                      />
                    ))
                  : null}
              </DialogTagItemsWrapper>
            )}
          </div>
        );
      }),
    [
      handleClick,
      handleClickTagSet,
      handleSelectAll,
      intl,
      isMobile,
      opendItems,
      selectedItems,
      selectedTagKey,
      tags,
      textKeyLabelsByTagset,
    ],
  );

  return (
    <GroupFilterDialogWrapper>
      <GroupFilterContainer>
        <FilterDialogTagItemContainer>
          {itemElements}
        </FilterDialogTagItemContainer>
      </GroupFilterContainer>
      <DefaultDivider />
      <GroupFilterButtonContainer>
        <GroupFilterButton onClick={handleDeselectAll}>
          <FormattedMessage id="select_tag_dialog_deselect_all" />(
          {selectedAllItemsCount ?? 0})
        </GroupFilterButton>
        <GroupFilterButton onClick={handleApply}>
          <FormattedMessage id="ok_button" />
        </GroupFilterButton>
      </GroupFilterButtonContainer>
    </GroupFilterDialogWrapper>
  );
};
