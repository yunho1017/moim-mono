import * as React from "react";
import anime from "animejs";
import MoimCard from "common/components/moimCard";
import throttle from "lodash/throttle";
import {
  Wrapper,
  TitleContainer,
  Title,
  PagingContainer,
  ContentContainer,
  ButtonWrapper,
  PrevButton,
  NextButton,
  CardWrapper,
} from "./styled";

const scrollAnimationDuration = 500;

interface IProps {
  title: string;
  totalCount: number;
  recommends: Moim.Group.IGroup[];
  onJoinClick(moimUrl: string, moimId: Moim.Id): void;
}

const RecommendMoims: React.FC<IProps> = ({
  title,
  recommends,
  onJoinClick,
}) => {
  const [pageStatus, setPageStatus] = React.useState({
    isFirst: true,
    isLast: false,
  });
  const refContent = React.useRef<HTMLDivElement>(null);

  const labelScrollWithAnime = React.useCallback(
    throttle((direction: "left" | "right") => {
      requestAnimationFrame(() => {
        const node = refContent.current;

        if (node) {
          const scrollTo =
            node.scrollLeft +
            (direction === "left"
              ? pageStatus.isFirst
                ? node.clientWidth
                : -Math.floor(node.clientWidth / 2)
              : pageStatus.isLast
              ? -node.clientWidth
              : Math.floor(node.clientWidth / 2));

          anime({
            targets: node,
            scrollLeft: scrollTo,
            round: 1,
            easing: "easeInSine",
            duration: scrollAnimationDuration,
          });
        }
      });
    }, scrollAnimationDuration),
    [refContent.current, pageStatus],
  );

  const handleScrollEvent = React.useCallback(
    throttle(() => {
      requestAnimationFrame(() => {
        const node = refContent.current;
        if (node) {
          setPageStatus({
            isFirst: node.scrollLeft <= 0,
            isLast: node.scrollLeft >= node.scrollWidth - node.clientWidth,
          });
        }
      });
    }, 150),
    [refContent.current],
  );

  const handlePrevClick = React.useCallback(() => {
    labelScrollWithAnime("left");
  }, [labelScrollWithAnime]);

  const handleNextClick = React.useCallback(() => {
    labelScrollWithAnime("right");
  }, [labelScrollWithAnime]);

  const moimCardList = React.useMemo(
    () =>
      recommends
        .filter(item => Boolean(item) && item.id)
        .map(moim => (
          <CardWrapper>
            <MoimCard
              key={`recommend_moim_${moim.id}`}
              moimId={moim.id}
              url={moim.url}
              domain={moim.domain}
              banner={moim.banner}
              title={moim.name}
              isJoined={moim.joined}
              disableQuickJoin={true}
              isCompact={true}
              memberCount={moim.users_count}
              profileImage={moim.icon}
              description={moim.description}
              tags={moim.tags}
              showNewBadge={moim.stat?.has_new_for_list}
              period={moim.period}
              status={moim.status}
              statusConfig={moim.status_config}
              onClickJoinButton={onJoinClick}
            />
          </CardWrapper>
        )),
    [onJoinClick, recommends],
  );

  return (
    <Wrapper>
      <TitleContainer>
        <Title>{title}</Title>
        <PagingContainer visible={true}>
          <ButtonWrapper>
            <PrevButton onClick={handlePrevClick} />
          </ButtonWrapper>
          <ButtonWrapper>
            <NextButton onClick={handleNextClick} />
          </ButtonWrapper>
        </PagingContainer>
      </TitleContainer>
      <ContentContainer ref={refContent} onScroll={handleScrollEvent}>
        {moimCardList}
      </ContentContainer>
    </Wrapper>
  );
};

export default RecommendMoims;
