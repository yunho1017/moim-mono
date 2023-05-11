import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
// typed
import { ITextKeyLabelsTagset } from "common/components/horizontalTagList";
// components
import Checkbox from "common/components/blockitEditorBase/components/blockitRenderer/components/inputs/checkbox/index";
import ResponsiveMenu from "common/components/responsiveMenu";
// styled
import {
  TagItemsWrapper,
  TagItems,
  WrapperStyle,
  PopoverStyle,
  TagItemsBarWrapper,
  SelectButton,
} from "./styled";

interface IProps {
  tagItems: string[];
  tagSetKey: string;
  isOpened: boolean;
  selectedTagKey?: string;
  selectedTagsByKey?: string[];
  textKeyLabels?: ITextKeyLabelsTagset;
  anchorElement?: null | Element | ((element: Element) => Element);
  onSelectTag(checked: boolean, checkboxElement: HTMLInputElement): void;
  onSelectAllByTagSet(TagSetkey?: string): void;
  onDeselectAllByTagSet(TagSetkey?: string): void;
  getOpenStatus(status: boolean): void;
}

export const NFTTagItem: React.FC<IProps> = ({
  tagSetKey,
  tagItems,
  isOpened,
  selectedTagKey,
  selectedTagsByKey,
  textKeyLabels,
  anchorElement,
  onSelectTag,
  onSelectAllByTagSet,
  onDeselectAllByTagSet,
  getOpenStatus,
}) => {
  const intl = useIntl();

  const handleClose = React.useCallback(() => {
    getOpenStatus(false);
  }, [getOpenStatus]);

  const tagItemsData = React.useMemo(() => {
    const selectedTagsData = selectedTagsByKey ?? [];

    return tagItems.map(item => ({
      label: item,
      name: `${tagSetKey}:${item}`,
      checked: selectedTagsData.includes(`${tagSetKey}:${item}`),
    }));
  }, [selectedTagsByKey, tagItems, tagSetKey]);

  const handleClickCheckbox = React.useCallback(
    (checked: boolean, _undefined, checkboxElement: HTMLInputElement) => {
      onSelectTag(checked, checkboxElement);
    },
    [onSelectTag],
  );

  const itemElement = React.useMemo(
    () =>
      tagItemsData.map(item => {
        const labelText =
          textKeyLabels && textKeyLabels.tags[item.label]
            ? intl.formatMessage({
                id: textKeyLabels.tags[item.label].textKey,
              })
            : item.label;

        return (
          <Checkbox
            wrapperStyle={WrapperStyle}
            label={labelText}
            name={item.name}
            element={{
              type: "check-box-input",
              initialChecked: false,
            }}
            checked={item.checked}
            onChange={handleClickCheckbox}
          />
        );
      }),
    [handleClickCheckbox, intl, tagItemsData, textKeyLabels],
  );

  return (
    <ResponsiveMenu
      open={isOpened}
      anchorElement={anchorElement}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      minHeight={320}
      paperOverrideStyle={PopoverStyle}
      onCloseRequest={handleClose}
    >
      <TagItemsWrapper>
        <TagItems>{itemElement}</TagItems>
        <TagItemsBarWrapper>
          <SelectButton onClick={() => onDeselectAllByTagSet(selectedTagKey)}>
            <FormattedMessage id="select_tag_dialog_deselect_all" />
          </SelectButton>
          <SelectButton onClick={() => onSelectAllByTagSet(selectedTagKey)}>
            <FormattedMessage id="select_tag_dialog_select_all" />
          </SelectButton>
        </TagItemsBarWrapper>
      </TagItemsWrapper>
    </ResponsiveMenu>
  );
};
