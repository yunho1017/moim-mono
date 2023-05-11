// vendor
import "rsuite/lib/styles/index.less";
import "./index.less";
import * as React from "react";
import _ from "lodash";
import * as dateFns from "date-fns";
import { useIntl } from "react-intl";
import moment from "moment";
import cubejs, { TimeDimensionGranularity } from "@cubejs-client/core";
import { useCubeQuery } from "@cubejs-client/react";
import { Wrapper } from "./styled";
import { useProps } from "./hooks";
import AnalyticsTableChart from "./components/analyticsTableChart";
import AnalyticsDateRangePicker from "./components/analyticsDateRangePicker";
import { DefaultDivider } from "common/components/divider";
import SettingPageTitle from "../../components/settingPageTitle";
import Summary from "./components/summary";
import { DefaultLoader } from "common/components/loading";
import { getAnalyticsApiDomain } from "common/helpers/domainMaker";

const granularityLabelMap = {
  day: "day_and_time_date",
  week: "day_and_time_week",
  month: "day_and_time_month",
};

const mesaureLabelMap = {
  "Summary.userCount": "admin_tools/analytics/terms_new_members",
  "Summary.postCount": "admin_tools/analytics/terms_new_posts",
  "Summary.replyCount": "admin_tools/analytics/terms_new_comments",
  "Summary.messageCount": "admin_tools/analytics/terms_new_messages",
};

const defaultDates = [
  moment()
    .subtract(7, "days")
    .toDate(),
  moment()
    .subtract(1, "days")
    .toDate(),
] as [Date, Date];

const defaultGranularity = "day";
const apiUrl = getAnalyticsApiDomain();

const MoimAnalyticsQueryContainer: React.FC<{
  analyticsToken: string;
}> = (props: { analyticsToken: string }) => {
  const intl = useIntl();
  const { analyticsToken } = props;
  const [dateRange, setDateRange] = React.useState<[Date, Date]>(defaultDates);
  const [granularity, setGranularity] = React.useState(defaultGranularity);

  const cubejsApi = React.useMemo(
    () =>
      cubejs(analyticsToken, {
        apiUrl,
      }),
    [analyticsToken]
  );

  const handleOnChangeGranularity = React.useMemo(
    () => (value: string) => {
      setGranularity(value);
    },
    [setGranularity]
  );

  const handleOnChangeDateRange = React.useMemo(
    () => (value: any) => {
      const dates = value as [Date, Date];
      setDateRange(dates);
    },
    [setDateRange]
  );

  const indexKey = React.useMemo(
    () => ({
      key: `Summary.created_date_parsed.${granularity}`,
      label: intl.formatMessage({
        id: granularityLabelMap[granularity as "day" | "week" | "month"],
      }),
    }),
    [granularity, intl]
  );

  const [totalTitle, valueKeys] = React.useMemo(
    () => [
      intl.formatMessage({ id: "admin_tools/analytics/terms_total" }),
      [
        {
          key: "Summary.userCount",
          label: intl.formatMessage({
            id: mesaureLabelMap["Summary.userCount"],
          }),
        },
        {
          key: "Summary.postCount",
          label: intl.formatMessage({
            id: mesaureLabelMap["Summary.postCount"],
          }),
        },
        {
          key: "Summary.replyCount",
          label: intl.formatMessage({
            id: mesaureLabelMap["Summary.replyCount"],
          }),
        },
        {
          key: "Summary.messageCount",
          label: intl.formatMessage({
            id: mesaureLabelMap["Summary.messageCount"],
          }),
        },
      ],
    ],
    [intl]
  );

  const { resultSet, isLoading } = useCubeQuery(
    {
      measures: [
        "Summary.replyCount",
        "Summary.postCount",
        "Summary.messageCount",
        "Summary.userCount",
      ],
      timeDimensions: [
        {
          dimension: "Summary.created_date_parsed",
          granularity: granularity as TimeDimensionGranularity,
          dateRange: [dateRange[0].toDateString(), dateRange[1].toDateString()],
        },
      ],
      order: {
        "Summary.created_date_parsed": "desc",
      },
    },
    {
      cubejsApi,
    }
  );

  const { resultSet: totalResultSet, isLoading: isTotalLoading } = useCubeQuery(
    {
      measures: [
        "Summary.replyCount",
        "Summary.postCount",
        "Summary.messageCount",
        "Summary.userCount",
      ],
      timeDimensions: [
        {
          dimension: "Summary.created_date_parsed",
          dateRange: [dateRange[0].toDateString(), dateRange[1].toDateString()],
        },
      ],
      order: {
        "Summary.created_date_parsed": "desc",
      },
    },
    {
      cubejsApi,
    }
  );

  const data = React.useMemo(() => {
    if (!resultSet) {
      return [];
    }

    if (!totalResultSet) {
      return [];
    }

    const pivot = resultSet.tablePivot();
    const totalPivot = totalResultSet.tablePivot();
    const ordered = _.sortBy(pivot, indexKey).reverse();

    const reportData = ordered.map((item) => {
      const dateValue = item[indexKey.key];

      if (!dateValue) {
        return {
          ...item,
          [indexKey.key]: "",
        };
      }

      const dateLabel = (() => {
        const startDate: Date = moment(dateValue.toString()).toDate();

        switch (granularity) {
          case "month":
          case "week": {
            const endDate =
              granularity === "week"
                ? dateFns.lastDayOfISOWeek(startDate)
                : dateFns.lastDayOfMonth(startDate);

            const startDateLabel = dateFns.format(
              dateFns.max([startDate, dateRange[0]]),
              "yyyy-MM-dd"
            );
            const endDateLabel = dateFns.format(
              dateFns.min([endDate, dateRange[1]]),
              "yyyy-MM-dd"
            );

            return `${startDateLabel} ~ ${endDateLabel}`;
          }
          case "day":
          default:
            return moment(dateValue.toString()).format("YYYY-MM-DD");
        }
      })();

      return {
        ...item,
        [indexKey.key]: dateLabel,
      };
    });

    reportData.push({
      ...totalPivot[0],
      [indexKey.key]: totalTitle,
    });

    return reportData;
  }, [dateRange, granularity, indexKey, resultSet, totalResultSet, totalTitle]);

  return (
    <Wrapper>
      <SettingPageTitle
        title={intl.formatMessage({
          id: "admin_tools/analytics/reports_title",
        })}
      />
      <DefaultDivider />
      <Summary
        title={intl.formatMessage({
          id: "admin_tools/analytics/reports/summary_title",
        })}
        description={intl.formatMessage({
          id: "admin_tools/analytics/reports/summary_description",
        })}
      />
      <AnalyticsDateRangePicker
        defaultGranularity={defaultGranularity}
        onGranularityChange={handleOnChangeGranularity}
        defaultDateRange={defaultDates}
        onDateRangeChange={handleOnChangeDateRange}
      />
      {isLoading || isTotalLoading || !resultSet || !totalResultSet ? (
        <DefaultLoader />
      ) : (
        <AnalyticsTableChart
          data={data}
          indexKey={indexKey}
          valueKeys={valueKeys}
        />
      )}
    </Wrapper>
  );
};

function MoimAnalyticsContainer() {
  const { analyticsToken } = useProps();

  if (!analyticsToken) {
    return <DefaultLoader />;
  }

  return <MoimAnalyticsQueryContainer analyticsToken={analyticsToken} />;
}

export default MoimAnalyticsContainer;
