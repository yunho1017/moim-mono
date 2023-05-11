import * as React from "react";
import styled, { css } from "styled-components";
import { CSSTransition } from "react-transition-group";
import { FormattedMessage } from "react-intl";
import SettingInput from "app/modules/settingMoim/components/settingInput";
import { Radio, Switch, Checkbox } from "common/components/designSystem/inputs";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { px2rem } from "common/helpers/rem";
import useGroupTexts from "common/hooks/useGroupTexts";
import useIsMobile from "common/hooks/useIsMobile";
import NotiIconOnBase from "@icon/24-noti-on-b.svg";

const InputTitleWrapper = styled.div<{ disabled: boolean }>`
  ${props =>
    props.disabled &&
    css`
      color: ${props.theme.colorV2.colorSet.grey200};
    `}
`;

const SettingInputWrapper = styled.div`
  padding-bottom: ${px2rem(16)};
`;

const NotiIconOn = styled(NotiIconOnBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

interface INotiServiceInputProps {
  checked: boolean;
  onChange: (
    option: Partial<
      Moim.INotificationDetailSetting<Partial<Moim.NotificationEnabled>>
    >,
  ) => void;
}

interface INotiServiceInputTemplateProps extends INotiServiceInputProps {
  titleKey: string;
  titleValues?: Record<string, any>;
  descriptionKey: string;
  descriptionValues?: Record<string, any>;
  targetField:
    | keyof Moim.INotificationDetailSetting<Partial<Moim.NotificationEnabled>>
    | (keyof Moim.INotificationDetailSetting<
        Partial<Moim.NotificationEnabled>
      >)[];
}

export const NotiServiceInputTemplate: React.FC<INotiServiceInputTemplateProps> = ({
  titleKey,
  titleValues,
  descriptionKey,
  descriptionValues,
  checked,
  targetField,
  onChange,
}) => {
  const isMobile = useIsMobile();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const newChecked = e.currentTarget.checked;

      if (checked !== newChecked) {
        if (Array.isArray(targetField)) {
          onChange(
            targetField.reduce<
              Partial<
                Moim.INotificationDetailSetting<
                  Partial<Moim.NotificationEnabled>
                >
              >
            >((result, current) => {
              result[current] = { web: newChecked };

              return result;
            }, {}),
          );
        } else {
          onChange({ [targetField]: { web: newChecked } });
        }
      }
    },
    [checked, onChange, targetField],
  );

  const inputElement = React.useMemo(
    () =>
      !isMobile ? (
        <Checkbox checked={checked} onChange={handleChange} />
      ) : (
        <Switch checked={checked} onChange={handleChange} />
      ),
    [checked, handleChange, isMobile],
  );

  return (
    <SettingInputWrapper>
      <SettingInput
        input={inputElement}
        direction="horizontal"
        title={
          <InputTitleWrapper disabled={!checked}>
            <FormattedMessage id={titleKey} values={titleValues} />
          </InputTitleWrapper>
        }
        description={
          <FormattedMessage id={descriptionKey} values={descriptionValues} />
        }
      />
    </SettingInputWrapper>
  );
};

const BodyContainer = styled.div`
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  padding: 0 ${px2rem(16)} ${px2rem(2)} ${px2rem(32)};
  margin: ${px2rem(16)} 0 0;
`;

const DirectMessageInput: React.FC<INotiServiceInputProps> = ({
  checked,
  onChange,
}) => (
  <NotiServiceInputTemplate
    key="notification_settings/receive_direct_messages"
    titleKey="notification_settings/receive_direct_messages"
    descriptionKey="notification_settings/receive_direct_messages_guide"
    targetField="directMessage"
    checked={checked}
    onChange={onChange}
  />
);

const MentionInput: React.FC<INotiServiceInputProps> = ({
  checked,
  onChange,
}) => (
  <NotiServiceInputTemplate
    key="notification_settings/receive_mentions_you"
    titleKey="notification_settings/receive_mentions_you"
    descriptionKey="notification_settings/receive_mentions_you_guide"
    targetField={["mention", "mentionOn1DepthThread", "mentionOn2DepthThread"]}
    checked={checked}
    onChange={onChange}
  />
);
const NewMessageInput: React.FC<INotiServiceInputProps> = ({
  checked,
  onChange,
}) => (
  <NotiServiceInputTemplate
    key="notification_settings/receive_new_messages"
    titleKey="notification_settings/receive_new_messages"
    descriptionKey="notification_settings/receive_new_messages_guide"
    targetField="newMessage"
    checked={checked}
    onChange={onChange}
  />
);
const NewPostInput: React.FC<INotiServiceInputProps> = ({
  checked,
  onChange,
}) => (
  <NotiServiceInputTemplate
    key="notification_settings/receive_new_posts"
    titleKey="notification_settings/receive_new_posts"
    descriptionKey="notification_settings/receive_new_posts_guide"
    targetField="newPost"
    checked={checked}
    onChange={onChange}
  />
);
const CommentInput: React.FC<INotiServiceInputProps> = ({
  checked,
  onChange,
}) => (
  <NotiServiceInputTemplate
    key="notification_settings/receive_comments_on_your_posts"
    titleKey="notification_settings/receive_comments_on_your_posts"
    descriptionKey="notification_settings/receive_comments_on_your_posts_guide"
    targetField="commentPost"
    checked={checked}
    onChange={onChange}
  />
);
const FollowingPostCommentInput: React.FC<INotiServiceInputProps> = ({
  checked,
  onChange,
}) => (
  <NotiServiceInputTemplate
    key="notification_settings/receive_comments_on_posts_you"
    titleKey="notification_settings/receive_comments_on_posts_you've_commented"
    descriptionKey="notification_settings/receive_comments_on_posts_you've_commented_guide"
    targetField="commentFollowingPost"
    checked={checked}
    onChange={onChange}
  />
);
const LikePostInput: React.FC<INotiServiceInputProps> = ({
  checked,
  onChange,
}) => (
  <NotiServiceInputTemplate
    key="notification_settings/receive_likes_your_posts"
    titleKey="notification_settings/receive_likes_your_posts"
    descriptionKey="notification_settings/receive_likes_your_posts_guide"
    targetField="likePost"
    checked={checked}
    onChange={onChange}
  />
);
const LikeCommentInput: React.FC<INotiServiceInputProps> = ({
  checked,
  onChange,
}) => (
  <NotiServiceInputTemplate
    key="notification_settings/receive_likes_your_comments"
    titleKey="notification_settings/receive_likes_your_comments"
    descriptionKey="notification_settings/receive_likes_your_comments_guide"
    targetField="likeComment"
    checked={checked}
    onChange={onChange}
  />
);

const LikeYourProductThreadInput: React.FC<INotiServiceInputProps> = ({
  checked,
  onChange,
}) => {
  const texts = useGroupTexts(
    "product_engagement_contents_1depth_thread_types",
  );

  return (
    <NotiServiceInputTemplate
      key="notification_settings_receive_likes_your_product_1depth_thread"
      titleKey="notification_settings_receive_likes_your_product_1depth_thread"
      titleValues={{
        product_engagement_contents_1depth_thread_types: texts?.plural,
      }}
      descriptionKey="notification_settings_receive_likes_your_product_1depth_thread_guide"
      descriptionValues={{
        product_engagement_contents_1depth_thread_types: texts?.plural,
      }}
      targetField="like1DepthProductThread"
      checked={checked}
      onChange={onChange}
    />
  );
};

const CommentYourProductThreadInput: React.FC<INotiServiceInputProps> = ({
  checked,
  onChange,
}) => {
  const thread1DepthTexts = useGroupTexts(
    "product_engagement_contents_1depth_thread_types",
  );
  const thread2DepthTexts = useGroupTexts(
    "product_engagement_contents_2depth_thread_types",
  );
  return (
    <NotiServiceInputTemplate
      key="notification_settings_receive_comments_on_your_product_1depth_thread"
      titleKey="notification_settings_receive_comments_on_your_product_1depth_thread"
      titleValues={{
        product_engagement_contents_1depth_thread_types:
          thread1DepthTexts?.singular,
        product_engagement_contents_2depth_thread_types:
          thread2DepthTexts?.singular,
      }}
      descriptionKey="notification_settings_receive_comments_on_your_product_1depth_thread_guide"
      descriptionValues={{
        product_engagement_contents_1depth_thread_types:
          thread1DepthTexts?.singular,
        product_engagement_contents_2depth_thread_types:
          thread2DepthTexts?.singular,
      }}
      targetField="new2DepthThread"
      checked={checked}
      onChange={onChange}
    />
  );
};

const LikeYourProduct2DepthThreadInput: React.FC<INotiServiceInputProps> = ({
  checked,
  onChange,
}) => {
  const thread1DepthTexts = useGroupTexts(
    "product_engagement_contents_1depth_thread_types",
  );
  const thread2DepthTexts = useGroupTexts(
    "product_engagement_contents_2depth_thread_types",
  );
  return (
    <NotiServiceInputTemplate
      key="notification_settings_receive_likes_your_product_2depth_thread"
      titleKey="notification_settings_receive_likes_your_product_2depth_thread"
      titleValues={{
        product_engagement_contents_2depth_thread_types:
          thread2DepthTexts?.plural,
      }}
      descriptionKey="notification_settings_receive_likes_your_product_2depth_thread_guide"
      descriptionValues={{
        product_engagement_contents_1depth_thread_types:
          thread1DepthTexts?.plural,
        product_engagement_contents_2depth_thread_types:
          thread2DepthTexts?.plural,
      }}
      targetField="like2DepthProductThread"
      checked={checked}
      onChange={onChange}
    />
  );
};

const CommentFollowProductThreadInput: React.FC<INotiServiceInputProps> = ({
  checked,
  onChange,
}) => {
  const thread1DepthTexts = useGroupTexts(
    "product_engagement_contents_1depth_thread_types",
  );
  const thread2DepthTexts = useGroupTexts(
    "product_engagement_contents_2depth_thread_types",
  );
  return (
    <NotiServiceInputTemplate
      key="notification_settings_receive_comments_on_product_1depth_thread_you_follow"
      titleKey="notification_settings_receive_comments_on_product_1depth_thread_you_follow"
      titleValues={{
        product_engagement_contents_1depth_thread_types:
          thread1DepthTexts?.plural,
        product_engagement_contents_2depth_thread_types:
          thread2DepthTexts?.singular,
      }}
      descriptionKey="notification_settings_receive_comments_on_product_1depth_thread_you_follow_guide"
      descriptionValues={{
        product_engagement_contents_1depth_thread_types:
          thread1DepthTexts?.plural,
        product_engagement_contents_2depth_thread_types:
          thread2DepthTexts?.singular,
      }}
      targetField="new2DepthThreadOnFollowing"
      checked={checked}
      onChange={onChange}
    />
  );
};

interface IThumbnailConfigInputProps {
  status: Moim.NotificationStatusType;
  alarmNotificationSetting: Moim.INotificationItem<Moim.NotificationEnabled>;
  onChangeStatus: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (
    option: Partial<
      Moim.INotificationDetailSetting<Partial<Moim.NotificationEnabled>>
    >,
  ) => void;
}

const NotifyMeInput: React.FC<IThumbnailConfigInputProps> = ({
  status,
  alarmNotificationSetting,
  onChange,
  onChangeStatus,
}) => {
  const currentGroup = useCurrentGroup();
  const commerceEnabled = Boolean(currentGroup?.seller_id);
  return (
    <>
      <SettingInput
        title={<FormattedMessage id="notification_settings/receive" />}
        description={
          <FormattedMessage id="notification_settings/receive_guide" />
        }
        input={
          <Radio
            name="notification_global"
            value="enable"
            defaultChecked={status === "enable"}
            onChange={onChangeStatus}
          />
        }
        direction="horizontal"
        rightPadding={16}
        leftIconElement={<NotiIconOn></NotiIconOn>}
      />

      <CSSTransition
        in={status === "enable"}
        timeout={300}
        classNames="bodyAnim"
        unmountOnExit={true}
      >
        <>
          <BodyContainer>
            <DirectMessageInput
              checked={alarmNotificationSetting.detailed.directMessage.web}
              onChange={onChange}
            />
            <MentionInput
              checked={
                alarmNotificationSetting.detailed.mention.web &&
                alarmNotificationSetting.detailed.mentionOn1DepthThread.web &&
                alarmNotificationSetting.detailed.mentionOn2DepthThread.web
              }
              onChange={onChange}
            />

            <NewMessageInput
              checked={alarmNotificationSetting.detailed.newMessage.web}
              onChange={onChange}
            />
            <NewPostInput
              checked={alarmNotificationSetting.detailed.newPost.web}
              onChange={onChange}
            />

            <CommentInput
              checked={alarmNotificationSetting.detailed.commentPost.web}
              onChange={onChange}
            />
            <FollowingPostCommentInput
              checked={
                alarmNotificationSetting.detailed.commentFollowingPost.web
              }
              onChange={onChange}
            />
            <LikePostInput
              checked={alarmNotificationSetting.detailed.likePost.web}
              onChange={onChange}
            />
            <LikeCommentInput
              checked={alarmNotificationSetting.detailed.likeComment.web}
              onChange={onChange}
            />

            {commerceEnabled && (
              <>
                <LikeYourProductThreadInput
                  checked={
                    alarmNotificationSetting.detailed.like1DepthProductThread
                      .web
                  }
                  onChange={onChange}
                />
                <CommentYourProductThreadInput
                  checked={
                    alarmNotificationSetting.detailed.new2DepthThread.web
                  }
                  onChange={onChange}
                />
                <LikeYourProduct2DepthThreadInput
                  checked={
                    alarmNotificationSetting.detailed.like2DepthProductThread
                      .web
                  }
                  onChange={onChange}
                />
                <CommentFollowProductThreadInput
                  checked={
                    alarmNotificationSetting.detailed.new2DepthThreadOnFollowing
                      .web
                  }
                  onChange={onChange}
                />
              </>
            )}
          </BodyContainer>
        </>
      </CSSTransition>
    </>
  );
};

export default NotifyMeInput;
