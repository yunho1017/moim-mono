import styled from "styled-components";
import { BlockchainCurrencyTypes } from "app/enums/index";
import CurrencyFormatter from "common/components/currencyFormatter";
import { px2rem } from "common/helpers/rem";
import * as React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import AvatarArray from "./avatarArray";
import {
  AchieveCaption,
  AchieveTitle,
  Footer,
  Head,
  Participant,
  Progress,
  ProgressWrapper,
  Wrapper,
} from "./styled";
import CurrencyIcon from "common/components/currencyIcon";

interface IProps {
  status: Moim.Commerce.PRODUCT_STATUS;
  soldAmount: number;
  goalAmount: number;
  buyersCount: number;
  currency: string;
  buyers: Moim.Commerce.IPurchaseItemPurchase[];
}

const RaisedWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${px2rem(20)};
  gap: ${px2rem(6)};
`;

const FundProgress: React.FC<IProps> = ({
  status,
  soldAmount,
  goalAmount,
  buyersCount,
  currency,
  buyers,
}) => {
  const userIds = React.useMemo(() => buyers.map(i => i.userId), [buyers]);

  const achieveRate = React.useMemo(
    () => Math.round((soldAmount / goalAmount) * 100),
    [goalAmount, soldAmount],
  );

  const captionText = React.useMemo(() => {
    switch (status) {
      case "scheduled": {
        return (
          <FormattedMessage
            id="price_funding_goal"
            values={{
              goal: (
                <CurrencyFormatter currency={currency} value={goalAmount} />
              ),
            }}
          />
        );
      }
      case "onSale":
      case "soldOut":
      case "completed": {
        return (
          <FormattedMessage
            id="price_funding_percent_goal"
            values={{
              percent: achieveRate,
              goal: (
                <CurrencyFormatter currency={currency} value={goalAmount} />
              ),
            }}
          />
        );
      }
    }
  }, [achieveRate, currency, goalAmount, status]);

  const handleParticipantClick = React.useCallback(() => {
    const target = document.getElementById("fund-participant");
    if (target) {
      target.click();
    }
  }, []);

  return (
    <Wrapper>
      <Head>
        <div className="left">
          {status !== "scheduled" && (
            <AchieveTitle>
              {currency in BlockchainCurrencyTypes ? (
                <RaisedWrapper>
                  <CurrencyIcon
                    currency={
                      currency as Moim.Community.BlockchainCommunityCurrency
                    }
                  />
                  <CurrencyFormatter currency={currency} value={soldAmount} />
                </RaisedWrapper>
              ) : (
                <CurrencyFormatter currency={currency} value={soldAmount} />
              )}
            </AchieveTitle>
          )}
        </div>
        <div className="right">
          <AchieveCaption>{captionText}</AchieveCaption>
        </div>
      </Head>
      <ProgressWrapper>
        <Progress fillWidth={achieveRate} />
      </ProgressWrapper>
      {buyersCount > 0 && (
        <Footer>
          <div className="left">
            <Participant role="button" onClick={handleParticipantClick}>
              <FormattedMessage
                id="backers_count"
                values={{
                  formattedCount: (
                    <FormattedNumber value={buyersCount} useGrouping={true} />
                  ),
                  plain_count: buyersCount,
                }}
              />
            </Participant>
          </div>
          <div className="right">
            <AvatarArray userIds={userIds} onClick={handleParticipantClick} />
          </div>
        </Footer>
      )}
    </Wrapper>
  );
};

export default FundProgress;
