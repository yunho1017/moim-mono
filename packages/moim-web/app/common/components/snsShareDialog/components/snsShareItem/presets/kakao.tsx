import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import KakaoIconBase from "@icon/18-kakao.svg";
import SNSShareItem from "..";

import { useStoreState } from "app/store";

declare var Kakao: any;

export const KakaoIcon = styled(KakaoIconBase).attrs({
  role: "button",
  size: "xs",
})``;

export default function KakaoShare() {
  const { shareUrl } = useStoreState(state => ({
    shareUrl: state.SNSShareDialog.shareUrl,
  }));

  const handleClick = React.useCallback(() => {
    if ((window as any).Kakao) {
      if (!Kakao.isInitialized()) {
        // TODO: kakao 앱 Id 추가
        Kakao.init("");
      }

      Kakao.Link.sendScrap({ requestUrl: shareUrl, installTalk: true });
    }
  }, [shareUrl]);

  if (!shareUrl) {
    return null;
  }

  return (
    <SNSShareItem
      icon={<KakaoIcon />}
      text={<FormattedMessage id="external_service_kakaotalk" />}
      onClick={handleClick}
    />
  );
}
