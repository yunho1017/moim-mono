import * as React from "react";
import { FormattedMessage } from "react-intl";

// hooks
import useRedirect from "common/hooks/useRedirect";
import useIsMobile from "common/hooks/useIsMobile";
// component
import { MoimURL } from "app/common/helpers/url/index";
import {
  ViewMoreContainer,
  ViewMoreIcon,
  MoreButtonIcon,
  MoreButton,
} from "../styled";
import { Spacer } from "common/components/designSystem/spacer";

interface IProps {
  resourceId: string;
  redirectUrl?: string;
  hasMoreContent: boolean;
}

export const ViewMore: React.FC<IProps> = ({
  resourceId,
  redirectUrl,
  hasMoreContent,
}) => {
  const redirect = useRedirect();

  const handleClickViewMore = React.useCallback(() => {
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

  if (!hasMoreContent) {
    return null;
  }
  return (
    <ViewMoreContainer role="button" onClick={handleClickViewMore}>
      <ViewMoreIcon />
    </ViewMoreContainer>
  );
};

export const GridViewMore: React.FC<IProps> = ({
  resourceId,
  hasMoreContent,
}) => {
  const isMobile = useIsMobile();
  const redirect = useRedirect();

  const handleClickViewMore = React.useCallback(() => {
    redirect(new MoimURL.ContentsGroupThreads({ id: resourceId }).toString());
  }, [redirect, resourceId]);

  if (!hasMoreContent || !isMobile) {
    return null;
  }
  return (
    <>
      <MoreButton onClick={handleClickViewMore}>
        <span>
          <FormattedMessage id="button_see_more_content_group" />
        </span>
        <MoreButtonIcon />
      </MoreButton>
      <Spacer value={8} />
    </>
  );
};
