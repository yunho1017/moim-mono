import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import AppBarModalLayout from "common/components/modalLayout/appbar";
import {
  NextButton,
  Wrapper,
  StickyWrapper,
  SearchInputWrapper,
  CloseButton,
  appBarStyle,
  Divider,
} from "./styled";
import { SelectableSearchInput } from "common/components/searchInput";
import { FixedHeightBasicDialog } from "common/components/basicResponsiveDialog";
import ChannelList from "./channelList";
import { DefaultDivider } from "common/components/divider";
import { AddChannelTagDialogContext } from "../../context";
import { useStoreState } from "app/store";
import { channelListDenormalizer } from "app/models";

interface IProps {
  onSave(ChannelIds: Moim.Id[]): void;
}

export default function AddChannelTagDialog({ onSave }: IProps) {
  const intl = useIntl();
  const { isOpen, close } = React.useContext(AddChannelTagDialogContext);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const selectedListRef = React.useRef<HTMLInputElement>(null);
  const [selectedChannelIds, setSelectedChannelIds] = React.useState<Moim.Id[]>(
    [],
  );
  const [search, setSearch] = React.useState<string>("");
  const { isLoading, selectedChannels } = useStoreState(state => ({
    isLoading: state.postTemplate.updatePostTemplateLoading,
    selectedChannels: channelListDenormalizer(
      { data: selectedChannelIds },
      state.entities,
    )?.data.map(channel => ({ id: channel.id, name: channel.name })),
  }));
  const handleClose = React.useCallback(() => {
    close();
    setSelectedChannelIds([]);
  }, [setSelectedChannelIds, close]);

  const handleSave = React.useCallback(() => {
    onSave(selectedChannelIds);
    handleClose();
  }, [onSave, handleClose, selectedChannelIds]);

  const handleSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.currentTarget.value;
      setSearch(searchValue);
    },
    [setSearch],
  );

  const handleClickSelectedItem = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  const isSelected = React.useCallback(
    (id: Moim.Id) => Boolean(selectedChannelIds.includes(id)),
    [selectedChannelIds],
  );

  const selectChannel = React.useCallback((id: Moim.Id) => {
    setSelectedChannelIds(selected => [...selected, id]);

    requestAnimationFrame(() => {
      if (selectedListRef.current) {
        selectedListRef.current.scrollTo({
          top:
            selectedListRef.current.scrollHeight -
            selectedListRef.current.clientHeight,
        });
      }
    });
  }, []);

  const unselectChannel = React.useCallback((unselectId: Moim.Id) => {
    setSelectedChannelIds(selected =>
      selected.filter(selectedData => selectedData !== unselectId),
    );
  }, []);

  const handleClickRemoveButton = React.useCallback((id: Moim.Id) => {
    unselectChannel(id);
  }, []);

  const handleClickChannel = React.useCallback(
    (userId: Moim.Id) => {
      if (isSelected(userId)) {
        unselectChannel(userId);
      } else {
        selectChannel(userId);
      }
    },
    [isSelected, unselectChannel, selectChannel],
  );

  return (
    <FixedHeightBasicDialog open={isOpen} onClose={handleClose}>
      <AppBarModalLayout
        title={<FormattedMessage id="channels_to_apply_template/page_title" />}
        leftElement={<CloseButton onClick={handleClose} />}
        actionButton={
          <NextButton
            onClick={handleSave}
            isActive={Boolean(selectedChannelIds.length)}
            isLoading={isLoading}
          >
            <FormattedMessage id="button_apply" />
          </NextButton>
        }
        headerWrapperStyle={appBarStyle}
      >
        <Wrapper>
          <StickyWrapper>
            <SearchInputWrapper>
              <SelectableSearchInput
                ref={inputRef}
                value={search}
                selectedListRef={selectedListRef}
                type="text"
                selected={selectedChannels}
                placeholder={intl.formatMessage({
                  id: "channels_to_apply_template/search_placeholder",
                })}
                onChange={handleSearch}
                onClickSelectedItem={handleClickSelectedItem}
                onClickSelectedItemRemoveButton={handleClickRemoveButton}
              />
            </SearchInputWrapper>
            <DefaultDivider />
          </StickyWrapper>
          <Divider />
          <ChannelList
            isSelected={isSelected}
            onSelected={handleClickChannel}
          />
        </Wrapper>
      </AppBarModalLayout>
    </FixedHeightBasicDialog>
  );
}
