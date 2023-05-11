import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
// helper
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import User from "./components/user";
import { Wrapper } from "common/components/userProfileImage/styledComponents";
import { Spacer } from "common/components/designSystem/spacer";
import { H9Bold } from "common/components/designSystem/typos";
import { SkeletonBox, SkeletonCircleBox } from "common/components/skeleton";
import { UserSkeleton } from "../../tabs/owners/components/components/skeleton";
// style
import { SeeAllButton } from "../../styled";

import { NFTCollectionShowContext } from "../../context";

const MAX_COUNT = 15;
const CURRENT_TAB_ID = "owners";

export const HolderListWrapper = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(24)} 0 0;
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
    border-radius: ${px2rem(8)};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
`;
const HolderListContainer = styled.div`
  padding: 0 ${px2rem(2)};
`;

const SectionTitle = styled(H9Bold)`
  padding: 0 ${px2rem(24)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
`;

const MobileHolderListWrapper = styled.div`
  display: flex;
  padding: 0 0 ${px2rem(8)} ${px2rem(6)};
  ${Wrapper} {
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
    margin-left: ${px2rem(-6)};
    border-radius: 100%;
  }
  ${SkeletonBox} {
    margin-left: ${px2rem(-6)};
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    display: none;
  }
`;

interface IProps {
  isLoading?: boolean | null;
  setSelectedTabId?(value: string): void;
}

const HolderList: React.FC<IProps> = ({
  isLoading,
  setSelectedTabId,
}: IProps) => {
  const isMobile = useIsMobile();
  const { owners } = React.useContext(NFTCollectionShowContext);

  const ownerElements = React.useMemo(() => {
    if (owners === undefined || isLoading === false) {
      return new Array(isMobile ? 12 : 4)
        .fill(0)
        .map((_, idx) =>
          isMobile ? (
            <SkeletonCircleBox
              key={`owner_skeleton_${idx}`}
              size={px2rem(24)}
            />
          ) : (
            <UserSkeleton />
          ),
        );
    }
    return (
      <>
        {owners
          .slice(0, isMobile ? MAX_COUNT + 1 : MAX_COUNT)
          .map((owner: Moim.NFT.IContractOwner, idx: number) => (
            <User
              owner={owner}
              isLast={isMobile ? idx === MAX_COUNT : undefined}
            />
          ))}
      </>
    );
  }, [isLoading, isMobile, owners]);

  const handleClick = React.useCallback(() => {
    if (setSelectedTabId) {
      setSelectedTabId(CURRENT_TAB_ID);
    }
  }, [setSelectedTabId]);

  if (owners && owners.length === 0) return null;

  if (isMobile) {
    return (
      <HolderListWrapper>
        <MobileHolderListWrapper>{ownerElements}</MobileHolderListWrapper>
      </HolderListWrapper>
    );
  }

  return (
    <HolderListWrapper>
      <SectionTitle>
        <FormattedMessage id="nft_collection_show_owners_title" />
      </SectionTitle>
      <Spacer value={11} />
      <HolderListContainer>{ownerElements}</HolderListContainer>
      <Spacer value={8} />
      <SeeAllButton onClick={handleClick} borderTop={true}>
        <FormattedMessage id="button_see_all" />
      </SeeAllButton>
    </HolderListWrapper>
  );
};

export default React.memo(HolderList);
