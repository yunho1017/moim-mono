import * as React from "react";
import styled from "styled-components";
import { useActions } from "app/store";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useGroupTexts from "common/hooks/useGroupTexts";
import { MoimURL } from "common/helpers/url";
import { ActionCreators } from "app/actions/secondaryView";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";
import RightIconBase from "@icon/18-rightarrow-g.svg";

export const TitleSection = styled.div`
  width: 100%;
  padding: 0 ${px2rem(4)} 0 ${px2rem(16)};
  display: flex;
  align-items: center;
`;

export const Title = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(11)} 0;
  margin-right: ${px2rem(3)};
  flex: 1;
  min-width: 0;
`;

export const RightArrow = styled(RightIconBase).attrs(props => ({
  size: "xs",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

interface IProps {
  onClick(): void;
}

const MyDQuests: React.FC<IProps> = ({ onClick }) => {
  const currentGroup = useCurrentGroup();
  const { redirect } = useNativeSecondaryView();
  const myDQuestsTitleText = useGroupTexts("my_quest");
  const { openFromProfile } = useActions({
    openFromProfile: ActionCreators.openNativeSecondaryViewFromProfile,
  });

  const handleRedirectMyDQuests = React.useCallback(() => {
    onClick();
    openFromProfile(false);
    redirect(new MoimURL.MyQuestList().toString());
  }, [redirect, onClick]);

  if (!Boolean(currentGroup?.config.enableDquest)) {
    return null;
  }

  return (
    <TitleSection onClick={handleRedirectMyDQuests}>
      <Title>{myDQuestsTitleText?.singular}</Title>
      <RightArrow />
    </TitleSection>
  );
};

export default React.memo(MyDQuests);
