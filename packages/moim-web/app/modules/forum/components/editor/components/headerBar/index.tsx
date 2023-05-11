import * as React from "react";
import { css } from "styled-components";
import { FormattedMessage } from "react-intl";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
import { px2rem } from "common/helpers/rem";
import { isiOS } from "common/helpers/browserDetect";
import { useIsPostShowModalView } from "app/modules/forum/hooks/useHooks";
// icons
import CloseIcon from "@icon/24-close-b.svg";
// components
import AppBar from "common/components/appBar";
import { FlatButton } from "common/components/designSystem/buttons";
import { TopNaviPortalContainer } from "app/modules/layout/components/controller/topNaviPortal/index";
import {
  Wrapper,
  RightWrapper,
  ButtonWrapper,
  DraftButton,
  DraftSaveButton,
  appBarStyle,
} from "./styledComponents";

interface IProps {
  canSave: boolean;
  isPosting: boolean;
  isDraftSaving: boolean;
  isNewPost: boolean;
  isDraftPost: boolean;
  visibleDraftButton?: boolean;
  draftCount?: number;
  title?: React.ReactNode;
  contentStickyPosition?: number;
  contentScrollDirection?: "up" | "down" | null;
  onSave(): void;
  onDiscard(): void;
  onOpenDraftList(): void;
  onSaveDraft(): void;
}

const HeaderBar: React.FC<IProps> = ({
  title,
  canSave,
  isPosting,
  isDraftSaving,
  contentStickyPosition,
  contentScrollDirection,
  draftCount,
  isNewPost,
  isDraftPost,
  visibleDraftButton = true,
  onSave,
  onDiscard,
  onSaveDraft,
  onOpenDraftList,
}) => {
  const isMobile = useIsMobile();
  const [draftSaved, setDraftSavedStatus] = React.useState(false);
  const postShowModalView = useIsPostShowModalView();

  const draftSaveDisableStatus = React.useMemo(() => {
    if (isNewPost) {
      return false;
    }
    return !isDraftPost || (isDraftPost && !canSave);
  }, [canSave, isDraftPost, isNewPost]);

  const saveDraftButton = React.useMemo(
    () => (
      <ButtonWrapper>
        <DraftSaveButton
          key="draft_button"
          size="s"
          onClick={onSaveDraft}
          waiting={isDraftSaving}
          disabled={draftSaveDisableStatus}
        >
          <FormattedMessage
            id={!draftSaved ? "post_editor/save_draft" : "post_editor/saved"}
          />
        </DraftSaveButton>
      </ButtonWrapper>
    ),
    [draftSaveDisableStatus, draftSaved, isDraftSaving, onSaveDraft],
  );

  const leftElement = React.useMemo(
    () =>
      isMobile ? (
        <CloseIcon size="s" touch={44} onClick={onDiscard} role="button" />
      ) : (
        undefined
      ),
    [isMobile, onDiscard],
  );
  const rightElement = React.useMemo(() => {
    const elements = [
      <ButtonWrapper>
        <FlatButton
          key="save_button"
          size="s"
          onClick={onSave}
          waiting={isPosting}
          disabled={!canSave}
        >
          <FormattedMessage id="post_editor/post_publish" />
        </FlatButton>
      </ButtonWrapper>,
    ];

    if (visibleDraftButton) {
      elements.unshift(saveDraftButton);
    }

    if (draftCount) {
      elements.unshift(
        <ButtonWrapper>
          <DraftButton key="draft_button" size="s" onClick={onOpenDraftList}>
            <FormattedMessage
              id="post_editor/draft_list"
              values={{ count: draftCount > 99 ? "99+" : draftCount }}
            />
          </DraftButton>
        </ButtonWrapper>,
      );
    }

    return elements;
  }, [
    onSave,
    isPosting,
    canSave,
    saveDraftButton,
    draftCount,
    visibleDraftButton,
    onOpenDraftList,
  ]);

  const wrapperStyle = React.useMemo(() => {
    if (isiOS()) {
      return css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      `;
    }
    if (postShowModalView || (isMobile && !isiOS())) {
      return css`
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        opacity: ${contentScrollDirection === "up" ? 0 : 1};
        ${postShowModalView &&
          css`
            border-top-left-radius: ${px2rem(8)};
            border-top-right-radius: ${px2rem(8)};
          `}
      `;
    } else if (contentStickyPosition && contentStickyPosition >= 0) {
      return css`
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
      `;
    } else {
      return undefined;
    }
  }, [
    postShowModalView,
    isMobile,
    contentStickyPosition,
    contentScrollDirection,
  ]);

  const appBarElement = React.useMemo(
    () => (
      <AppBar
        titleElement={title ?? ""}
        leftButton={leftElement}
        wrapperStickyStyle={appBarStyle(postShowModalView)}
        rightButton={<RightWrapper>{rightElement}</RightWrapper>}
      />
    ),
    [leftElement, postShowModalView, rightElement, title],
  );

  const doAnimChange = React.useCallback(() => {
    setTimeout(() => {
      setDraftSavedStatus(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    if (isDraftSaving && !draftSaved) {
      setDraftSavedStatus(true);
    } else if (!isDraftSaving && draftSaved) {
      doAnimChange();
    }
  }, [doAnimChange, draftSaved, isDraftSaving]);

  if (isMobile) {
    return (
      <TopNaviPortalContainer>
        <Wrapper wrapperStyle={wrapperStyle}>{appBarElement}</Wrapper>
      </TopNaviPortalContainer>
    );
  } else {
    return <Wrapper wrapperStyle={wrapperStyle}>{appBarElement}</Wrapper>;
  }
};

export default HeaderBar;
