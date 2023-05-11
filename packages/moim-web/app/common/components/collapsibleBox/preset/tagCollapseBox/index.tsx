import * as React from "react";
import CollapsibleBox from "common/components/collapsibleBox";
import {
  TagChip,
  HeaderWrapperStyle,
  TagsContainer,
  TitleContainer,
  Title,
  SelectCountWrapper,
  SelectCount,
} from "./styled";

interface IProps {
  initialOpen?: boolean;
  tags: Moim.TagSet.ITagItem[];
  selectedTags: Moim.Id[];
  title: React.ReactNode;
  onClickItem(tagItem: Moim.TagSet.ITagItem): void;
}

const TagCollapseBox: React.FC<IProps> = ({
  initialOpen = false,
  title,
  tags,
  selectedTags,
  onClickItem,
}) => {
  const [open, setOpen] = React.useState(false);
  const toggleOpen = React.useCallback(() => {
    setOpen(!open);
  }, [open]);

  const tagsElement = React.useMemo(
    () =>
      tags.map(item => {
        const selected = selectedTags.includes(item.id);
        return (
          <TagChip
            key={item.id}
            size="medium"
            expanded={true}
            tagItem={item}
            selected={selected}
            onClick={onClickItem}
          />
        );
      }),
    [onClickItem, selectedTags, tags],
  );

  React.useLayoutEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

  return (
    <CollapsibleBox
      open={open}
      title={
        <TitleContainer>
          <Title>{title}</Title>
          {selectedTags.length > 0 && (
            <SelectCountWrapper>
              <SelectCount>{selectedTags.length}</SelectCount>
            </SelectCountWrapper>
          )}
        </TitleContainer>
      }
      iconSize={24}
      headerWrapperStyle={HeaderWrapperStyle}
      onOpen={toggleOpen}
      onClose={toggleOpen}
    >
      <TagsContainer>{tagsElement}</TagsContainer>
    </CollapsibleBox>
  );
};

export default TagCollapseBox;
