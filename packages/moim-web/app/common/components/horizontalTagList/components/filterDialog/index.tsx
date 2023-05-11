import * as React from "react";
// types
import { ITextKeyLabelsTagset } from "../..";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import { TagSetDialog as Dialog } from "common/components/basicResponsiveDialog/styled";
import AppBar from "common/components/appBar";
import BottomSheet from "common/components/bottomSheet";
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import { FilterDialogTagItem } from "./components/tag";
// styled
import { CloseButton, BottomSheetWrapper } from "./styled";

interface IProps {
  tags: Record<string, string[]>;
  selectedTags: Record<string, string[]>;
  opendTagSets: Record<string, boolean>;
  textKeyLabelsByTagset?: Record<string, ITextKeyLabelsTagset>;
  groupFilterDialogOpen: boolean;
  onApply(data: Record<string, string[]>): void;
  onClose(): void;
}

const FilterDialog: React.FC<IProps> = ({
  tags,
  selectedTags,
  opendTagSets,
  textKeyLabelsByTagset,
  groupFilterDialogOpen,
  onApply,
  onClose,
}) => {
  const isMobile = useIsMobile();
  const handleClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      {isMobile ? (
        <BottomSheet
          open={groupFilterDialogOpen}
          minHeight={470}
          disableExpand={true}
          disableHandle={false}
          onCloseRequest={handleClose}
        >
          <BottomSheetWrapper>
            <FilterDialogTagItem
              tags={tags}
              selectedTags={selectedTags}
              opendTagSets={opendTagSets}
              textKeyLabelsByTagset={textKeyLabelsByTagset}
              onApply={onApply}
              onClose={handleClose}
            />
          </BottomSheetWrapper>
        </BottomSheet>
      ) : (
        <Dialog open={groupFilterDialogOpen} onClose={handleClose}>
          <CustomAppBarModalLayout
            appBar={<AppBar leftButton={<CloseButton onClick={onClose} />} />}
            hasAppBarBorder={false}
          >
            <FilterDialogTagItem
              tags={tags}
              selectedTags={selectedTags}
              opendTagSets={opendTagSets}
              textKeyLabelsByTagset={textKeyLabelsByTagset}
              onApply={onApply}
              onClose={handleClose}
            />
          </CustomAppBarModalLayout>
        </Dialog>
      )}
    </>
  );
};

export default FilterDialog;
