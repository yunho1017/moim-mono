import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import { FormattedMessage } from "react-intl";

import {
  Wrapper,
  ContentRow,
  ContentSection,
  MoimName,
  MoimDescription,
  MoimStatus,
  MoimStatusWrapper,
  ButtonSection,
  NormalButton,
  JoinedButton,
  ImageWrapper,
  ImageBail,
  BannerWrapper,
  groupProfileImageStyle,
  MoimCardActiveDim,
  TagWrapper,
  Tag,
  RemainingTagCount,
  AlertBadge,
  BannerStyle,
} from "./styled";
import Banner from "common/components/banner";
import GroupProfileImage from "common/components/groupProfileImage";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import Period from "./components/period";

import { useProps, useHandlers, useEffects } from "./hooks";

export interface IProps {
  moimId: Moim.Id;
  title: string;
  memberCount: number;
  profileImage: Moim.IIcon;
  banner: Moim.IBanner;
  isJoined: boolean;
  url?: string;
  disableQuickJoin?: boolean;
  description?: string;
  domain?: string;
  tags?: Moim.Tag.ITag[];
  showNewBadge?: boolean;
  status?: Moim.Group.GroupPeriodType;
  period?: Moim.Group.IGroupPeriod;
  statusConfig?: Moim.IMoimStatusConfig;
  isCompact?: boolean;
  onClickVisitButton?(): void;
  onClickJoinButton?(moimUrl: string, moimId: Moim.Id): void;
}

function MoimCard(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);
  const {
    moimId,
    currentUser,
    isJoined,
    url,
    profileImage,
    title,
    banner,
    titleRef,
    titleShaveLine,
    description,
    descriptionRef,
    descriptionShaveLine,
    joinedTexts,
    exploreTexts,
    memberTexts,
    memberCount,
    tags,
    tagRef,
    visibleTags,
    remainTagCount,
    showNewBadge,
    period,
    isCompact,
    status,
    statusConfig,
  } = hookProps;
  const { handleVisitClick, calculateVisibleLabelCount } = hookHandlers;

  useEffects(hookProps);

  const buttonElement = React.useMemo(() => {
    if (currentUser && isJoined) {
      return (
        <a tabIndex={-1} href={url} target="_blank">
          <JoinedButton onClick={handleVisitClick}>
            {joinedTexts?.singular}
          </JoinedButton>
        </a>
      );
    } else {
      return (
        <a tabIndex={-1} href={url} target="_blank">
          <NormalButton onClick={handleVisitClick}>
            {exploreTexts?.singular}
          </NormalButton>
        </a>
      );
    }
  }, [currentUser, isJoined, url, handleVisitClick, joinedTexts, exploreTexts]);

  const tagsElement = React.useMemo(
    () =>
      visibleTags
        .filter(item => Boolean(item))
        .map((tag, index) => (
          <Tag key={`${moimId}_${tag}_${index}`} title={tag.name}>
            <ShavedText
              line={1}
              value={<NativeEmojiSafeText value={tag.name} />}
            />
          </Tag>
        )),
    [moimId, visibleTags],
  );

  return (
    <a tabIndex={-1} href={url} target="_blank">
      <Wrapper isCompact={isCompact}>
        <ImageWrapper>
          <GroupProfileImage
            icon={profileImage}
            title={title}
            size="m"
            styles={groupProfileImageStyle}
          />

          {banner && (
            <BannerWrapper>
              <Banner<{ periodStatus?: Moim.Group.GroupPeriodType }>
                banner={banner}
                styles={BannerStyle}
                periodStatus={status}
              >
                {showNewBadge && <ImageBail />}
              </Banner>
              {showNewBadge && <AlertBadge>NEW</AlertBadge>}
            </BannerWrapper>
          )}
        </ImageWrapper>
        <ContentSection>
          <ContentRow ref={titleRef}>
            <MoimName
              value={<NativeEmojiSafeText value={title} />}
              line={titleShaveLine}
            />
          </ContentRow>
          {description && (
            <ContentRow ref={descriptionRef}>
              <MoimDescription
                value={<NativeEmojiSafeText value={description} />}
                line={descriptionShaveLine}
              />
            </ContentRow>
          )}
          <ContentRow>
            <MoimStatusWrapper>
              <Period
                status={status}
                period={period}
                statusConfig={statusConfig}
              />

              <MoimStatus>
                <FormattedMessage
                  id="member_count"
                  values={{
                    plain_count: memberCount.toLocaleString(),
                    ref_member:
                      memberCount <= 1
                        ? memberTexts?.singular ?? ""
                        : memberTexts?.plural ?? "",
                  }}
                />
              </MoimStatus>
            </MoimStatusWrapper>
          </ContentRow>
          {Boolean(tags?.length) && (
            <ContentRow>
              <ReactResizeDetector
                handleWidth={true}
                refreshMode="debounce"
                onResize={calculateVisibleLabelCount}
              >
                <TagWrapper ref={tagRef}>
                  {tagsElement}
                  {remainTagCount > 0 && (
                    <RemainingTagCount
                      key={`${moimId}_remain_tag`}
                    >{`+${remainTagCount}`}</RemainingTagCount>
                  )}
                </TagWrapper>
              </ReactResizeDetector>
            </ContentRow>
          )}
        </ContentSection>

        <ButtonSection>{buttonElement}</ButtonSection>

        <MoimCardActiveDim />
      </Wrapper>
    </a>
  );
}

export default MoimCard;
