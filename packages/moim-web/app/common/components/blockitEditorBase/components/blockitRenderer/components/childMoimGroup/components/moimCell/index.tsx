// vendor
import * as React from "react";
import MoimCard from "common/components/moimCard";

export interface IProps {
  moim: Moim.ChildMoimGroup.IChildMoimGroupMoimDatum;
  onJoinClick(moimUrl: string, moimId: Moim.Id): void;
}

const MoimCell: React.FC<IProps> = ({ moim, onJoinClick }) => {
  return (
    <MoimCard
      key={moim.id}
      moimId={moim.id}
      url={moim.url}
      domain={moim.domain}
      banner={moim.banner}
      title={moim.name}
      isJoined={moim.joined}
      disableQuickJoin={true}
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
  );
};

export default React.memo(MoimCell);
