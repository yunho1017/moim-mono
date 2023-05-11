import React from "react";
import styled from "styled-components";
import { TextGeneralButton } from "common/components/designSystem/buttons";
import { DividerVertical } from "common/components/divider";

import { useIntlShort } from "common/hooks/useIntlShort";
import { useActions, useStoreState } from "app/store";

import { ActionCreators } from "../../actions";
import { setPopupBannerNotShowingToday } from "../../cookieHelper";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: ${px2rem(8)} 0;
  & button {
    flex: 1;
    min-width: 0;
    user-select: none;
  }
`;

export default function PopupBannerBottomButtons() {
  const intl = useIntlShort();
  const { bannerId } = useStoreState(state => ({
    bannerId: state.popupBanner.banner?.id,
  }));
  const { close } = useActions({ close: ActionCreators.close });

  const handleClickNotShowingToday = React.useCallback(() => {
    if (bannerId) {
      setPopupBannerNotShowingToday(bannerId, true);
      close();
    }
  }, [bannerId]);

  return (
    <Wrapper>
      <TextGeneralButton size="s" onClick={handleClickNotShowingToday}>
        {intl("button_not_more_showing_today")}
      </TextGeneralButton>

      <DividerVertical />

      <TextGeneralButton size="s" onClick={close}>
        {intl("button_close")}
      </TextGeneralButton>
    </Wrapper>
  );
}
