import * as React from "react";
import { FormattedMessage } from "react-intl";
// interface
import { ISuggestion } from ".";
// components
import { BaseItemCell } from "common/components/itemCell";
import UserProfileImage from "common/components/userProfileImage";
import { MarginSize } from "app/enums";
import {
  ItemContainer,
  LoudSpeakerIcon,
  CommandGuideText,
  TextWrapper,
} from "./styled";

interface IProps {
  suggestion: ISuggestion;
  isFocused: boolean;
  onClick?(suggestion: ISuggestion): void;
}

const SuggestionItem: React.FC<IProps> = ({
  suggestion,
  isFocused,
  onClick,
}) => {
  const refThis = React.useRef<HTMLLIElement>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      onClick?.(suggestion);
    },
    [onClick, suggestion],
  );

  const iconElement = React.useMemo(() => {
    if (suggestion.isCommand) {
      switch (suggestion.id) {
        case "everyone": {
          return <LoudSpeakerIcon />;
        }
      }
    }

    return (
      <UserProfileImage
        role="button"
        size="s"
        canOpenProfileDialog={false}
        userId={suggestion.id}
        src={suggestion.image}
      />
    );
  }, [suggestion.id, suggestion.image, suggestion.isCommand]);

  const title = React.useMemo(() => {
    if (suggestion.isCommand) {
      switch (suggestion.id) {
        case "everyone": {
          return (
            <>
              @{suggestion.text}
              <CommandGuideText>
                <FormattedMessage id="mention_everyone_guide" />
              </CommandGuideText>
            </>
          );
        }
      }
    }
    return suggestion.text;
  }, [suggestion.id, suggestion.isCommand, suggestion.text]);

  React.useLayoutEffect(() => {
    if (isFocused) {
      refThis.current?.scrollIntoView({
        block: "center",
      });
    }
  }, [isFocused]);

  return (
    <ItemContainer ref={refThis}>
      <button onClick={handleClick}>
        <BaseItemCell
          selected={isFocused}
          size="xs"
          title={<TextWrapper>{title}</TextWrapper>}
          leftElement={{
            element: iconElement,
            props: {
              leftContentsSize: "s",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
        />
      </button>
    </ItemContainer>
  );
};

export default React.memo(SuggestionItem);
