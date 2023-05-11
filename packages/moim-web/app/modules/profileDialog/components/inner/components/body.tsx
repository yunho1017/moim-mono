import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import { getCertificates_certificates_edges } from "@vingle/cryptobadge-sdk";
import { selectPreviewProfileBlocks } from "app/selectors/profile";
import { useStoreState } from "app/store";
import BlockitRenderer from "common/components/blockitEditorBase/components/blockitRenderer";
import Positions from "../../positions";
import CryptoBadges from "../../cryptobadges";
import UserNfts from "../../userNfts";
import { Body, BlockitWrapper } from "../styledComponent";

interface IProps {
  userData: Moim.User.IUser;
  cryptoBadges: Moim.IListResponse<getCertificates_certificates_edges>;
  isCryptoBadgeLoading: boolean;
  onProfileClick(): void;
  onChangeBodyResize(): void;
  onCloseRequest(): void;
}

const ProfileDialogBody = ({
  userData,
  isCryptoBadgeLoading,
  cryptoBadges,
  onProfileClick,
  onChangeBodyResize,
}: IProps) => {
  const { positions } = userData;
  const blocks = useStoreState(state => selectPreviewProfileBlocks(state));

  const blockElements = React.useMemo(
    () =>
      blocks?.map(block => {
        let content: React.ReactNode = null;
        switch (block.type) {
          case "nft-list-preview":
            content = (
              <UserNfts userId={userData.id} accountId={userData.metamask} />
            );
            break;

          case "positions":
            content = positions?.length ? (
              <Positions positions={positions} onClickMore={onProfileClick} />
            ) : null;
            break;
          case "badges":
            content = cryptoBadges.data.length ? (
              <CryptoBadges
                isLoading={isCryptoBadgeLoading}
                cryptoBadges={cryptoBadges}
                onClickMore={onProfileClick}
              />
            ) : null;
            break;
          default:
            content = <BlockitRenderer block={block} />;
            break;
        }

        if (content) {
          return (
            <BlockitWrapper key={`profile_preview_block_${block.type}`}>
              {content}
            </BlockitWrapper>
          );
        }
        return null;
      }),
    [
      blocks,
      userData?.id,
      userData?.metamask,
      userData?.certificationStatus?.totalCount,
      positions,
      onProfileClick,
      cryptoBadges,
      isCryptoBadgeLoading,
    ],
  );

  if (Boolean(blocks?.length)) {
    return (
      <ReactResizeDetector handleHeight={true} onResize={onChangeBodyResize}>
        <Body>{blockElements}</Body>
      </ReactResizeDetector>
    );
  }

  return null;
};

export default ProfileDialogBody;
