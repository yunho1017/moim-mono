import * as React from "react";
import { FormattedMessage, useIntl, FormattedNumber } from "react-intl";
import { defaultPagingListValue, TabLoadingWrapper } from ".";
import ProductQuestions from "../../../productThreadList/questions";
import QuestionCreateDialog, {
  IRef as IQuestionCreateDialogRef,
} from "../../components/questionCreateDialog";

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
import { useActions, useStoreState } from "app/store";
import { createProductQuestion } from "app/actions/commerce";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

interface IProps {
  titleKey: string;
  product: Moim.Commerce.IProduct | undefined;
  questions: Moim.IIndexedPagingList<string> | undefined;

  signCheckCallback(action: VoidFunction): void;
}

const QnATab: React.FC<IProps> = React.memo(
  ({ titleKey, product, questions, signCheckCallback }) => {
    const { cancelTokenSource } = useCancelTokenWithCancelHandler();
    const refQuestionCreateDialog = React.useRef<IQuestionCreateDialogRef>(
      null,
    );
    const { dispatchCreateProductQuestion } = useActions({
      dispatchCreateProductQuestion: createProductQuestion,
    });

    const handlePostQuestion = React.useCallback(
      (contents: Moim.Blockit.Blocks[], files: Moim.Blockit.IFileBlock[]) => {
        if (product) {
          AnalyticsClass.getInstance().questionShowWriteQuestionPublish({
            productId: product.id,
          });

          dispatchCreateProductQuestion(
            {
              type: "productQuestion",
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
      [dispatchCreateProductQuestion, cancelTokenSource, product],
    );

    const handleClickNewQuestion = React.useCallback(() => {
      AnalyticsClass.getInstance().questionShowWriteQuestionSelect({
        productId: product?.id ?? "",
      });

      signCheckCallback(() => {
        refQuestionCreateDialog.current?.open();
      });
    }, [signCheckCallback]);

    return (
      <>
        <Spacer value={40} />
        <Section>
          <SectionHead>
            <TitleContainer>
              <SectionTitle>
                <FormattedMessage id={titleKey} />
              </SectionTitle>
              <AddQuestionButton onClick={handleClickNewQuestion}>
                <FormattedMessage id="product_show/add_question_button" />
              </AddQuestionButton>
            </TitleContainer>
            <SectionSubTitle>
              <FormattedMessage
                id="product_show_qna_question_count"
                values={{
                  plain_count: questions?.total ?? 0,
                  formattedCount: (
                    <FormattedNumber
                      useGrouping={true}
                      value={questions?.total ?? 0}
                    />
                  ),
                }}
              />
            </SectionSubTitle>
          </SectionHead>
          <ProductQuestions
            productId={product?.id}
            sellerId={product?.sellerId}
            questions={questions ?? defaultPagingListValue}
          />
        </Section>
        {product && (
          <QuestionCreateDialog
            ref={refQuestionCreateDialog}
            id={product.id}
            product={product}
            contents={[]}
            onPost={handlePostQuestion}
          />
        )}
      </>
    );
  },
);

export default function useQnATab(
  isLoading: boolean | undefined,
  product: Moim.Commerce.IProduct | undefined,

  signCheckCallback: (action: VoidFunction) => void,
) {
  const intl = useIntl();
  const { questions } = useStoreState(state => ({
    questions: product?.id
      ? state.commerce.productQuestions[product?.id]
      : undefined,
  }));

  const titleKey = React.useMemo(() => {
    switch (product?.type) {
      case "fund":
        return "funding_show/qna_title";
      default:
      case "subscription":
      case "normal":
        return "product_show/tab_title_product_qna";
    }
  }, [product?.type]);

  return React.useMemo(() => {
    return {
      id: "qna",
      title: (
        <>
          {intl.formatMessage({
            id: titleKey,
          })}
          {questions?.total ? (
            <TabItemCountLabel>{questions?.total}</TabItemCountLabel>
          ) : (
            ""
          )}
        </>
      ),
      content: (
        <TabLoadingWrapper isLoading={isLoading}>
          <QnATab
            titleKey={titleKey}
            product={product}
            questions={questions}
            signCheckCallback={signCheckCallback}
          />
        </TabLoadingWrapper>
      ),
    };
  }, [intl, titleKey, questions, isLoading, product, signCheckCallback]);
}
