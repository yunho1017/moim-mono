import * as React from "react";
import moment from "moment";
import { FormattedMessage, useIntl } from "react-intl";

import Period from "../period";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { Wrapper, Name, Content, PeriodStatus } from "./styled";

import useGroupTexts from "common/hooks/useGroupTexts";

import { PRODUCTION_HOST } from "common/constants/hosts";

interface IProps {
  name: string;
  url: string;
  domain: string;
  memberCount: number;
  status?: Moim.Group.GroupPeriodType;
  period?: Moim.Group.IGroupPeriod;
  statusConfig?: Moim.IMoimStatusConfig;
}

export default function MoimInfo({
  name,
  url,
  domain,
  memberCount,
  status,
  period,
  statusConfig,
}: IProps) {
  const intl = useIntl();
  const memberTexts = useGroupTexts("member");

  const startDateElement = React.useMemo(() => {
    if (!period?.startTime || statusConfig?.type !== "withPeriod") {
      return null;
    }
    return (
      <PeriodStatus>
        <span>{intl.formatMessage({ id: "activation_start_date_time" })}</span>
        <span>{moment(period.startTime).format("LLL")}</span>
        <br />
      </PeriodStatus>
    );
  }, [intl, period, statusConfig]);

  const endDateElement = React.useMemo(() => {
    if (!period?.endTime || statusConfig?.type !== "withPeriod") {
      return null;
    }
    return (
      <PeriodStatus>
        <span>{intl.formatMessage({ id: "activation_end_date_time" })}</span>
        <span>{moment(period.endTime).format("LLL")}</span>
        <br />
      </PeriodStatus>
    );
  }, [intl, period, statusConfig]);

  return (
    <Wrapper>
      <Name>
        <NativeEmojiSafeText value={name} />
        <Period status={status} period={period} statusConfig={statusConfig} />
      </Name>
      <Content>
        {startDateElement}
        {endDateElement}
        <FormattedMessage
          id="member_count"
          values={{
            plain_count: memberCount.toLocaleString(),
            ref_member:
              memberCount <= 1
                ? memberTexts?.singular ?? ""
                : memberTexts?.plural ?? "",
          }}
        />
        <br />
        {url ? `${url}` : `${domain}.${PRODUCTION_HOST}`}
      </Content>
    </Wrapper>
  );
}
