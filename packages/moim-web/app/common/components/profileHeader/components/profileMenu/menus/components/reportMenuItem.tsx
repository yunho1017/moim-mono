// vendor
import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
// component
import { MenuItem } from "common/components/responsiveMenu/components/menu";
import { MenuText } from "../../styled";
// icons
import ReportIconBase from "@icon/18-report-b.svg";

import { useOpenUserReportDialog } from "common/components/reportDialog/presets/user/hooks";

const ReportIcon = styled(ReportIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey400,
}))``;

interface IProps {
  userId: string;
  requestClose: () => void;
}

export default function ReportMenuItem({ userId, requestClose }: IProps) {
  const openReportDialog = useOpenUserReportDialog({
    parentId: userId,
    threadId: userId,
  });

  const handleClick: React.MouseEventHandler<HTMLLIElement> = React.useCallback(
    e => {
      e.stopPropagation();
      openReportDialog();
      requestClose();
    },
    [open, requestClose],
  );
  return (
    <MenuItem onClick={handleClick}>
      <ReportIcon />
      <MenuText>
        <FormattedMessage id="more_menu_report" />
      </MenuText>
    </MenuItem>
  );
}
