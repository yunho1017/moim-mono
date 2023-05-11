import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useStoreState, useActions } from "app/store";
import useRedirect from "common/hooks/useRedirect";
import {
  ActionCreators as CommerceActionCreators,
  createProductReview,
} from "app/actions/commerce";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import { ReviewDialogGroupInput } from "common/components/groupInput";
import { MoimURL } from "common/helpers/url";

interface IProps {}

const ReviewCreateDialog: React.FC<IProps> = ({}) => {
  const intl = useIntl();
  const {
    cancelTokenSource: postReviewCancelTokenSource,
  } = useCancelTokenWithCancelHandler();
  const { reviewWriteDialog } = useStoreState(state => ({
    reviewWriteDialog: state.commercePage.reviewWriterDialog,
  }));
  const redirect = useRedirect();
  const { dispatchPostReview, closeReviewWriteDialog } = useActions({
    dispatchPostReview: createProductReview,
    closeReviewWriteDialog: CommerceActionCreators.closeReviewWriteDialog,
  });

  const handlePostReview = React.useCallback(
    async (
      contents: Moim.Blockit.Blocks[],
      files: Moim.Blockit.IFileBlock[],
      rate: number,
    ) => {
      const { sellerId, productId, purchaseId, meta } = reviewWriteDialog;
      if (sellerId && productId && meta?.purchaseItem) {
        const review = await dispatchPostReview(
          purchaseId,
          meta.purchaseItem.id,
          {
            channelId: sellerId,
            threadId: productId,
            content: contents.concat(files),
            type: "productReview",

            rate,
            meta,
          },
          postReviewCancelTokenSource.current.token,
        );

        if (review) {
          redirect(
            new MoimURL.CommerceProductShowReview({
              id: productId,
              threadId: review.id,
            }).toString(),
          );
        }
      }
    },
    [
      dispatchPostReview,
      redirect,
      postReviewCancelTokenSource,
      reviewWriteDialog,
    ],
  );

  return (
    <ReviewDialogGroupInput
      mode={reviewWriteDialog.mode}
      open={reviewWriteDialog.open}
      id={`reviewDialog_${reviewWriteDialog.productId}_${
        reviewWriteDialog.reviewId ? reviewWriteDialog.reviewId : "new"
      }`}
      meta={reviewWriteDialog.meta}
      titleElement={<FormattedMessage id="write_review_page_title" />}
      contents={[]}
      rate={0}
      disableRate={true}
      cancelAlertMessage={intl.formatMessage({
        id: "review_write/new_leave_alert",
      })}
      postAlertMessage={intl.formatMessage({
        id: "review_write/new_post_alert",
      })}
      uploadLoadingAlertMessage={intl.formatMessage({
        id: "review_write/upload_working_alert",
      })}
      onPost={handlePostReview}
      onCancel={closeReviewWriteDialog}
      onClose={closeReviewWriteDialog}
    />
  );
};

export default ReviewCreateDialog;
