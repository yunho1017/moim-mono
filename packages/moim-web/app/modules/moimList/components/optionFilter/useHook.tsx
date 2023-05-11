import * as React from "react";
import { IProps } from ".";

type OptionLabel = Partial<Moim.Group.IGroupSortingOption> & {
  displayTextKey: string;
};

export function useProps(props: IProps) {
  const { options } = props;
  const [selectedOption, setSelectedOption] = React.useState(0);
  const refWrapper = React.useRef<HTMLDivElement>(null);
  const [open, setOpenStatus] = React.useState(false);

  const optionLabels: OptionLabel[] = React.useMemo(
    () =>
      options
        .filter(opt => !(opt.sort === "sortKey" && opt.order === "asc"))
        .map(opt => {
          let displayTextKey = "sort_by_recommended";
          switch (opt.sort) {
            case "createdAt": {
              displayTextKey =
                opt.order === "asc"
                  ? "sort_by_oldest_created"
                  : "sort_by_newest_created";
              break;
            }
            case "sortKey": {
              displayTextKey = "sort_by_recommended";
              break;
            }
            case "latestAt": {
              displayTextKey =
                opt.order === "asc"
                  ? "sort_by_oldest_updated"
                  : "sort_by_newest_updated";
              break;
            }
          }

          return {
            ...opt,
            displayTextKey,
          };
        }),
    [options],
  );

  return {
    ...props,
    refWrapper,
    open,
    setOpenStatus,
    optionLabels,
    selectedOption,
    setSelectedOption,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const { options, setOpenStatus, setSelectedOption, onChangeOption } = props;

  const handleOpen = React.useCallback(() => {
    setOpenStatus(true);
  }, [setOpenStatus]);

  const handleClose = React.useCallback(() => {
    setOpenStatus(false);
  }, [setOpenStatus]);

  const handleMenuClick: React.MouseEventHandler<HTMLLIElement> = React.useCallback(
    e => {
      const currentIndex = e.currentTarget.dataset.menuIndex;
      if (currentIndex !== undefined) {
        const index = parseInt(currentIndex, 10);
        setSelectedOption(index);
        onChangeOption(options[index]);
      }
      handleClose();
    },
    [handleClose, onChangeOption, options, setSelectedOption],
  );

  return {
    ...props,
    handleMenuClick,
    handleOpen,
    handleClose,
  };
}
