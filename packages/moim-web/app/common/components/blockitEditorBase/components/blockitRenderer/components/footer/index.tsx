import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import MoreButtonIconBase from "@icon/18-rightarrow-g.svg";
import { TextGeneralButton } from "common/components/designSystem/buttons";
import { Spacer } from "common/components/designSystem/spacer";

const MoreButtonIcon = styled(MoreButtonIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

const MoreButton = styled(TextGeneralButton).attrs({ size: "s" })`
  display: flex;
  width: 100%;
  padding: 0;
  align-items: flex-end;
  justify-content: flex-end;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

interface IProps {
  showMoreButton?: boolean;
  textKey?: string;
  textValues?: { [name: string]: string };
  onClickViewMore?(): void;
}

const BlockitFooter: React.FC<IProps> = ({
  showMoreButton,
  onClickViewMore,
  textKey,
  textValues,
}) => {
  if (!onClickViewMore || showMoreButton === false) {
    return null;
  }

  return (
    <>
      <MoreButton onClick={onClickViewMore}>
        <span>
          <FormattedMessage
            id={textKey ?? "button_see_more_content_group"}
            values={textValues}
          />
        </span>
        <MoreButtonIcon />
      </MoreButton>
      <Spacer value={8} />
    </>
  );
};

export default BlockitFooter;
