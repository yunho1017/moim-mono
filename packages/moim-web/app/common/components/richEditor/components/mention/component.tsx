import * as React from "react";
import { createPortal } from "react-dom";
import { PopperPlacementType } from "@mui/material/Popper";
import { DefaultLoader as Loader } from "common/components/loading";
import FreezeView from "common/components/freezeView";
import SuggestionItem from "./item";
import { MentionWrapper, Inner, LoadingWrapper } from "./styled";
import useIsMobile from "app/common/hooks/useIsMobile";
import { isiOS } from "common/helpers/browserDetect";

export interface ISuggestion {
  id: string;
  text: string;
  image: string;
  isCommand?: boolean;
}

interface IProps {
  isLoading: boolean;
  isOpen: boolean;
  suggestions: ISuggestion[];
  anchor: HTMLElement | null;
  anchorPosition: { top: number; left: number };
  focusedItemIdx: number;
  mentionPlacement?: PopperPlacementType;
  enableSingleLine?: boolean;
  disablePortal?: boolean;
  mentionPortalContainer?: HTMLElement | null;
  onSuggestionClick(suggestion: ISuggestion): void;
}

const MentionComponent: React.FC<IProps> = ({
  isLoading,
  isOpen,
  focusedItemIdx,
  suggestions,
  anchor,
  anchorPosition,
  mentionPlacement,
  enableSingleLine,
  disablePortal,
  mentionPortalContainer,
  onSuggestionClick,
}) => {
  const isMobile = useIsMobile();
  const disablePortalStatus = React.useMemo(
    () => (enableSingleLine && isiOS() ? false : disablePortal),
    [disablePortal, enableSingleLine]
  );

  const suggestionItemElements = React.useMemo(
    () =>
      isLoading ? (
        <LoadingWrapper>
          <Loader />
        </LoadingWrapper>
      ) : (
        suggestions.map((suggestion, idx) => {
          const isFocused = !isMobile && focusedItemIdx === idx;
          return (
            <SuggestionItem
              key={suggestion.id}
              suggestion={suggestion}
              isFocused={isFocused}
              onClick={onSuggestionClick}
            />
          );
        })
      ),
    [focusedItemIdx, onSuggestionClick, isLoading, isMobile, suggestions]
  );

  const mainElement = React.useMemo(
    () => (
      <MentionWrapper
        role="dialog"
        anchorEl={anchor}
        keepMounted={false}
        needScroll={suggestions.length > 3}
        open={isOpen && Boolean(suggestions.length)}
        placement={
          mentionPlacement ?? enableSingleLine ? "auto-start" : "bottom-start"
        }
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [
                  anchorPosition.left,
                  enableSingleLine
                    ? -(anchorPosition.top < 10 ? anchorPosition.top : 0)
                    : 0,
                ],
              },
            },
          ],
        }}
        enableSingleLine={enableSingleLine}
        isMobile={isMobile}
        disablePortal={disablePortalStatus}
      >
        <FreezeView isFreeze={isOpen} delayedFreeze={50}>
          <Inner>{suggestionItemElements}</Inner>
        </FreezeView>
      </MentionWrapper>
    ),
    [
      anchor,
      anchorPosition.left,
      anchorPosition.top,
      disablePortalStatus,
      enableSingleLine,
      isMobile,
      isOpen,
      mentionPlacement,
      suggestionItemElements,
      suggestions.length,
    ]
  );

  if (!disablePortalStatus && mentionPortalContainer) {
    return createPortal(mainElement, mentionPortalContainer);
  } else {
    return mainElement;
  }
};

export default React.memo(MentionComponent);
