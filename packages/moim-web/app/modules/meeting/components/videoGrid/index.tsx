// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from "react";
import merge from "lodash/merge";
import difference from "lodash/difference";
import { useIntl } from "react-intl";
import { crop } from "aspectratio";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import ReactResizeDetector from "react-resize-detector";
import {
  useLocalVideo,
  useContentShareState,
  useFeaturedTileState,
  useMeetingManager,
  useRemoteVideoTileState,
  useRosterState,
} from "amazon-chime-sdk-component-library-react";
import { changeMeetingStatus as changeMeetingStatusAction } from "app/actions/meeting";
import useIsMobile from "app/common/hooks/useIsMobile";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useSnackbar } from "common/components/alertTemplates/alerts/globalSnackbar/useGlobalSnackbar";
import { useActions, useStoreState } from "app/store";
import {
  DATA_MESSAGE_CMD,
  DATA_MESSAGE_LIFETIME_MS,
  parsedMoimUserId,
} from "../..";
import PinnableVideo from "./pinnableVideo";
import { RemoteVideo, LocalVideo } from "./videos";
import uniq from "lodash/uniq";

import {
  PAGE_BUTTON_TOTAL_HEIGHT,
  PC_REMOTE_VIDEO_GAP,
  MOBILE_REMOTE_VIDEO_GAP,
  MOBILE_REMOTE_VIDEO_SIDE_PADDING,
  Container,
  MobileRemoteInner,
  RemoteVideos,
  PageButtonContainer,
  PageButtonWrapper,
  UpArrowIcon,
  DownArrowIcon,
  MobileDownArrowIcon,
  MobileUpArrowIcon,
} from "./styled";
import FeaturedVideoContainer from "./featured";

interface IProps {
  selfAttendId?: Moim.Id;
  noRemoteVideoView?: React.ReactNode;
}

export const VideoTileGrid: React.FC<IProps> = ({
  noRemoteVideoView,
  selfAttendId,
}) => {
  const refMobileSizeMeasured = React.useRef(false);
  const [sortedTiles, setSortedTiles] = React.useState<number[]>([]);
  const refVideoSize = React.useRef<
    { width: number; height: number } | undefined
  >();
  const [windowSize, setWindowSize] = React.useState(4);
  const [mobileVisibleSize, setMobileVisibleSize] = React.useState(2);
  const [currentPage, setPage] = React.useState(0);
  const [mobileRemoteVideoSize, setMobileRemoteVideoSize] = React.useState<
    number | undefined
  >(undefined);
  const [actionLoading, setActionLoadStatus] = React.useState(false);

  const isMobile = useIsMobile();
  const intl = useIntl();
  const {
    tileId: localTileId,
    isVideoEnabled: isLocalVideoEnabled,
  } = useLocalVideo();
  const { tileId: featureTileId } = useFeaturedTileState();
  const { tiles, tileIdToAttendeeId } = useRemoteVideoTileState();
  const { tileId: contentTileId } = useContentShareState();
  const { roster } = useRosterState();
  const currentUser = useCurrentUser();
  const meetingManager = useMeetingManager();
  const meetingId = useStoreState(
    state => state.meeting.currentMeetingData?.meetingId,
  );
  const pinnedUserId: string | undefined = useStoreState(
    state =>
      (state.meeting.currentMeetingData?.meeting.config.pinnedUsers ?? [])[0],
  );
  const amIHost = useStoreState(state =>
    Boolean(
      currentUser &&
        state.meeting.currentMeetingData?.meeting.host === currentUser?.id,
    ),
  );

  console.log(">>>>>>>>>", localTileId, featureTileId, tiles);

  const { changeMeetingStatus } = useActions({
    changeMeetingStatus: changeMeetingStatusAction,
  });

  const { open: openPinSuccessSnackBar } = useSnackbar({
    type: "success",
    text: intl.formatMessage({ id: "toast_message_pin_video_global_success" }),
  });
  const { open: openUnPinSuccessSnackBar } = useSnackbar({
    text: intl.formatMessage({
      id: "toast_message_unpin_video_global_success",
    }),
  });

  const remoteSize = tiles.length + (contentTileId ? 1 : 0);

  const sendCommand = React.useCallback(
    (data: Moim.Meeting.ICommandData) => {
      if (meetingManager.audioVideo) {
        meetingManager.audioVideo!.realtimeSendDataMessage(
          DATA_MESSAGE_CMD,
          JSON.stringify(data),
          DATA_MESSAGE_LIFETIME_MS,
        );
      }
    },
    [meetingManager.audioVideo],
  );

  const pinnedTileIndex = React.useMemo(() => {
    const index = tiles.findIndex(id => {
      const attendee = roster[tileIdToAttendeeId[id]] ?? {
        externalUserId: "",
      };
      const { externalUserId }: any = attendee;
      const moimUserId = parsedMoimUserId(externalUserId);
      if (!externalUserId || !moimUserId || !pinnedUserId) {
        return false;
      }
      return pinnedUserId === moimUserId;
    });
    return index === -1 ? null : index;
  }, [pinnedUserId, roster, tileIdToAttendeeId, tiles]);

  const updateTileSorting = React.useCallback(() => {
    const pinTileId = pinnedTileIndex ? tiles[pinnedTileIndex] : undefined;
    const tmpArray: number[] = [];

    if (pinTileId) {
      tmpArray.push(pinTileId);
    }

    if (featureTileId) {
      tmpArray.push(featureTileId);
    }

    setSortedTiles(state => {
      const restTiles = tiles.filter(id => !tmpArray.includes(id));
      const prevRestTiles = state.filter(id => !tmpArray.includes(id));
      const removedIds = difference(prevRestTiles, restTiles);
      const newIds = difference(restTiles, prevRestTiles);

      const result = uniq(
        tmpArray.concat(merge([], restTiles, prevRestTiles), newIds),
      ).filter(id => !removedIds.includes(id));
      return result;
    });
  }, [tiles, featureTileId, pinnedTileIndex]);

  const changePinVideo = React.useCallback(
    (moimUserId: Moim.Id) => {
      if (!actionLoading && meetingId) {
        setActionLoadStatus(true);
        changeMeetingStatus(meetingId, {
          config: {
            pinnedUsers: moimUserId ? [moimUserId] : [],
          },
        })
          .then(() => {
            if (moimUserId) {
              openPinSuccessSnackBar();
            } else {
              openUnPinSuccessSnackBar();
            }
          })
          .finally(() => {
            setActionLoadStatus(false);
          });
      }
    },
    [
      actionLoading,
      meetingId,
      changeMeetingStatus,
      openPinSuccessSnackBar,
      openUnPinSuccessSnackBar,
    ],
  );

  const handlePinClick = React.useCallback(
    (id: Moim.Id, isPinned: boolean) => {
      sendCommand({
        type: "pinVideo",
        data: {
          userId: isPinned ? "" : id,
        },
      });
      changePinVideo(isPinned ? "" : id);
    },
    [changePinVideo, sendCommand],
  );

  const windowRemoteTiles = React.useMemo(() => {
    const children: React.ReactNode[] = [];
    if (isLocalVideoEnabled) {
      children.push(
        <PinnableVideo
          enableFeature={amIHost}
          isPinned={pinnedUserId === currentUser?.id}
          moimUserId={currentUser?.id}
          onClickPinButton={handlePinClick}
        >
          <LocalVideo
            className="video"
            nameplate={selfAttendId ? roster[selfAttendId]?.name ?? "Me" : "Me"}
            attendeeId={selfAttendId}
          />
        </PinnableVideo>,
      );
    }

    sortedTiles.forEach(tileId => {
      const attendee = roster[tileIdToAttendeeId[tileId]] || { name: "" };
      const { name, externalUserId = "" }: any = attendee;
      const moimUserId = parsedMoimUserId(externalUserId);
      const attendeeId = tileIdToAttendeeId[tileId];

      children.push(
        <PinnableVideo
          enableFeature={amIHost}
          isPinned={pinnedUserId === moimUserId}
          moimUserId={moimUserId}
          onClickPinButton={handlePinClick}
        >
          <RemoteVideo
            key={tileId}
            className="video"
            tileId={tileId}
            name={name}
            attendeeId={attendeeId}
          />
        </PinnableVideo>,
      );
    });

    if (remoteSize === 0) {
      children.push(noRemoteVideoView);
    }

    return children;
  }, [
    currentUser?.id,
    isLocalVideoEnabled,
    sortedTiles,
    remoteSize,
    selfAttendId,
    roster,
    tileIdToAttendeeId,
    amIHost,
    pinnedUserId,
    handlePinClick,
    noRemoteVideoView,
  ]);

  const remoteSectionElements = React.useMemo(() => {
    let rest: React.ReactNode[] = [];
    if (isMobile) {
      const startPosition = currentPage * mobileVisibleSize;
      rest = windowRemoteTiles.slice(startPosition, startPosition + windowSize);
    } else {
      rest = windowRemoteTiles.slice(
        currentPage * windowSize,
        (currentPage + 1) * windowSize,
      );
    }

    return React.createElement(
      isMobile ? MobileRemoteInner : React.Fragment,
      isMobile ? { childrenWidth: mobileRemoteVideoSize } : undefined,
      rest,
    );
  }, [
    isMobile,
    mobileRemoteVideoSize,
    windowRemoteTiles,
    currentPage,
    mobileVisibleSize,
    windowSize,
  ]);

  const maxPageNumber = React.useMemo(
    () =>
      Math.ceil(
        windowRemoteTiles.length / (isMobile ? mobileVisibleSize : windowSize),
      ),
    [isMobile, mobileVisibleSize, windowRemoteTiles.length, windowSize],
  );

  const handleUpScroll = React.useCallback(() => {
    setPage(state => {
      if (state - 1 < 0) {
        return state;
      }

      return state - 1;
    });
  }, []);

  const handleDownScroll = React.useCallback(() => {
    setPage(state => {
      const nextPos = state + 1;
      const nextPage = (() =>
        isMobile
          ? windowRemoteTiles.slice(
              nextPos * mobileVisibleSize,
              (nextPos + 1) * windowSize - mobileVisibleSize,
            )
          : windowRemoteTiles.slice(
              nextPos * windowSize,
              (nextPos + 1) * windowSize,
            ))();

      if (nextPage.length) {
        return nextPos;
      }
      return state;
    });
  }, [isMobile, mobileVisibleSize, windowRemoteTiles, windowSize]);

  const handleRemoteVideosSize = React.useCallback(
    (w: number, h: number) => {
      if (isMobile) {
        if (!refMobileSizeMeasured.current) {
          const std =
            (w -
              (MOBILE_REMOTE_VIDEO_GAP +
                MOBILE_REMOTE_VIDEO_SIDE_PADDING * 2)) /
            2;
          setMobileRemoteVideoSize(std);
          const visibleCount = Math.round(Math.round(h / std) * 2);
          if (visibleCount > 0) {
            setWindowSize(visibleCount);
            setMobileVisibleSize(Math.round(visibleCount / 2));
            refMobileSizeMeasured.current = true;
          }
        }
      } else {
        const [, , reWidth, reHeight] = crop(w, 227, "1:2!h");
        refVideoSize.current = {
          width: reWidth,
          height: reHeight,
        };
        const responsiveCount = Math.round(
          (h - PAGE_BUTTON_TOTAL_HEIGHT) / (reHeight + PC_REMOTE_VIDEO_GAP),
        );

        setWindowSize(state => {
          if (responsiveCount !== state) {
            return responsiveCount;
          }
          return state;
        });
      }
    },
    [isMobile],
  );

  React.useEffect(() => {
    updateTileSorting();
  }, [updateTileSorting]);

  React.useEffect(() => {
    if (!isMobile && currentPage > maxPageNumber) {
      setPage(0);
    }
  }, [isMobile, currentPage, maxPageNumber, windowSize]);

  return (
    <Container className="videos">
      <FeaturedVideoContainer
        pinnedTileIndex={pinnedTileIndex}
        pinnedUserId={pinnedUserId}
        selfAttendId={selfAttendId}
      />

      <RemoteVideos childVideoSize={refVideoSize.current}>
        <ReactResizeDetector
          refreshMode="debounce"
          refreshRate={500}
          handleWidth={true}
          handleHeight={true}
          onResize={handleRemoteVideosSize}
        >
          <ReactScrollWheelHandler
            upHandler={handleUpScroll}
            downHandler={handleDownScroll}
            disableKeyboard={true}
            disableSwipeWithMouse={true}
            disableSwipe={true}
            className="scroll-box"
          >
            {currentPage !== 0 && (
              <PageButtonContainer position="top">
                <PageButtonWrapper onClick={handleUpScroll}>
                  {isMobile ? (
                    <MobileUpArrowIcon />
                  ) : (
                    <>
                      <UpArrowIcon />
                      <span>
                        {currentPage + 1}/{maxPageNumber}
                      </span>
                    </>
                  )}
                </PageButtonWrapper>
              </PageButtonContainer>
            )}
            {remoteSectionElements}

            {currentPage + 1 < maxPageNumber && (
              <PageButtonContainer position="bottom">
                <PageButtonWrapper onClick={handleDownScroll}>
                  {isMobile ? (
                    <MobileDownArrowIcon />
                  ) : (
                    <>
                      <DownArrowIcon />
                      <span>
                        {currentPage + 1}/{maxPageNumber}
                      </span>
                    </>
                  )}
                </PageButtonWrapper>
              </PageButtonContainer>
            )}
          </ReactScrollWheelHandler>
        </ReactResizeDetector>
      </RemoteVideos>
    </Container>
  );
};

export default VideoTileGrid;
