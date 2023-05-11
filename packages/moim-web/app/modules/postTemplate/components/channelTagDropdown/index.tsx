import * as React from "react";
import styled, { css } from "styled-components";
import { FormattedMessage } from "react-intl";
import { CSSTransition } from "react-transition-group";
import UpArrowIcon from "@icon/18-uparrow-g.svg";
import DownArrowIcon from "@icon/18-downarrow-g.svg";
import { B4Regular } from "common/components/designSystem/typos";
import ChannelTag from "common/components/chips/preset/channelChip";
import { TextGeneralButton } from "common/components/designSystem/buttons";

import { px2rem } from "common/helpers/rem";
import {
  AddChannelTagDialogContext,
  DeleteChannelTagAlertContext,
  PostTemplateContext,
} from "../../context";

export const UpArrowButton = styled(UpArrowIcon).attrs(props => ({
  size: "xs",
  touch: 18,
  role: "button",
  iconColor: props.theme.colorV2.colorSet.grey600,
}))``;

export const DownArrowButton = styled(DownArrowIcon).attrs(props => ({
  size: "xs",
  touch: 18,
  role: "button",
  iconColor: props.theme.colorV2.colorSet.grey600,
}))``;

const Header = styled.div`
  width: 100%;
  height: ${px2rem(32)};
  display: flex;
  justify-content: space-between;
`;

const HeaderTitleWrapper = styled.div<{ disabled: boolean }>`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.4;
    `}
`;

const HeaderTitle = styled(B4Regular)`
  margin-left: ${px2rem(4)};
`;

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: ${px2rem(4)} 0 0 ${px2rem(-8)};
`;

const Wrapper = styled.div`
  width: 100%;
  padding: ${px2rem(16)} 0 ${px2rem(16)} ${px2rem(16)};
`;

interface IProps {
  disabled: boolean;
  channels?: Moim.Channel.SimpleChannelType[];
}

export default function ChannelTagDropdown({ channels, disabled }: IProps) {
  const { currentPostTemplate } = React.useContext(PostTemplateContext);
  const { open: addChannelTagDialogOpen } = React.useContext(
    AddChannelTagDialogContext,
  );
  const { open: deleteChannelAlertOpen } = React.useContext(
    DeleteChannelTagAlertContext,
  );
  const [isOpen, setIsOpen] = React.useState(Boolean(channels?.length));
  const handleClickDelete = React.useCallback((id: Moim.Id) => {
    deleteChannelAlertOpen(id);
  }, []);

  const handleClickHeader = React.useCallback(() => {
    if (!disabled) {
      setIsOpen(open => !open);
    }
  }, [disabled, setIsOpen]);

  React.useEffect(() => {
    if (currentPostTemplate) {
      setIsOpen(Boolean(currentPostTemplate.channelIds?.length));
    } else {
      setIsOpen(false);
    }
  }, [currentPostTemplate?.id]);

  return (
    <Wrapper>
      <Header>
        <HeaderTitleWrapper disabled={disabled} onClick={handleClickHeader}>
          {isOpen ? <UpArrowButton /> : <DownArrowButton />}
          <HeaderTitle>
            {disabled ? (
              <FormattedMessage id="admin_post_template/editor/applied_channels_new_title" />
            ) : !channels?.length ? (
              <FormattedMessage id="admin_post_template/editor/applied_channels_empty_title" />
            ) : (
              <FormattedMessage
                id="admin_post_template/editor/applied_channels_title"
                values={{ count: channels?.length }}
              />
            )}
          </HeaderTitle>
        </HeaderTitleWrapper>
        <TextGeneralButton
          size="s"
          onClick={addChannelTagDialogOpen}
          disabled={disabled}
        >
          <FormattedMessage id="button_add" />
        </TextGeneralButton>
      </Header>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="bodyAnim"
        unmountOnExit={true}
      >
        <Body>
          {channels
            ?.filter(i => Boolean(i))
            .map(channel => (
              <ChannelTag
                key={channel.id}
                id={channel.id}
                size="medium"
                title={channel.name}
                showDeleteButton={true}
                onDeleteClick={handleClickDelete}
              />
            ))}
        </Body>
      </CSSTransition>
    </Wrapper>
  );
}
