// vendor
import * as React from "react";
// component
import SettingCell from "../../../settingCell";
import SettingInput from "../../../settingInput";
import ShavedText from "common/components/shavedText";
import TagSelectDialog from "./dialog";
import { Wrapper, Title, RightArrowIcon } from "./styled";

interface IProps {
  tags: Moim.Tag.IDenormalizedTag[];
  selectedTags: Moim.Id[];
  title: string;
  label: string;
  guideMessage: string;
  onChange: (tags: string[]) => void;
}

function TagInput(props: IProps) {
  const { title, label, guideMessage, onChange, selectedTags, tags } = props;
  const selectedTagsValue = React.useMemo(
    () =>
      selectedTags.length
        ? selectedTags
            .map(tag => tags.find(target => target.id === tag)?.name || "")
            .join(", ")
        : label,
    [label, selectedTags, tags],
  );
  const [open, setOpen] = React.useState(false);
  const handleOpenDialog = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleCloseDialog = React.useCallback(() => {
    setOpen(false);
  }, []);
  const handleSubmit = React.useCallback(
    (selected: string[]) => {
      onChange(selected);
      handleCloseDialog();
    },
    [handleCloseDialog, onChange],
  );

  return (
    <SettingCell title={title} hasDivider={false}>
      <SettingInput
        input={
          <Wrapper onClick={handleOpenDialog}>
            <Title>
              <ShavedText value={selectedTagsValue} line={1} />
            </Title>
            <RightArrowIcon />
          </Wrapper>
        }
        direction="horizontal"
        description={guideMessage}
      />
      <TagSelectDialog
        open={open}
        title="어떤 가치와 관련이 있나요?"
        tags={tags}
        selectedTags={selectedTags}
        nextButtonText="완료"
        onSubmit={handleSubmit}
        onClose={handleCloseDialog}
      />
    </SettingCell>
  );
}

export default TagInput;
