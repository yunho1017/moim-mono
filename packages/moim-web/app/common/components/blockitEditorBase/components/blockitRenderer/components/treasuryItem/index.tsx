import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { useActions, useStoreState } from "app/store";
// hooks
import { useRedirectToMoimURL } from "common/hooks/useSecondaryView";
// helpers
import { MoimURL } from "common/helpers/url";
import { TreasuryProvider } from "app/modules/treasury/context";
import { withPlacement } from "../../hoc/withPlacement";
import { getTreasuryItem as getTreasuryItemAction } from "app/actions/treasury";
// styled
import { TreasuryItemWrapper } from "./styled";
// components
import BlockitFooter from "../footer";
import BlockitHeader from "../header";
import Skeleton from "./skeleton";
import TreasuryItemBody from "./components/content";
import InViewTrigger from "../inViewTrigger";

interface IProps extends Omit<Moim.Blockit.ITreasuryItemBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
  footer?: Moim.Blockit.IBaseFooter;
}

const TreasuryItem: React.FC<IProps> = ({
  resourceId,
  showConfig,
  header,
  footer,
}) => {
  const [isLoading, setLoadingStatus] = React.useState<
    boolean | null | undefined
  >(undefined);
  const redirect = useRedirectToMoimURL();

  const { dispatchGetItem } = useActions({
    dispatchGetItem: getTreasuryItemAction,
  });

  const item = useStoreState(state => state.entities.treasuryItems[resourceId]);

  const handleTreasuryShowPage = () => {
    redirect(
      new MoimURL.TreasuryShow({
        treasuryId: resourceId,
      }).toString(),
    );
  };

  const handleGetData = React.useCallback(async () => {
    try {
      await dispatchGetItem(resourceId);
      setLoadingStatus(false);
    } catch {
      setLoadingStatus(null);
    }
  }, [dispatchGetItem, resourceId]);

  const handleOnView = React.useCallback(() => {
    if (isLoading === undefined) {
      handleGetData();
    }
  }, [handleGetData, isLoading]);

  return (
    <TreasuryProvider>
      <InViewTrigger onVisible={handleOnView} />
      {isLoading !== false || !item ? (
        <Skeleton />
      ) : (
        <TreasuryItemWrapper>
          <BlockitHeader
            title={header?.title}
            description={header?.description}
            showTitle={header?.showTitle ?? false}
            showDescription={header?.showDescription ?? false}
            showMoreButton={header?.showMoreButton ?? false}
            onClickViewMore={handleTreasuryShowPage}
          />
          <TreasuryItemBody
            item={item}
            showConfig={showConfig}
            onRetry={handleGetData}
            onClickViewMore={handleTreasuryShowPage}
          />
          <BlockitFooter
            showMoreButton={footer?.showMoreButton ?? false}
            textKey={"button_see_more_nft_group"}
            onClickViewMore={handleTreasuryShowPage}
          />
        </TreasuryItemWrapper>
      )}
    </TreasuryProvider>
  );
};

export default withPlacement(React.memo(TreasuryItem));
