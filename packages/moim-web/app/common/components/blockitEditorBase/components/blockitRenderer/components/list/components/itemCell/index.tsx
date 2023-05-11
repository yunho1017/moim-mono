import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { useProps, useHandlers } from "./useHooks";
// components
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import Texts from "../../../texts";
import LetterImage from "./letterAvatar";
import {
  CommonTextsWrapStyle,
  Wrapper,
  Left,
  Body,
  Right,
  Title,
  Description,
} from "./styled";

export interface IProps extends Omit<Moim.Blockit.IItemCellBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const ItemCellBlock: React.FC<IProps> = props => {
  const {
    role,
    align,
    size,
    title,
    avatarUrl,
    shortSizeChar,
    bottomDescription,
    rightDescription,
    handleClick,
  } = useHandlers(useProps(props));

  const bottomDescriptionElement = React.useMemo(
    () =>
      bottomDescription && Boolean(bottomDescription.content) ? (
        <Description>
          <Texts
            wrapperStyle={CommonTextsWrapStyle}
            color={bottomDescription.color}
            content={bottomDescription.content}
            fontStyle="caption"
          />
        </Description>
      ) : null,
    [bottomDescription],
  );

  const rightElement = React.useMemo(
    () =>
      rightDescription ? (
        <Right>
          <Texts
            {...rightDescription}
            wrapperStyle={CommonTextsWrapStyle}
            fontStyle={rightDescription.subType}
          />
        </Right>
      ) : null,
    [rightDescription],
  );

  const imageElement = React.useMemo(
    () => (
      <LetterImage
        size={shortSizeChar}
        url={avatarUrl}
        letter={title.content?.charAt(0) || ""}
      />
    ),
    [avatarUrl, shortSizeChar, title.content],
  );

  return (
    <Wrapper role={role} size={size} align={align} onClick={handleClick}>
      <Left>{imageElement}</Left>
      <Body>
        <Title>
          <Texts
            wrapperStyle={CommonTextsWrapStyle}
            color={title.color}
            fontStyle={title.subType || "body2"}
            content={
              <ShavedText
                line={1}
                value={
                  <NativeEmojiSafeText
                    role="button"
                    value={title.content || ""}
                  />
                }
              />
            }
          />
        </Title>
        {bottomDescriptionElement}
      </Body>
      {rightElement}
    </Wrapper>
  );
};

export default ItemCellBlock;
