import * as React from "react";
import { components } from "react-select";

import Chip from "common/components/chips/preset/positionChip";
import { IOption } from "../../type";

export default function SingleSelected(
  props: React.ComponentProps<typeof components.SingleValue>,
) {
  const { data, isMulti, getValue, setValue, clearValue } = props;
  const handleDelete = React.useCallback(() => {
    const selected = getValue();
    if (!selected) {
      return;
    }

    switch (typeof selected) {
      case "string":
        clearValue();
        break;
      case "object":
        if (isMulti) {
          setValue(
            (selected as IOption[]).filter(
              option => option.value !== data.value,
            ),
            "remove-value",
          );
        }
        break;
    }
  }, [getValue, clearValue, isMulti, setValue, data.value]);

  const handleClickLabel: React.MouseEventHandler<HTMLSpanElement> = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();

      handleDelete();
    },
    [handleDelete],
  );

  const inner = React.useMemo(() => {
    if (data.chipColor) {
      return (
        <Chip
          size="large"
          id={data.value}
          color={data.chipColor}
          name={data.label}
          showDeleteButton={true}
          onDeleteClick={handleDelete}
        />
      );
    }

    return <span onMouseDown={handleClickLabel}>{data.label}</span>;
  }, [data.chipColor, data.label, data.value, handleClickLabel, handleDelete]);

  return <components.SingleValue {...props}>{inner}</components.SingleValue>;
}
