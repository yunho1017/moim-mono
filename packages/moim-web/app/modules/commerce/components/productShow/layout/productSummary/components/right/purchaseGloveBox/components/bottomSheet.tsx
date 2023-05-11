import * as React from "react";
import styled, { css } from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import BottomSheet, {
  IRefHandler as IBottomSheetRefHandler,
} from "common/components/bottomSheet";
import { DefaultDivider } from "common/components/divider";
import { Spacer } from "common/components/designSystem/spacer";
import useOpenState from "common/hooks/useOpenState";
import { H10BoldStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

const MobileInventoryTitle = styled.div`
  width: 100%;
  padding: ${px2rem(4)} 0;
  ${H10BoldStyle}
`;

const MobileInventoryContainer = styled.div`
  height: fit-height;
`;

const MobileProductOptionInventoryWrapper = styled.div<{
  isBottomSheetExpend?: boolean;
}>`
  width: 100%;

  padding: 0 ${px2rem(16)} ${px2rem(16)};

    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;

    div[class^="MobilePurchaseButtonContainer"] {
      padding: 0 0 ${px2rem(16)};
    }

    div[class^="ItemListWrapper"] {
      ${props =>
        props.isBottomSheetExpend &&
        css`
          max-height: inherit;
          height: 100%;
        `}
    }
  }
`;

export interface IRefHandler {
  open(): void;
  close(): void;
}
const ProductOptionInventoryElementBottomSheet = React.forwardRef<
  IRefHandler,
  React.PropsWithChildren<{ title: string }>
>(({ title, children }, ref) => {
  const bottomSheetRef = React.useRef<IBottomSheetRefHandler>(null);

  const { open, close, isOpen } = useOpenState();
  const [mobileInventoryHeight, setInventoryHeight] = React.useState<
    number | undefined
  >(undefined);

  const handleResizeInventory = React.useCallback((_, height) => {
    setInventoryHeight(height);
  }, []);

  React.useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <BottomSheet
      ref={bottomSheetRef}
      open={isOpen}
      keepContentMount={true}
      minHeight={mobileInventoryHeight}
      onCloseRequest={close}
    >
      <MobileInventoryContainer>
        <ReactResizeDetector
          handleHeight={true}
          onResize={handleResizeInventory}
        >
          <MobileProductOptionInventoryWrapper
            isBottomSheetExpend={bottomSheetRef.current?.isExpended}
          >
            <MobileInventoryTitle>{title}</MobileInventoryTitle>
            <Spacer value={8} />
            <DefaultDivider />
            <Spacer value={8} />
            {children}
          </MobileProductOptionInventoryWrapper>
        </ReactResizeDetector>
      </MobileInventoryContainer>
    </BottomSheet>
  );
});

export default React.memo(ProductOptionInventoryElementBottomSheet);
