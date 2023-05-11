import * as React from "react";
import moment from "moment-timezone";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import {
  Wrapper,
  Left,
  Right,
  Row,
  LogDateLabel,
  Title,
  Description,
  CreditLabel,
  ExpirationLabel,
} from "./styled";
import CurrencyFormatter from "common/components/currencyFormatter";
import ShavedText from "common/components/shavedText";

const CreditHistory: React.FC<Moim.Commerce.ICreditHistoryItem> = ({
  event,
  amount,
  customTitle,
  sourceType,
  sourceUrl,
  currency,
  description,
  createdAt,
  expireAt,
}) => {
  const intl = useIntl();
  const logDate = React.useMemo(() => moment(createdAt).format("MM. DD"), [
    createdAt,
  ]);

  const expirationDate = React.useMemo(() => {
    if (expireAt) {
      const expireMoment = moment(expireAt);

      return intl.formatMessage(
        { id: "my_shopping/credit_history/expiration_dates" },
        {
          days: expireMoment.format("YY.MM.DD"),
        },
      );
    }
    return null;
  }, [expireAt, intl]);

  const creditTitleStatus = React.useMemo(() => {
    let title = customTitle ?? "";
    let colorType: "red" | "blue" | "black" = "black";
    let isPositive = false;

    switch (event) {
      case "received": {
        switch (sourceType) {
          case "purchaseItem": {
            title = intl.formatMessage({
              id: "my_shopping/credit_history/earning_buying",
            });
            break;
          }
          case "productReview": {
            title = intl.formatMessage({
              id: "my_shopping/credit_history/earning_review",
            });
            break;
          }
          case "promotion": {
            title = intl.formatMessage({
              id: "my_shopping/credit_history/earning_promotion",
            });
            break;
          }
          case "signUp": {
            title = intl.formatMessage({
              id: "my_shopping/credit_history/earning_sign_up_main",
            });
            break;
          }
          case "seller": {
            title = customTitle ?? "";
            break;
          }
        }

        colorType = "blue";
        isPositive = true;
        break;
      }

      case "used": {
        if (sourceType === "payment") {
          title = intl.formatMessage({
            id: "my_shopping/credit_history/use_payments",
          });
        }

        colorType = "red";
        isPositive = false;
        break;
      }

      case "expired": {
        title = intl.formatMessage({
          id: "my_shopping_credit_history_extinct",
        });
        colorType = "red";
        isPositive = false;
        break;
      }

      case "returned": {
        switch (sourceType) {
          case "refund": {
            title = intl.formatMessage({
              id: "my_shopping/credit_history/cancellation_payments",
            });
            colorType = "black";
            isPositive = true;
            break;
          }
        }
        break;
      }

      case "cancelled": {
        switch (sourceType) {
          case "purchaseItem": {
            title = intl.formatMessage({
              id: "my_shopping/credit_history/cancellation_buying",
            });
            colorType = "black";
            isPositive = false;
            break;
          }

          case "productReview": {
            title = intl.formatMessage({
              id: "my_shopping/credit_history/cancellation_review",
            });
            colorType = "black";
            isPositive = false;
            break;
          }
        }
        break;
      }

      // NOTE: 적립된걸 몰수하는 케이스는 아직 백엔드에서 작업되지 않았음.
      // case "productReview": {
      //   title = intl.formatMessage({
      //     id: "my_shopping/credit_history/cancellation_review",
      //   });
      //   colorType = "black";
      //   isPositive = false;
      //   break;
      // }
    }

    return {
      title,
      colorType,
      creditPrefix: isPositive && "+",
    };
  }, [customTitle, event, intl, sourceType]);

  const inner = React.useMemo(
    () => (
      <Wrapper>
        <Left>
          <LogDateLabel>{logDate}</LogDateLabel>
        </Left>
        <Right>
          <Row>
            <Title title={creditTitleStatus.title}>
              <ShavedText line={1} value={creditTitleStatus.title} />
            </Title>
            <CreditLabel colorType={creditTitleStatus.colorType}>
              {creditTitleStatus.creditPrefix}
              <CurrencyFormatter currency={currency} value={amount} />
            </CreditLabel>
          </Row>
          <Row>
            <Description>
              {event !== "expired" ? (
                description
              ) : (
                <FormattedMessage id="my_shopping_credit_history_extinct_expired" />
              )}
            </Description>
            {event !== "expired" && (
              <ExpirationLabel>{expirationDate}</ExpirationLabel>
            )}
          </Row>
        </Right>
      </Wrapper>
    ),
    [
      amount,
      creditTitleStatus.colorType,
      creditTitleStatus.creditPrefix,
      creditTitleStatus.title,
      currency,
      description,
      expirationDate,
      logDate,
    ],
  );

  if (sourceUrl) {
    return <Link to={sourceUrl}>{inner}</Link>;
  }
  return inner;
};

export default React.memo(CreditHistory);
