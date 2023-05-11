import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import CurrentGroupProfile from "app/modules/layout/components/topNavigation/desktop/components/elements/currentGroupProfile";
import Profile from "./components/profile";
import { useStoreState, useActions } from "app/store";
import { filteredChannelByIdSelector } from "app/selectors/channel";
import { getWriteableChannels as getChannelsAction } from "app/actions/channel";
import useIsMobile from "common/hooks/useIsMobile";
import useOpenState from "common/hooks/useOpenState";

import TemplateChannelChangeAlertDialog from "../templateChannelChangeAlertDialog";
import { replace } from "connected-react-router";
import SelectionChip, {
  IChipOption,
  IRef as IRefSelection,
} from "common/components/designSystem/selection/base/chip";
import {
  Wrapper,
  Left,
  Right,
  CloseButton,
  SaveButton,
  SaveDraftButton,
  InnerDivider,
  PreviewShowButton,
  ChannelOptionWrapper,
  ChannelOptionName,
  CheckIcon,
  selectWrapper,
  selectInnerWrapper,
} from "./styled";

interface IProps {
  from?: Moim.Id; // channel id
  draftCount: number;
  disableDraftButton: boolean;
  hasContent: boolean;
  isEditMode: boolean;
  isBodyContentChanged: React.RefObject<boolean>;
  disableProfile?: boolean;
  disableChannelSelect?: boolean;
  onClickSave(): Promise<void>;
  onClickClose(): void;
  onChangeSelectChannel(channelId: Moim.Id): void;
  onClickSaveDraft(): Promise<void>;
  onClickDraftDialog(): void;
  onTemplateChangeAlertPositiveClick(): void;

  // TBD
  onClickPreview?(): void;
}

const TopNavBar: React.FC<IProps> = ({
  from,
  draftCount,
  disableDraftButton,
  hasContent,
  isEditMode,
  isBodyContentChanged,
  disableProfile,
  disableChannelSelect,
  onClickSaveDraft,
  onClickDraftDialog,
  onClickSave,
  onClickClose,
  onClickPreview,
  onChangeSelectChannel,
  onTemplateChangeAlertPositiveClick,
}) => {
  const intl = useIntl();
  const isMobile = useIsMobile();
  const refSelection = React.useRef<IRefSelection>(null);
  const refTmpChannelId = React.useRef<Moim.Id | undefined>(undefined);
  const [channelIds, setChannels] = React.useState<Moim.Id[]>([]);
  const [draftSaved, setDraftSaveActioned] = React.useState(false);
  const [draftSaveStatus, setDraftStatus] = React.useState<"success" | "fail">(
    "success",
  );
  const [isDraftSaving, setDraftSaveStatus] = React.useState<boolean>(false);
  const [isSaving, setSaveStatus] = React.useState<boolean>(false);
  const [userSelected, setUserSelected] = React.useState(Boolean(from));
  const { getChannels, replaceUrl } = useActions({
    getChannels: getChannelsAction,
    replaceUrl: replace,
  });
  const forumChannels = useStoreState(
    state =>
      filteredChannelByIdSelector(state, channelIds, [
        "forum",
      ]) as Moim.Channel.SimpleChannelWithoutCategoryType[],
  );

  const {
    isOpen: isOpenTemplateChangeDialog,
    open: openTemplateChangeDialog,
    close: closeTemplateChangeDialog,
  } = useOpenState();

  const channelOptions: IChipOption[] = React.useMemo(
    () =>
      forumChannels.map(channel => ({
        label: channel.name,
        value: channel.id,
      })),
    [forumChannels],
  );

  const handleChannelSelectChange = React.useCallback(
    (optionIndex: number) => {
      const channelId = channelOptions[optionIndex].value;

      onChangeSelectChannel(channelId);
      setUserSelected(true);
    },
    [channelOptions, onChangeSelectChannel],
  );

  const initialCheckedOptionPosition = React.useMemo(
    () => channelOptions.findIndex(o => o.value === from),
    [channelOptions, from],
  );

  const handleClickDraftSave = React.useCallback(() => {
    setDraftSaveStatus(true);
    onClickSaveDraft()
      .then(() => {
        setDraftStatus("success");
      })
      .catch(() => {
        setDraftStatus("fail");
      })
      .finally(() => {
        setDraftSaveStatus(false);
      });
  }, [onClickSaveDraft]);

  const handleClickSave = React.useCallback(() => {
    setSaveStatus(true);
    onClickSave()
      .then(() => {
        setDraftStatus("success");
      })
      .catch(() => {
        setDraftStatus("fail");
      })
      .finally(() => {
        setSaveStatus(false);
      });
  }, [onClickSave]);

  const doAnimChange = React.useCallback(() => {
    setTimeout(() => {
      setDraftSaveActioned(false);
    }, 2000);
  }, []);

  const handleDiscardAlertPositiveClick = React.useCallback(() => {
    if (refTmpChannelId.current) {
      const position = channelOptions.findIndex(
        o => o.value === refTmpChannelId.current,
      );
      refSelection.current?.setSelectedItemPosition(position);
      onTemplateChangeAlertPositiveClick();
      onChangeSelectChannel(refTmpChannelId.current);
      setUserSelected(true);
    }
    refTmpChannelId.current = undefined;
    closeTemplateChangeDialog();
  }, [onChangeSelectChannel, channelOptions]);

  const handleDiscardAlertClose = React.useCallback(() => {
    refTmpChannelId.current = undefined;
    closeTemplateChangeDialog();
  }, []);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      const id = e.currentTarget.dataset.id;
      const forumChannel = forumChannels.find(ch => ch.id === id) as
        | Moim.Channel.IForumSimpleChannel
        | undefined;

      if (Boolean(forumChannel?.thread_template_ids)) {
        if (isBodyContentChanged.current) {
          e.preventDefault();
          e.stopPropagation();
          refSelection.current?.close();
          refTmpChannelId.current = id;
          openTemplateChangeDialog();
        }
        const url = new URL(location.href);
        url.searchParams.delete("draft");
        replaceUrl({
          pathname: url.pathname,
          search: url.search,
        });
      }
    },
    [forumChannels, isBodyContentChanged],
  );

  React.useEffect(() => {
    if (isDraftSaving && !draftSaved) {
      setDraftSaveActioned(true);
    } else if (!isDraftSaving && draftSaved) {
      doAnimChange();
    }
  }, [doAnimChange, draftSaved, isDraftSaving]);

  React.useEffect(() => {
    if (from) {
      onChangeSelectChannel(from);
    }
  }, [from]);

  React.useEffect(() => {
    getChannels().then((channels?: Moim.Id[]) => {
      if (channels) {
        setChannels(channels);
      }
    });
  }, []);

  return (
    <>
      <Wrapper>
        <Left>
          <CurrentGroupProfile logoHeight={34} />
        </Left>
        <Right>
          {!disableChannelSelect && (
            <SelectionChip
              ref={refSelection}
              id="chanel-selector"
              size="l"
              disabled={isEditMode}
              options={channelOptions}
              initialSelectOptionPosition={initialCheckedOptionPosition}
              placeholder={intl.formatMessage({
                id: "post_editor_channel_select_placeholder",
              })}
              overrideWrapperStyle={selectWrapper}
              overrideInnerWrapperStyle={selectInnerWrapper}
              onChangeSelect={handleChannelSelectChange}
            >
              {(option, checked) => (
                <ChannelOptionWrapper
                  key={option.value}
                  checked={checked}
                  data-id={option.value}
                  onClick={handleClick}
                >
                  <ChannelOptionName>{option.label}</ChannelOptionName>
                  <CheckIcon />
                </ChannelOptionWrapper>
              )}
            </SelectionChip>
          )}
          {false && (
            <PreviewShowButton onClick={onClickPreview}>
              Preview
            </PreviewShowButton>
          )}
          {!disableDraftButton && (
            <SaveDraftButton waiting={isDraftSaving}>
              <span onClick={handleClickDraftSave}>
                <FormattedMessage
                  id={
                    !draftSaved
                      ? "post_editor/save_draft"
                      : draftSaveStatus === "success"
                      ? "post_editor/saved"
                      : "post_editor/failed"
                  }
                />
              </span>
              {draftCount > 0 && (
                <span onClick={onClickDraftDialog}>
                  {" "}
                  <InnerDivider /> {draftCount}
                </span>
              )}
            </SaveDraftButton>
          )}

          <SaveButton
            disabled={
              !hasContent || disableChannelSelect ? false : !userSelected
            }
            waiting={isSaving}
            onClick={handleClickSave}
          >
            <FormattedMessage id="save_button" />
          </SaveButton>
          <CloseButton onClick={onClickClose}>
            <FormattedMessage id="cancel_button" />
          </CloseButton>

          {!isMobile && !disableProfile && <Profile />}
        </Right>
      </Wrapper>

      <TemplateChannelChangeAlertDialog
        open={isOpenTemplateChangeDialog}
        onPositiveClick={handleDiscardAlertPositiveClick}
        onNegativeClick={handleDiscardAlertClose}
        onClose={handleDiscardAlertClose}
      />
    </>
  );
};

export default React.memo(TopNavBar);
