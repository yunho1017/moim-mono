import * as React from "react";
import useRedirect from "common/hooks/useRedirect";
import { MoimURL } from "app/common/helpers/url/index";
import styled from "styled-components";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { px2rem } from "common/helpers/rem";

interface IProps {
  resourceId: string;
  redirectUrl?: string;
  title: string;
}

const TitleText = styled.span`
  display: inline-block;
  padding: ${px2rem(4)} 0;
  width: 100%;
  flex: 1;
  min-width: 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${useSingleLineStyle};
`;

export const Title: React.FC<IProps> = ({ resourceId, redirectUrl, title }) => {
  const redirect = useRedirect();

  const handleClickTitle = React.useCallback(() => {
    if (!redirectUrl) {
      redirect(new MoimURL.ContentsGroupThreads({ id: resourceId }).toString());
    } else {
      const nl = new URL(redirectUrl);
      if (nl.hostname === location.hostname) {
        redirect(
          new MoimURL.ContentsGroupThreads({ id: resourceId }).toString(),
        );
      } else {
        window.open(redirectUrl, "_blank");
      }
    }
  }, [redirect, redirectUrl, resourceId]);

  return (
    <TitleText role="button" onClick={handleClickTitle}>
      {title}
    </TitleText>
  );
};
