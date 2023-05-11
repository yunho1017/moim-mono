// vendor
import * as React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { isEqual } from "lodash";
import { replace as replaceAction } from "connected-react-router";
// component
import ChannelTagDropdown from "../channelTagDropdown";
import { DefaultDivider } from "common/components/divider";
import ForumEditor, {
  IRef as IRefForumEditor,
} from "app/modules/forum/components/editor";
import AddChannelTagDialog from "../addChannelTagDialog";
import DeleteChannelTagAlert from "../deleteChannelTagAlert";
import { Spacer } from "common/components/designSystem/spacer";

import { useActions, useStoreState } from "app/store";
import useRedirect from "common/hooks/useRedirect";
import useCancelToken from "common/hooks/useCancelToken";

// helper
import { useScrollStyle } from "common/components/designSystem/styles";
import { px2rem } from "common/helpers/rem";
import { PostTemplateContext } from "../../context";
import { MEDIA_QUERY } from "common/constants/responsive";
import { MoimURL } from "common/helpers/url";
import { postPostTemplate, updatePostTemplate } from "app/actions/postTemplate";
import { channelListDenormalizer } from "app/models";

const Container = styled.div`
  width: 100%;
  height: 100%;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-top: ${px2rem(64)};
  }
  ${useScrollStyle}
`;

const MaxWidthPaper = styled.div<{ enableDesktopPadding?: boolean }>`
  max-width: ${px2rem(720)};
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  ${props => props.enableDesktopPadding && `padding: 0 ${px2rem(16)};`};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    max-width: none;
  }
`;

const emptyFunction = () => {};
interface IProps {
  mode: "new" | "edit";
}
function PostTemplateShow({ mode }: IProps) {
  const refForumEditor = React.useRef<IRefForumEditor>(null);
  const intl = useIntl();
  const cancelToken = useCancelToken();
  const redirect = useRedirect();
  const { currentPostTemplate } = React.useContext(PostTemplateContext);
  const [selectedChannelIds, setSelectedChannelIds] = React.useState<Moim.Id[]>(
    [],
  );

  const { selectedChannels, isLoading } = useStoreState(
    state => ({
      isLoading:
        mode === "new"
          ? state.postTemplate.postPostTemplateLoading
          : state.postTemplate.updatePostTemplateLoading,
      selectedChannels: channelListDenormalizer(
        { data: selectedChannelIds },
        state.entities,
      )?.data,
    }),
    (left, right) => isEqual(left, right),
  );
  const {
    replace,
    dispatchPostPostTemplate,
    dispatchUpdatePostTemplate,
  } = useActions({
    replace: replaceAction,
    dispatchPostPostTemplate: postPostTemplate,
    dispatchUpdatePostTemplate: updatePostTemplate,
  });

  const [title, setTitle] = React.useState<string>("");
  const [, setContent] = React.useState<Moim.Blockit.Blocks[]>([]);

  const handleChange = React.useCallback(
    (params: { title?: string; content?: Moim.Blockit.Blocks[] }) => {
      if (params.title) {
        setTitle(params.title);
      }
      if (params.content) {
        setContent(params.content);
      }
    },
    [],
  );

  const handleSave = React.useCallback(async () => {
    const cnt = refForumEditor.current?.refEditor?.getContent() ?? [];
    if (mode === "new") {
      const id = await dispatchPostPostTemplate(
        { title, content: cnt },
        {
          succeed: intl.formatMessage({ id: "save_success_toast_message" }),
          failed: intl.formatMessage({ id: "save_failure_toast_message" }),
        },
        cancelToken.current.token,
      );
      if (id) {
        setSelectedChannelIds([]);
        setTitle("");
        setContent([]);
        redirect(
          new MoimURL.PostTemplateShow({ postTemplateId: id }).toString(),
        );
      }
    } else {
      if (!currentPostTemplate) {
        return;
      }
      dispatchUpdatePostTemplate(
        { title, content: cnt, templateId: currentPostTemplate.id },
        {
          succeed: intl.formatMessage({ id: "save_success_toast_message" }),
          failed: intl.formatMessage({ id: "save_failure_toast_message" }),
        },
        cancelToken.current.token,
      );
    }
  }, [mode, dispatchPostPostTemplate, title]);

  const handleSaveAddChannelTag = React.useCallback(
    (ids: Moim.Id[]) => {
      if (!currentPostTemplate) {
        return;
      }

      const channelIds = Array.from(new Set(selectedChannelIds.concat(ids)));

      dispatchUpdatePostTemplate(
        { templateId: currentPostTemplate.id, channelIds },
        {
          succeed: intl.formatMessage({
            id: "channels_to_apply_template/toast_message_save_success",
          }),
          failed: intl.formatMessage({
            id: "channels_to_apply_template/toast_message_save_failure",
          }),
        },
        cancelToken.current.token,
      );
      setSelectedChannelIds(channelIds);
    },
    [selectedChannelIds, currentPostTemplate],
  );

  const handleDiscard = React.useCallback(() => {
    replace(MoimURL.PostTemplate.toString());
  }, [replace]);

  React.useEffect(() => {
    if (mode === "edit" && currentPostTemplate) {
      setTitle(currentPostTemplate.title);
      setContent(currentPostTemplate.content);
    }
  }, [currentPostTemplate?.id]);

  React.useEffect(() => {
    if (mode === "edit" && currentPostTemplate) {
      setSelectedChannelIds(currentPostTemplate.channelIds ?? []);
    }
  }, [currentPostTemplate?.channelIds]);

  React.useEffect(() => {
    if (mode === "new") {
      setSelectedChannelIds([]);
      setTitle("");
      setContent([]);
    }
  }, [mode]);

  return (
    <Container>
      <MaxWidthPaper>
        <ChannelTagDropdown
          channels={selectedChannels}
          disabled={mode === "new"}
        />
      </MaxWidthPaper>
      <DefaultDivider />
      <Spacer value={16} />
      <MaxWidthPaper>
        <ForumEditor
          ref={refForumEditor}
          id={
            mode === "new"
              ? mode
              : currentPostTemplate?.id.split(":").join("") ?? ""
          }
          isNewPost={mode === "new"}
          isDraftPost={false}
          visibleDraftButton={false}
          isModal={false}
          title={title}
          contents={currentPostTemplate?.content ?? []}
          tagSets={[]}
          selectedTagSetItemIds={[]}
          hasContent={mode !== "new"}
          titlePlaceholder={intl.formatMessage({
            id: "post_editor/title_input_field_placeholder",
          })}
          contentPlaceholder={intl.formatMessage({
            id: "post_editor/body_input_field_placeholder",
          })}
          isDraftSaving={false}
          isPosting={isLoading}
          preLinkMeeting={null}
          onChange={handleChange}
          onSave={handleSave}
          onDiscard={handleDiscard}
          onSaveDraft={emptyFunction}
          onOpenDraftList={emptyFunction}
        />
      </MaxWidthPaper>
      <AddChannelTagDialog onSave={handleSaveAddChannelTag} />
      <DeleteChannelTagAlert />
    </Container>
  );
}

export default PostTemplateShow;
