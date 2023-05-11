import * as React from "react";
import { ThemeContext } from "styled-components";
import useIsMobile from "common/hooks/useIsMobile";
import RichEditor from "common/components/blockitEditorBase";
import { Spacer } from "common/components/designSystem/spacer";
import { DefaultLoader } from "common/components/loading";
import DQuestMissionary from "common/components/dquestMissionary";
import {
  BannerImage,
  Title,
  Description,
  Divider,
  StatusAndPeriod,
  Outcomes,
} from "./components";
import {
  Wrapper,
  PaddedWrapper,
  ContentWrapper,
  LoadingWrapper,
} from "./styled";

const EMPTY_ARRAY: any[] = [];

interface IProps {
  isLoading: boolean;
  quest?: Moim.DQuest.INormalizedQuest;
  content?: Moim.Blockit.Blocks[];
  history?: Moim.DQuest.IHistory;
}

const DQuestShowComponent: React.FC<IProps> = ({
  isLoading,
  quest,
  content = EMPTY_ARRAY,
  history,
}) => {
  const isMobile = useIsMobile();
  const theme = React.useContext(ThemeContext);

  const isAccomplished = React.useMemo(() => {
    if (!history) {
      return false;
    }
    if (history.reJoinable) {
      return false;
    }

    return (
      (history.status === "ACHIEVED_NOT_REWARDED" ||
        history.status === "ACHIEVED") &&
      history.progress === history.progressTotal
    );
  }, [history]);

  const bannerImages = React.useMemo(
    () =>
      (isMobile || !quest?.show.imageUrls_web?.length
        ? quest?.show.imageUrls
        : quest?.show.imageUrls_web) ?? EMPTY_ARRAY,
    [isMobile, quest?.show.imageUrls, quest?.show.imageUrls_web],
  );

  return (
    <Wrapper>
      {isLoading ? (
        <LoadingWrapper>
          <DefaultLoader />
        </LoadingWrapper>
      ) : (
        <>
          <StatusAndPeriod
            status={quest?.displayStatus}
            startAt={quest?.startAt}
            endAt={quest?.endAt}
            viewerCount={quest?.viewerCount}
            isAccomplished={isAccomplished}
          />

          <PaddedWrapper>
            <Title text={quest?.title ?? ""} />
          </PaddedWrapper>
          <Spacer value={8} />

          <Outcomes outcomes={quest?.outcomes ?? EMPTY_ARRAY} />
          <Spacer value={16} />

          {Boolean(bannerImages.length) && (
            <BannerImage imageSrc={bannerImages[0]} />
          )}

          <Spacer value={12} />

          <PaddedWrapper>
            <Description text={quest?.description ?? ""} />
          </PaddedWrapper>

          <Spacer value={24} />
          <Divider />

          {Boolean(content?.length) && (
            <>
              <PaddedWrapper>
                <ContentWrapper>
                  <RichEditor
                    id={`quest_content_${quest?.id ?? "empty"}`}
                    readonly={true}
                    contents={content}
                  />
                </ContentWrapper>
              </PaddedWrapper>
              <Divider />
            </>
          )}
          <Spacer value={16} />

          {quest ? (
            <PaddedWrapper>
              <DQuestMissionary
                questId={quest.id}
                mainColor={theme.themeMode.mode === "DARK" ? "white" : "black"}
                bottomStickyBGColor={
                  theme.themeMode.mode === "DARK"
                    ? theme.colorV2.colorSet.white1000
                    : theme.colorV2.colorSet.grey1000
                }
              />
            </PaddedWrapper>
          ) : null}
          <Spacer value={isMobile ? 102 : 68} />
        </>
      )}
    </Wrapper>
  );
};

export default React.memo(DQuestShowComponent);
