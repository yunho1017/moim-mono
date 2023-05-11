// vendor
import * as React from "react";
// component
import AppBar from "common/components/appBar";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import {
  MenuIcon,
  Title,
  LeftButtonWrapper,
  SmallDivider,
  LargeDivider,
  OptionsLabelsContainer,
  LabelsWrapper,
} from "./styled";
import HorizontalLabelList, {
  ILabel,
} from "common/components/horizontalLabelList";

import useIsMobile from "common/hooks/useIsMobile";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import useVisibleExpandSideNavigationButton from "common/hooks/useVisibleExpandSideNavigationButton";

interface IProps {
  tagName: string;
  displayTagSelector: boolean;
  tags: Moim.IPaginatedListResponse<Moim.Tag.IDenormalizedTag>;
  selectedLabels: ILabel[];
  visibleTopTabNavigation?: boolean;
  onJoinClick(moimUrl: string, moimId: Moim.Id): void;
  onChangeSelectedTags(tags: ILabel[]): void;
}

export default function Header({
  tagName,
  displayTagSelector,
  tags,
  selectedLabels,
  visibleTopTabNavigation,
  onChangeSelectedTags,
}: IProps) {
  const isMobile = useIsMobile();
  const { expandSideNavigation } = useSideNavigationPanel();
  const visibleExpandSideNavigationButton = useVisibleExpandSideNavigationButton();

  const tagLabels: ILabel[] = React.useMemo(
    () =>
      tags.data.map(tag => ({
        id: tag.id,
        text: tag.name,
        priority: tag.priority,
      })),
    [tags],
  );

  const handleLabelClick = React.useCallback(
    (label: ILabel) => {
      const sameLabel = selectedLabels.find(item => item.id === label.id);
      const newArray = Boolean(sameLabel)
        ? selectedLabels.filter(item => item.id !== label.id)
        : selectedLabels.concat(label);
      onChangeSelectedTags(newArray);
    },
    [selectedLabels, onChangeSelectedTags],
  );

  const leftElement = React.useMemo(
    () =>
      visibleExpandSideNavigationButton ? (
        <LeftButtonWrapper>
          <MenuIcon onClick={expandSideNavigation} />
        </LeftButtonWrapper>
      ) : null,
    [expandSideNavigation, visibleExpandSideNavigationButton],
  );

  const titleAlignment = React.useMemo(() => (isMobile ? "Center" : "Left"), [
    isMobile,
  ]);

  const labelListElement = React.useMemo(
    () =>
      Boolean(tags.data.length) &&
      displayTagSelector && (
        <LabelsWrapper>
          <HorizontalLabelList
            labels={tagLabels}
            selectedLabels={selectedLabels}
            onLabelClick={handleLabelClick}
          />
        </LabelsWrapper>
      ),
    [displayTagSelector, handleLabelClick, selectedLabels, tagLabels, tags],
  );

  return (
    <>
      {!visibleTopTabNavigation && (
        <AppBar
          titleElement={
            <Title>
              <NativeEmojiSafeText value={tagName} />
            </Title>
          }
          titleAlignment={titleAlignment}
          leftButton={leftElement}
        />
      )}
      <SmallDivider />
      <LargeDivider />
      <OptionsLabelsContainer>{labelListElement}</OptionsLabelsContainer>
    </>
  );
}
