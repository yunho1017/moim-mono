import * as React from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import { RadioInputTemplate, IRadioInputProps, CheckBoxInput } from "../styled";
import { Spacer } from "common/components/designSystem/spacer";
// icons
import NotiOnIconBase from "@icon/24-noti-on-b.svg";
import NotiOffIconBase from "@icon/24-noti-off-b.svg";
import NotiNothingIconBase from "@icon/24-noti-nothing-b.svg";

import { px2rem } from "common/helpers/rem";

interface ICheckBoxTemplateProps {
  titleKey: string;
  checked: boolean;
  targetField: keyof Moim.INotificationDetailSetting<
    Partial<Moim.NotificationEnabled>
  >;
  meta: Moim.NotificationEnabled;
  onChange: (
    option: Partial<
      Moim.INotificationDetailSetting<Partial<Moim.NotificationEnabled>>
    >,
  ) => void;
}

interface ICheckBoxInputProps {
  checked: boolean;
  meta: Moim.NotificationEnabled;
  onChange: (
    option: Partial<
      Moim.INotificationDetailSetting<Partial<Moim.NotificationEnabled>>
    >,
  ) => void;
}
export const CheckBoxTemplate: React.FC<ICheckBoxTemplateProps> = ({
  titleKey,
  checked,
  meta,
  targetField,
  onChange,
}) => {
  const handleChange = React.useCallback(
    debounce((option: boolean) => {
      onChange({ [targetField]: { ...meta, web: option } });
    }, 300),
    [checked, onChange, meta, targetField],
  );

  return (
    <CheckBoxInput
      titleKey={titleKey}
      checked={checked}
      onChange={handleChange}
    />
  );
};

const NotiOnIcon = styled(NotiOnIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
const NotiOffIcon = styled(NotiOffIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
const NotiNothingIcon = styled(NotiNothingIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export function NotiOffInput({ status, onChange }: IRadioInputProps) {
  return (
    <>
      <RadioInputTemplate
        status={status}
        value="mute"
        titleKey="notification_settings/mute"
        descriptionKey="notification_settings/mute_guide"
        icon={<NotiOffIcon />}
        onChange={onChange}
      />
      <Spacer value={16} />
    </>
  );
}

export function NotiNothingInput({ status, onChange }: IRadioInputProps) {
  return (
    <>
      <RadioInputTemplate
        status={status}
        value="nothing"
        titleKey="notification_settings/nothing"
        descriptionKey="notification_settings/nothing_guide"
        icon={<NotiNothingIcon />}
        onChange={onChange}
      />
      <Spacer value={16} />
    </>
  );
}

export function NotiOnInput({ status, onChange }: IRadioInputProps) {
  return (
    <RadioInputTemplate
      status={status}
      value="enable"
      titleKey="notification_settings/receive"
      descriptionKey="notification_settings/receive_guide"
      icon={<NotiOnIcon />}
      onChange={onChange}
    />
  );
}

export const NotificationTypeInputWrapper = styled.div`
  width: 100%;
  margin: ${px2rem(24)} 0;
  padding-left: ${px2rem(16)};
`;

export const MentionInput: React.FC<ICheckBoxInputProps> = ({
  checked,
  meta,
  onChange,
}) => (
  <CheckBoxTemplate
    key="notification_settings/receive_mentions_you"
    titleKey="notification_settings/receive_mentions_you"
    targetField="mention"
    checked={checked}
    meta={meta}
    onChange={onChange}
  />
);
export const NewMessageInput: React.FC<ICheckBoxInputProps> = ({
  checked,
  meta,
  onChange,
}) => (
  <CheckBoxTemplate
    key="notification_settings/receive_new_messages"
    titleKey="notification_settings/receive_new_messages"
    targetField="newMessage"
    checked={checked}
    meta={meta}
    onChange={onChange}
  />
);
export const NewPostInput: React.FC<ICheckBoxInputProps> = ({
  checked,
  meta,
  onChange,
}) => (
  <CheckBoxTemplate
    key="notification_settings/receive_new_posts"
    titleKey="notification_settings/receive_new_posts"
    targetField="newPost"
    checked={checked}
    meta={meta}
    onChange={onChange}
  />
);
export const CommentInput: React.FC<ICheckBoxInputProps> = ({
  checked,
  meta,
  onChange,
}) => (
  <CheckBoxTemplate
    key="notification_settings/receive_comments_on_your_posts"
    titleKey="notification_settings/receive_comments_on_your_posts"
    targetField="commentPost"
    checked={checked}
    meta={meta}
    onChange={onChange}
  />
);
export const FollowingPostCommentInput: React.FC<ICheckBoxInputProps> = ({
  checked,
  meta,
  onChange,
}) => (
  <CheckBoxTemplate
    key="notification_settings/receive_comments_on_posts_you"
    titleKey="notification_settings/receive_comments_on_posts_you've_commented"
    targetField="commentFollowingPost"
    checked={checked}
    meta={meta}
    onChange={onChange}
  />
);
export const LikePostInput: React.FC<ICheckBoxInputProps> = ({
  checked,
  meta,
  onChange,
}) => (
  <CheckBoxTemplate
    key="notification_settings/receive_likes_your_posts"
    titleKey="notification_settings/receive_likes_your_posts"
    targetField="likePost"
    checked={checked}
    meta={meta}
    onChange={onChange}
  />
);
export const LikeCommentInput: React.FC<ICheckBoxInputProps> = ({
  checked,
  meta,
  onChange,
}) => (
  <CheckBoxTemplate
    key="notification_settings/receive_likes_your_comments"
    titleKey="notification_settings/receive_likes_your_comments"
    targetField="likeComment"
    checked={checked}
    meta={meta}
    onChange={onChange}
  />
);
