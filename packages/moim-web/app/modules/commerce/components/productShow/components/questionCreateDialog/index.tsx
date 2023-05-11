import * as React from "react";
import { useIntl } from "react-intl";
import useIsMobile from "common/hooks/useIsMobile";
import { SimpleDialogGroupInput } from "common/components/groupInput";
import { StyledOptionItem } from "./styled";

export interface IRef {
  open(): void;
}

interface IProps {
  id: Moim.Id;
  product: Moim.Commerce.IProduct;
  contents: Moim.Blockit.Blocks[];
  onPost(
    contents: Moim.Blockit.Blocks[],
    files: Moim.Blockit.IFileBlock[],
  ): void;
  onClose?(): void;
}

const QuestionCreateDialog = React.forwardRef<IRef | null, IProps>(
  ({ id, contents, product, onPost, onClose }, ref) => {
    const intl = useIntl();
    const isMobile = useIsMobile();
    const [open, setOpen] = React.useState(false);
    const handleOpen = React.useCallback(() => {
      setOpen(true);
    }, []);
    const handleClose = React.useCallback(() => {
      setOpen(false);
      onClose?.();
    }, [onClose]);

    const aboveElement = React.useMemo(
      () =>
        isMobile && (
          <StyledOptionItem
            sellerId="unkown"
            productId={id}
            productType={product.type}
            status="onSale"
            title={product.name}
            imageUrl={product.images}
            qty={1}
            price={product.price_price}
            originPrice={product.price_price}
            rawPrice={product.price}
            rawOriginPrice={product.price}
          >
            {({ Title: OptionTitle, defaultValue }) => (
              <>
                <OptionTitle>{defaultValue.title}</OptionTitle>
              </>
            )}
          </StyledOptionItem>
        ),
      [
        isMobile,
        id,
        product.type,
        product.images,
        product.name,
        product.price_price,
      ],
    );

    React.useImperativeHandle(ref, () => ({
      open: handleOpen,
    }));

    return (
      <SimpleDialogGroupInput
        id="question_editor_dialog"
        open={open}
        contents={contents}
        aboveInputElements={aboveElement}
        titleElement={intl.formatMessage({
          id: "product_show_qna_question_create_dialog_title",
        })}
        cancelAlertMessage={intl.formatMessage({
          id: "product_show_qna_question_create_dialog_cancel_message",
        })}
        postAlertMessage={intl.formatMessage({
          id: "product_show_qna_question_create_dialog_post_message",
        })}
        uploadLoadingAlertMessage={intl.formatMessage({
          id: "product_show_qna_question_create_dialog_upload_working_message",
        })}
        onPost={onPost}
        onClose={handleClose}
        onCancel={handleClose}
      />
    );
  },
);

export default QuestionCreateDialog;
