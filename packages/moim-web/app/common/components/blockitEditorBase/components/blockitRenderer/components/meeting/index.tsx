import * as React from "react";
import shortid from "shortid";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import { FormattedRelativeTime, FormattedMessage, useIntl } from "react-intl";
import { FlattenInterpolation } from "styled-components";
import { useStoreState, useActions } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import { getBatchUsers } from "app/actions/user";
import { userListDenormalizer } from "app/models";
import { getFromNowOptions } from "common/components/fromNow";
import { UserPlaceholder } from "common/components/userProfileImage/styledComponents";
import BlockitRender from "../../";

import {
  Wrapper,
  Inner,
  Header,
  Left,
  Body,
  VideoCallIcon,
  VideoCallGreyIcon,
  Title,
  SubTitle,
  AttendeesContainer,
  AvatarChip,
  AvatarSize,
} from "./styled";
import ReactResizeDetector from "react-resize-detector";

const MAX_DISPLAY_AVATAR_WEB = 7;
const MAX_DISPLAY_AVATAR_MOBILE = 5;

interface IProps extends Omit<Moim.Blockit.IMeetingBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
  gridWrapperStyle?: FlattenInterpolation<any>;
  gridItemStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}

const Meeting: React.FC<IProps> = ({
  name,
  status,
  previewAttendees,
  attendeesCount,
  startAt,
  endAt,
  blocks,
  wrapperStyle,
  gridWrapperStyle,
  gridItemStyle,
  margin,
}) => {
  const isMobile = useIsMobile();
  const intl = useIntl();
  const { users } = useStoreState((state) => ({
    users: userListDenormalizer(
      { data: previewAttendees ?? [] },
      state.entities
    ),
  }));
  const [batchCalled, setBatchCalled] = React.useState(false);

  const { batchUsers } = useActions({
    batchUsers: getBatchUsers,
  });

  const maxVisibleCount = React.useMemo(
    () => (isMobile ? MAX_DISPLAY_AVATAR_MOBILE : MAX_DISPLAY_AVATAR_WEB),
    [isMobile]
  );
  const [visibleUserCount, setVisibleUserCount] = React.useState(
    maxVisibleCount
  );

  const options = React.useMemo(() => {
    const startAtDate = moment(startAt || 0);
    return getFromNowOptions(startAtDate.toDate());
  }, [startAt]);

  const durationTimeText: string = React.useMemo(() => {
    if (!endAt || !startAt) return "";

    const startAtDate = moment(startAt || 0);
    const endAtDate = moment(endAt || 0);

    return moment.duration(endAtDate.diff(startAtDate)).humanize();
  }, [endAt, startAt]);

  const openStatusTimeLabel = React.useCallback(
    (text) => (
      <FormattedMessage
        id="video_chat/open_time_label"
        values={{ relative_time_string: text }}
      />
    ),
    []
  );

  const subTitleElement = React.useMemo(() => {
    if (status === "open" && options) {
      return (
        <FormattedRelativeTime
          value={Math.ceil(-options.value)}
          numeric="auto"
          unit={options.unit}
          updateIntervalInSeconds={options.update}
          children={openStatusTimeLabel}
        />
      );
    } else if (status === "end" && endAt) {
      const endAtDate = moment(endAt);
      return (
        <FormattedMessage
          id="video_chat/end_time_label"
          values={{
            short_time: endAtDate.format(
              intl.formatMessage({ id: "datetime_format_short_time" })
            ),
            duration: durationTimeText,
          }}
        />
      );
    }
    return null;
  }, [durationTimeText, endAt, openStatusTimeLabel, options, intl, status]);

  const blockElements = React.useMemo(
    () =>
      blocks.map((block, idx) => {
        if (block.type === "button" && status === "end") {
          return (
            <BlockitRender
              key={`${block.type}_${idx}`}
              block={{
                ...block,
                element: {
                  ...block.element,
                  style: "general",
                },
                params: {
                  ...block.params,
                  width: 1200,
                  height: 720,
                },
              }}
              wrapperStyle={wrapperStyle}
              gridWrapperStyle={gridWrapperStyle}
              gridItemStyle={gridItemStyle}
            />
          );
        }
        return (
          <BlockitRender
            key={`${block.type}_${idx}`}
            block={{
              ...block,
              params: {
                ...block.params,
                width: 1200,
                height: 720,
              },
            }}
            wrapperStyle={wrapperStyle}
            gridWrapperStyle={gridWrapperStyle}
            gridItemStyle={gridItemStyle}
          />
        );
      }),
    [blocks, gridItemStyle, gridWrapperStyle, status, wrapperStyle]
  );

  const handleAttendeeContainerResize = React.useCallback(
    (width: number) => {
      const result = Math.floor((width - 32) / (AvatarSize + 4)); // 32: wrapper side padding, 4: half of avatar gap
      if (result > maxVisibleCount) {
        setVisibleUserCount(maxVisibleCount);
      } else {
        setVisibleUserCount(result);
      }
    },
    [maxVisibleCount]
  );

  const remainedAttendeeCount = React.useMemo(
    () => attendeesCount - visibleUserCount,
    [attendeesCount, visibleUserCount]
  );

  const attendeesPreviewElement = React.useMemo(() => {
    const userArray = users.data.slice(0, visibleUserCount);
    const restAttendees = users.data
      .slice(visibleUserCount, users.data.length)
      .map((attendee) => attendee.name);
    const remain = remainedAttendeeCount - restAttendees.length;
    const tooltipMessage = `${restAttendees.join(", ")} ${
      remain > 0 ? `외 ${remain}명` : ""
    }`;

    return userArray.length > 0 ? (
      <ReactResizeDetector
        handleWidth={true}
        onResize={handleAttendeeContainerResize}
      >
        <AttendeesContainer>
          {userArray.map((user, idx) => {
            const isLast = idx === visibleUserCount - 1;
            return (
              <AvatarChip
                data-tip={
                  isLast && remainedAttendeeCount ? tooltipMessage : user.name
                }
                key={`meeting_${shortid()}_${user.id}`}
                isLast={isLast}
                remainCount={remainedAttendeeCount}
                isEnded={status === "end"}
              >
                {user.avatar_url ? (
                  <img
                    width="100%"
                    height="100%"
                    src={user.avatar_url}
                    alt={user.name}
                  />
                ) : (
                  <UserPlaceholder size="m" />
                )}
              </AvatarChip>
            );
          })}
        </AttendeesContainer>
      </ReactResizeDetector>
    ) : null;
  }, [
    users.data,
    visibleUserCount,
    remainedAttendeeCount,
    handleAttendeeContainerResize,
    status,
  ]);

  React.useEffect(() => {
    if (
      !batchCalled &&
      users.data.length === 0 &&
      previewAttendees.length > 0
    ) {
      setBatchCalled(true);
      batchUsers(previewAttendees);
    }
  }, [batchCalled, batchUsers, previewAttendees, users.data]);

  return (
    <Wrapper overrideStyle={wrapperStyle} margin={margin}>
      <Inner>
        <Header>
          <Left>
            {status === "end" ? <VideoCallGreyIcon /> : <VideoCallIcon />}
          </Left>
          <Body>
            <Title>{name}</Title>
            <SubTitle>{subTitleElement}</SubTitle>
          </Body>
        </Header>
        {attendeesPreviewElement}
        {blockElements}
        <ReactTooltip
          className="customTooltipTheme"
          place="bottom"
          effect="solid"
          multiline={true}
        />
      </Inner>
    </Wrapper>
  );
};

export default Meeting;
