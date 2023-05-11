import * as React from "react";
import { TagItemWrapper, TagTitle } from "./styled";

import { Checkbox } from "common/components/designSystem/inputs";

export default function TagItem({
  tag,
  isSelected,
  onClick,
}: {
  tag: Moim.Tag.IDenormalizedTag;
  isSelected: boolean;
  onClick(tag: Moim.Id): void;
}) {
  const handleClick = React.useCallback(() => {
    onClick(tag.id);
  }, [tag, onClick]);

  return (
    <TagItemWrapper onClick={handleClick}>
      <TagTitle>{tag.name}</TagTitle>
      <Checkbox name="tagSelectInput" value={tag.id} checked={isSelected} />
    </TagItemWrapper>
  );
}
