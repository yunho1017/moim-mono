import * as React from "react";
import AppBarModalLayout from "common/components/modalLayout/appbar";
import TagItem from "./tagItem";
import {
  NextButton,
  Wrapper,
  ListWrapper,
  CloseButton,
  appBarStyle,
  Divider,
  StickyWrapper,
} from "./styled";
import BasicResponsiveDialog from "common/components/basicResponsiveDialog";

import { useEffects, useHandlers, useProps } from "./hooks";

export interface IProps {
  open: boolean;
  title: string;
  tags: Moim.Tag.IDenormalizedTag[];
  selectedTags: Moim.Id[];
  nextButtonText: string;
  onSubmit(tags: Moim.Id[]): void;
  onClose(): void;
}

export default function TagSelectDialog(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  useEffects(hookProps, hookHandlers);

  const { title, open, nextButtonText, tags, onClose, canNext } = hookProps;

  const { handleClickNextButton, handleClickTag, isSelected } = hookHandlers;

  return (
    <BasicResponsiveDialog open={open} onClose={onClose}>
      <AppBarModalLayout
        title={title}
        leftElement={<CloseButton onClick={onClose} />}
        actionButton={
          <NextButton onClick={handleClickNextButton} disabled={!canNext}>
            {nextButtonText}
          </NextButton>
        }
        headerWrapperStyle={appBarStyle}
      >
        <Wrapper>
          <StickyWrapper>
            <Divider />
          </StickyWrapper>
          <ListWrapper>
            {tags.map(tag => (
              <TagItem
                tag={tag}
                isSelected={isSelected(tag.id)}
                onClick={handleClickTag}
              />
            ))}
          </ListWrapper>
        </Wrapper>
      </AppBarModalLayout>
    </BasicResponsiveDialog>
  );
}
