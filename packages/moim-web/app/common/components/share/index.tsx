import * as React from "react";
import Clipboard from "react-clipboard.js";
import { FormattedMessage, useIntl } from "react-intl";
// helper
import { MEDIA_QUERY } from "common/constants/responsive";
import useMedia from "common/hooks/useMedia";
import { useSnackbar } from "common/components/alertTemplates/alerts/globalSnackbar/useGlobalSnackbar";
// components
import { InvisibleText } from "./styledComponents";

interface IProps {
  displayText: React.ReactNode;
  copyValue: string;
  displayTextWrapper?: React.ElementType;
  clipboardComponent?: string;
  afterShare?(): void;
}

const Share: React.FC<IProps> = ({
  displayText,
  copyValue,
  displayTextWrapper,
  clipboardComponent = "span",
  afterShare,
}) => {
  const intl = useIntl();
  const { open: openSuccess } = useSnackbar({
    textElement: <FormattedMessage id="copy_link_success_toast_message" />,
    type: "success",
  });
  const { open: openFail } = useSnackbar({
    textElement: <FormattedMessage id="copy_link_failure_toast_message" />,
    type: "error",
  });
  const isMobile = Boolean(
    useMedia([MEDIA_QUERY.EXCEPT_DESKTOP], [true], false),
  );
  const canShareAPI = React.useMemo(
    () => Boolean((window.navigator as any).share),
    [],
  );

  const handleShareClick: React.MouseEventHandler<HTMLSpanElement> = React.useCallback(
    async e => {
      e.stopPropagation();
      try {
        await (window.navigator as any).share({
          url: copyValue,
        });
      } finally {
        afterShare?.();
      }
    },
    [copyValue, afterShare],
  );

  const handleCopySuccess = React.useCallback(() => {
    openSuccess();
    afterShare?.();
  }, [openSuccess, intl, afterShare]);

  const handleCopyFail = React.useCallback(() => {
    openFail();
    afterShare?.();
  }, [openFail, intl, afterShare]);

  const getTarget = React.useCallback(
    (e: Element) => e.nextElementSibling as Element,
    [],
  );

  const displayElement = React.useMemo(() => {
    if (displayTextWrapper) {
      return React.createElement(
        displayTextWrapper,
        { onClick: handleShareClick, role: "button" },
        [displayText],
      );
    } else {
      return (
        <span onClick={handleShareClick} role="button">
          {displayText}
        </span>
      );
    }
  }, [displayText, displayTextWrapper, handleShareClick]);

  return (
    <>
      {isMobile && canShareAPI ? (
        displayElement
      ) : (
        <>
          <Clipboard
            component={clipboardComponent}
            options={{
              target: getTarget,
            }}
            onSuccess={handleCopySuccess}
            onError={handleCopyFail}
          >
            {displayText}
          </Clipboard>
          <InvisibleText>{copyValue}</InvisibleText>
        </>
      )}
    </>
  );
};

export default Share;
