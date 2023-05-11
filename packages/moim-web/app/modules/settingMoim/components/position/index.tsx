import * as React from "react";
import {
  AddButton,
  Buttons,
  EditButton,
  PositionList,
  Title,
  Wrapper,
} from "./styled";
import PositionItemBasic from "./components/positionItem/item/basic";
import {
  DefaultLoader as Loader,
  LoadingIcon,
} from "common/components/loading";
import InfiniteScroller from "common/components/infiniteScroller";
import { BaseItemCell } from "common/components/itemCell";

interface IProps {
  title: string;
  positions: Moim.Position.IPosition[];
  loadingPositions: boolean;
  paging: Moim.IPaging;
  onClickAddButton(): void;
  onClickEditButton(): void;
  onClickPosition(positionId: Moim.Id): void;
  onLoadMore(pagingKey: keyof Moim.IPaging): void;
}

function Position(props: IProps) {
  const {
    title,
    positions,
    paging,
    loadingPositions,
    onClickAddButton,
    onClickEditButton,
    onClickPosition,
    onLoadMore,
  } = props;

  const positionList = React.useMemo(
    () =>
      positions.length === 0 && loadingPositions ? (
        <LoadingIcon />
      ) : (
        <InfiniteScroller
          useInitialScroll={true}
          paging={paging}
          isLoading={loadingPositions}
          itemLength={positions.length}
          loader={<Loader />}
          loadMore={onLoadMore}
          threshold={500}
        >
          <PositionList>
            {positions.map(position => (
              <PositionItemBasic
                key={position.id}
                positionId={position.id}
                color={position.color}
                name={position.name}
                onClick={onClickPosition}
              />
            ))}
          </PositionList>
        </InfiniteScroller>
      ),
    [positions, loadingPositions, paging, onLoadMore, onClickPosition],
  );

  return (
    <Wrapper>
      <BaseItemCell
        title={<Title>{title}</Title>}
        size="s"
        rightElement={
          <Buttons>
            <EditButton onClick={onClickEditButton} />
            <AddButton onClick={onClickAddButton} />
          </Buttons>
        }
        hover={false}
      />

      {positionList}
    </Wrapper>
  );
}

export default Position;
