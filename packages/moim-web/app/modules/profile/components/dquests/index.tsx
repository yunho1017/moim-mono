import * as React from "react";
import { useActions } from "app/store";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useGroupTexts from "common/hooks/useGroupTexts";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { MoimURL } from "common/helpers/url";
import { ActionCreators } from "app/actions/secondaryView";
import { TitleSection, Title, RightArrow } from "./styled";

const MyDQuests: React.FC = () => {
  const currentGroup = useCurrentGroup();
  const { redirect } = useNativeSecondaryView();
  const myDQuestsTitleText = useGroupTexts("my_quest");
  const { openFromProfile } = useActions({
    openFromProfile: ActionCreators.openNativeSecondaryViewFromProfile,
  });

  const handleRedirectMyDQuests = React.useCallback(() => {
    openFromProfile(false);
    redirect(new MoimURL.MyQuestList().toString());
  }, [redirect]);

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
