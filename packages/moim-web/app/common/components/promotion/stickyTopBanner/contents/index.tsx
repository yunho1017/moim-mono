import * as React from "react";
import { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";
import MoimIcon from "common/components/groupProfileImage";
import { Wrapper, ContentText, OpenAppButton, CloseButton } from "./styled";
import useCurrentGroup from "common/hooks/useCurrentGroup";

interface IProps {
  titleTexts: Record<string, { singular: string; plural?: string }>;
  openButtonTexts: Record<string, { singular: string; plural?: string }>;
  backgroundColor: string;
  closeButtonTexts?: Record<string, { singular: string; plural?: string }>;
  appIcon?: Moim.IImage;
  onClickOpenApp(): void;
  onClickDismiss(): void;
}

const StickyTopBannerContents: React.FC<IProps> = ({
  titleTexts,
  openButtonTexts,
  backgroundColor,
  appIcon,
  onClickOpenApp,
  onClickDismiss,
}) => {
  const group = useCurrentGroup();
  const locale = useCurrentUserLocale();

  const titleText = React.useMemo(() => {
    if (isEmpty(titleTexts)) {
      return <FormattedMessage id="app_banner_title" />;
    }
    const fallbackKey = Object.keys(titleTexts)[0];
    return (titleTexts[locale] ?? titleTexts[fallbackKey]).singular;
  }, [titleTexts, locale]);

  const openButtonText = React.useMemo(() => {
    if (isEmpty(openButtonTexts)) {
      return <FormattedMessage id="app_banner_button_open_app" />;
    }
    const fallbackKey = Object.keys(openButtonTexts)[0];
    return (openButtonTexts[locale] ?? openButtonTexts[fallbackKey]).singular;
  }, [openButtonTexts, locale]);

  const appIconElement = React.useMemo(() => {
    if (appIcon) {
      return (
        <MoimIcon
          size="xs"
          icon={{
            type: "image",
            data: {
              url: appIcon.url,
            },
          }}
          title=""
        />
      );
    }

    return <MoimIcon size="xs" icon={group?.icon} title={group?.name ?? "M"} />;
  }, [appIcon, group]);

  return (
    <Wrapper backgroundColor={backgroundColor}>
      {appIconElement}
      <ContentText>{titleText}</ContentText>
      <OpenAppButton onClick={onClickOpenApp}>{openButtonText}</OpenAppButton>
      <CloseButton onClick={onClickDismiss} />
    </Wrapper>
  );
};

export default React.memo(StickyTopBannerContents);
