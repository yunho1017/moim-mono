import * as React from "react";
import { components } from "react-select";
import { IOption } from "../../type";

// TODO: (mono) fix here
// import Chip from "common/components/chips/preset/positionChip";
import Chip, { IChipOption } from "../../base/chip";

export default function MultiSelected(
  props: React.ComponentProps<typeof components.MultiValue>
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
              (option) => option.value !== data.value
            ),
            "remove-value"
          );
        }
        break;
    }
  }, [getValue, clearValue, isMulti, setValue, data.value]);

  const handleClickLabel: React.MouseEventHandler<HTMLSpanElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();

        handleDelete();
      },
      [handleDelete]
    );

  const inner = React.useMemo(() => {
    if (data.chipColor) {
      return (
        // TODO: (mono) fix here
        // <Chip
        //   size="large"
        //   id={data.value}
        //   color={data.chipColor}
        //   name={data.label}
        //   showDeleteButton={true}
        //   onDeleteClick={handleDelete}
        // />
        <Chip
          id={""}
          size={"s"}
          options={[]}
          onChangeSelect={function (index: number): void {
            throw new Error("Function not implemented.");
          }}
          children={function (
            option: IChipOption,
            checked: boolean,
            index: number
          ): React.ReactChild {
            throw new Error("Function not implemented.");
          }}
        />
      );
    }

    return <span onMouseDown={handleClickLabel}>{data.label}</span>;
  }, [data.chipColor, data.label, data.value, handleClickLabel, handleDelete]);

  return <components.MultiValue {...props}>{inner}</components.MultiValue>;
}
