import * as React from "react";
import axios from "axios";
import styled from "styled-components";
import { useIntl } from "react-intl";

const HiddenDownload = styled.a`
  display: none;
`;

interface IProps
  extends React.DetailedHTMLProps<
    React.LinkHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  resourceUrl: string;
  fileName: string;
  disable?: boolean;
}

const DownloadButton: React.FC<IProps> = ({
  resourceUrl,
  fileName,
  disable = false,
  onClick,
  children,
  ...rest
}) => {
  const intl = useIntl();
  const refDownload = React.useRef<HTMLAnchorElement>(null);
  const [objectUrl, setObjectUrl] = React.useState("");

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = React.useCallback(
    async e => {
      onClick?.(e);
      if (resourceUrl) {
        try {
          const newUrl = new URL(resourceUrl);
          newUrl.searchParams.append("t", "download");
          const result = await axios({
            url: newUrl.toString(),
            method: "GET",
            responseType: "blob",
          });
          setObjectUrl(window.URL.createObjectURL(new Blob([result.data])));
          e.preventDefault();
          refDownload.current?.click();
        } catch {
          alert(intl.formatMessage({ id: "file_download_failure_message" }));
        }
      }
    },
    [intl, onClick, resourceUrl, refDownload],
  );

  const handleDownloadClick: React.MouseEventHandler<HTMLAnchorElement> = React.useCallback(
    e => {
      e.stopPropagation();
    },
    [],
  );

  React.useEffect(
    () => () => {
      window.URL.revokeObjectURL(objectUrl);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return React.createElement(
    "button",
    {
      ...rest,
      target: "_blank",
      disabled: disable,
      onClick: handleClick,
    },
    [
      children,
      <HiddenDownload
        key="hidden-download"
        ref={refDownload}
        href={objectUrl}
        download={fileName}
        onClick={handleDownloadClick}
      />,
    ],
  );
};

export default DownloadButton;
