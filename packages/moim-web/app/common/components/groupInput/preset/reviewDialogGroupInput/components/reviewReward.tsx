import React from "react";
import styled from "styled-components";

import { B4Regular } from "common/components/designSystem/typos";
import CurrencyFormatter from "common/components/currencyFormatter";

import useHubSeller from "common/hooks/commerce/useHubSeller";
import { useIntlShort } from "common/hooks/useIntlShort";

import { px2rem } from "common/helpers/rem";

const Wrapper = styled(B4Regular)`
  color: ${props => props.theme.color.cobalt800};
  padding: ${px2rem(2)} ${px2rem(16)};
`;

const ReviewReward: React.FC<{ className?: string }> = ({ className }) => {
  const seller = useHubSeller();
  const intl = useIntlShort();

  const inner = React.useMemo(() => {
    const onWriteProductReview = seller?.creditCase?.onWriteProductReview;
    switch (onWriteProductReview?.policy) {
      case "normal":
        return intl("write_review_reward_info_same", {
          credits: (
            <CurrencyFormatter
              currency={seller?.currency}
              value={onWriteProductReview.basic}
            />
          ),
        });
      case "textOrMedia":
        return intl("write_review_reward_info_media", {
          credits1: (
            <CurrencyFormatter
              currency={seller?.currency}
              value={onWriteProductReview.text}
            />
          ),
          credits2: (
            <CurrencyFormatter
              currency={seller?.currency}
              value={onWriteProductReview.media}
            />
          ),
        });
      case "textOrImageOrVideo":
        return intl("write_review_reward_info_image_video", {
          credits1: (
            <CurrencyFormatter
              currency={seller?.currency}
              value={onWriteProductReview.text}
            />
          ),
          credits2: (
            <CurrencyFormatter
              currency={seller?.currency}
              value={onWriteProductReview.image}
            />
          ),
          credits3: (
            <CurrencyFormatter
              currency={seller?.currency}
              value={onWriteProductReview.video}
            />
          ),
        });
      default:
        return null;
    }
  }, [seller?.creditCase?.onWriteProductReview, seller?.currency]);

  if (!inner) {
    return null;
  }
  return <Wrapper className={className}>{inner}</Wrapper>;
};

export default React.memo(ReviewReward);
