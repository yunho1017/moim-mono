import * as React from "react";
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import ProductComments from "../../../productThreadList/comments";
import FundCommentCreateDialog, {
  IRef as IFundCommentCreateDialogRef,
} from "../../components/fundCommentCreateDialog";
import {
  TitleContainer,
  SectionTitle,
  SectionSubTitle,
  Section,
  SectionHead,
  Spacer,
  AddQuestionButton,
  TabItemCountLabel,
} from "../../styled";
import { defaultPagingListValue, TabLoadingWrapper } from ".";
import { useActions, useStoreState } from "app/store";
import { createFundComment } from "app/actions/commerce";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";

interface IProps {
  product: Moim.Commerce.IProduct | undefined;
  signCheckCallback(action: VoidFunction): void;
}

const CommentTab: React.FC<IProps> = React.memo(
  ({ product, signCheckCallback }) => {
    const commentsCount = product?.commentsCount ?? 0;
    const { comments } = useStoreState(state => ({
      comments: product?.id
        ? state.commerce.productComments[product.id]
        : undefined,
    }));
    const refFundCommentCreateDialog = React.useRef<
      IFundCommentCreateDialogRef
    >(null);
    const { cancelTokenSource } = useCancelTokenWithCancelHandler();

    const { dispatchCreateFundComment } = useActions({
      dispatchCreateFundComment: createFundComment,
    });

    const handleClickNewComment = React.useCallback(() => {
      signCheckCallback(() => {
        refFundCommentCreateDialog.current?.open();
      });
    }, [signCheckCallback]);

    const handlePostFundComment = React.useCallback(
      (contents: Moim.Blockit.Blocks[], files: Moim.Blockit.IFileBlock[]) => {
        if (product) {
          dispatchCreateFundComment(
            {
              type: "productComment",
              channelId: product.sellerId,
              threadId: product.id,
              content: contents.concat(files),
              meta: {
                productId: product.id,
              },
            },
            cancelTokenSource.current.token,
          );
        }
      },
      [dispatchCreateFundComment, cancelTokenSource, product],
    );

    return (
      <>
        <Spacer value={40} />
        <Section>
          <SectionHead>
            <TitleContainer>
              <SectionTitle>
                <FormattedMessage id="funding_show/comments_title" />
              </SectionTitle>
              <AddQuestionButton onClick={handleClickNewComment}>
                <FormattedMessage id="button_write_a_comment" />
              </AddQuestionButton>
            </TitleContainer>
            <SectionSubTitle>
              <FormattedMessage
                id="funding_show/comments_count"
                values={{
                  plain_count: commentsCount,
                  formattedCount: (
                    <FormattedNumber useGrouping={true} value={commentsCount} />
                  ),
                }}
              />
            </SectionSubTitle>
          </SectionHead>
          <ProductComments
            productId={product?.id}
            sellerId={product?.sellerId}
            comments={comments ?? defaultPagingListValue}
          />
        </Section>
        <FundCommentCreateDialog
          ref={refFundCommentCreateDialog}
          contents={[]}
          onPost={handlePostFundComment}
        />
      </>
    );
  },
);

export default function useCommentTab(
  isLoading: boolean | undefined,
  product: Moim.Commerce.IProduct | undefined,

  signCheckCallback: (action: VoidFunction) => void,
) {
  const intl = useIntl();

  return React.useMemo(
    () => ({
      id: "comment",
      title: (
        <>
          {intl.formatMessage({
            id: "funding_show/comments_title",
          })}
          {product?.commentsCount ? (
            <TabItemCountLabel>{product?.commentsCount}</TabItemCountLabel>
          ) : (
            ""
          )}
        </>
      ),
      content: (
        <TabLoadingWrapper isLoading={isLoading}>
          <CommentTab product={product} signCheckCallback={signCheckCallback} />
        </TabLoadingWrapper>
      ),
    }),
    [intl, isLoading, product, signCheckCallback],
  );
}
