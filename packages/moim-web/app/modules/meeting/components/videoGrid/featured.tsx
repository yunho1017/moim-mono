import * as React from "react";
import {
  ContentShare,
  useContentShareState,
  useFeaturedTileState,
  useLocalVideo,
  useRemoteVideoTileState,
  useRosterState,
} from "amazon-chime-sdk-component-library-react";
import useCurrentUser from "common/hooks/useCurrentUser";
import ReactResizeDetector from "react-resize-detector";
import { FeaturedVideo, VideoContainer } from "./styled";
import { LocalVideo, RemoteVideo } from "./videos";

interface IProps {
  pinnedTileIndex: number | null;
  pinnedUserId: Moim.Id;
  selfAttendId?: Moim.Id;
}

const FeaturedVideoContainer: React.FC<IProps> = ({
  pinnedTileIndex,
  pinnedUserId,
  selfAttendId,
}) => {
  const { isVideoEnabled: isLocalVideoEnabled } = useLocalVideo();
  const { tileId: featureTileId } = useFeaturedTileState();
  const { tiles, tileIdToAttendeeId } = useRemoteVideoTileState();
  const { tileId: contentTileId } = useContentShareState();
  const { roster } = useRosterState();
  const currentUser = useCurrentUser();

  const featureSectionElements = React.useMemo(() => {
    if (contentTileId) {
      return <ContentShare className="video" />;
    }

    if (pinnedUserId) {
      if (pinnedUserId === currentUser?.id) {
        return (
          <LocalVideo
            className="video"
            nameplate={selfAttendId ? roster[selfAttendId]?.name || "Me" : "Me"}
            attendeeId={selfAttendId}
            disableSpeechBorder={true}
          />
        );
      }
      if (pinnedTileIndex !== null) {
        const targetTile = tiles[pinnedTileIndex];
        return (
          <RemoteVideo
            key={targetTile}
            tileId={targetTile}
            className="video"
            name={(roster[tileIdToAttendeeId[targetTile]] || { name: "" }).name}
            attendeeId={tileIdToAttendeeId[targetTile]}
            disableSpeechBorder={true}
          />
        );
      }
    }

    if (featureTileId) {
      return (
        <RemoteVideo
          key={featureTileId}
          tileId={featureTileId}
          className="video"
          name={
            (roster[tileIdToAttendeeId[featureTileId]] || { name: "" }).name
          }
          attendeeId={tileIdToAttendeeId[featureTileId]}
          disableSpeechBorder={true}
        />
      );
    }

    return (
      isLocalVideoEnabled && (
        <LocalVideo
          className="video"
          nameplate={selfAttendId ? roster[selfAttendId]?.name || "Me" : "Me"}
          attendeeId={selfAttendId}
          disableSpeechBorder={true}
        />
      )
    );
  }, [
    isLocalVideoEnabled,
    contentTileId,
    currentUser?.id,
    featureTileId,
    pinnedTileIndex,
    pinnedUserId,
    roster,
    selfAttendId,
    tileIdToAttendeeId,
    tiles,
  ]);

  return (
    <FeaturedVideo>
      <ReactResizeDetector
        refreshMode="debounce"
        refreshRate={500}
        handleWidth={true}
        handleHeight={true}
        render={({ width, height }) => (
          <VideoContainer width={width} height={height}>
            {featureSectionElements}
          </VideoContainer>
        )}
      />
    </FeaturedVideo>
  );
};

export default FeaturedVideoContainer;
