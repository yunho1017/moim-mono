import React from "react";
import * as dateFns from "date-fns";
import { useIntl } from "react-intl";
import { DateRangePicker, SelectPicker } from "rsuite";
import { ItemDataType } from "rsuite/lib/@types/common";
import { ValueType } from "rsuite/lib/DateRangePicker";
import {
  PickerValueWrapper,
  FormWrapper,
  PickerLabel,
  FormItemWrapper,
} from "./styled";

export interface IProps {
  defaultGranularity: string;
  defaultDateRange: [Date, Date];
  onDateRangeChange: (value: any) => void;
  onGranularityChange: (value: string) => void;
}

export default function AnalyticsDateRangePicker(props: IProps) {
  const {
    defaultGranularity,
    onGranularityChange,
    defaultDateRange,
    onDateRangeChange,
  } = props;

  const intl = useIntl();
  const options = React.useMemo(
    () => [
      {
        value: "day",
        label: intl.formatMessage({ id: "day_and_time_date" }),
      },
      {
        value: "week",
        label: intl.formatMessage({ id: "day_and_time_week" }),
      },
      {
        value: "month",
        label: intl.formatMessage({ id: "day_and_time_month" }),
      },
    ],
    [intl],
  );

  const ranges = React.useMemo(
    () =>
      [
        {
          label: intl.formatMessage({ id: "day_and_time_yesterday" }),
          value: [
            dateFns.startOfDay(dateFns.subDays(new Date(), 1)),
            dateFns.endOfDay(dateFns.subDays(new Date(), 1)),
          ] as [Date, Date],
        },
        {
          label: intl.formatMessage({ id: "day_and_time_last_14_days" }),
          value: [
            dateFns.startOfDay(dateFns.subDays(new Date(), 13)),
            dateFns.endOfDay(new Date()),
          ] as [Date, Date],
        },
        {
          label: intl.formatMessage({ id: "day_and_time_last_28_days" }),
          value: [
            dateFns.startOfDay(dateFns.subDays(new Date(), 27)),
            dateFns.endOfDay(new Date()),
          ] as [Date, Date],
        },
        {
          label: intl.formatMessage({ id: "day_and_time_last_90_days" }),
          value: [
            dateFns.startOfDay(dateFns.subDays(new Date(), 89)),
            dateFns.endOfDay(new Date()),
          ] as [Date, Date],
        },
        {
          label: intl.formatMessage({ id: "day_and_time_this_month" }),
          value: [
            dateFns.startOfMonth(new Date()),
            dateFns.endOfDay(new Date()),
          ],
        },
      ] as { label: string; value: [Date, Date] }[],
    [intl],
  );

  const DateRangeValueRender = React.useCallback(
    (value: ValueType) =>
      value ? (
        <PickerValueWrapper>{`${value[0]?.toLocaleDateString()} ~ ${value[1]?.toLocaleDateString()}`}</PickerValueWrapper>
      ) : (
        <PickerValueWrapper />
      ),
    [],
  );

  const GranularityValueRender = React.useCallback(
    (_: any, type: ItemDataType) =>
      type ? (
        <PickerValueWrapper>{(type as ItemDataType).label}</PickerValueWrapper>
      ) : (
        <PickerValueWrapper />
      ),
    [],
  );

  return (
    <FormWrapper>
      <FormItemWrapper>
        <PickerLabel>
          {intl.formatMessage({
            id: "admin_tools/analytics/terms_date_range",
          })}
        </PickerLabel>
        <DateRangePicker
          defaultValue={defaultDateRange}
          cleanable={false}
          ranges={ranges}
          renderValue={DateRangeValueRender}
          onChange={onDateRangeChange}
        />
      </FormItemWrapper>
      <FormItemWrapper>
        <PickerLabel>
          {intl.formatMessage({
            id: "admin_tools/analytics/terms_group_by",
          })}
        </PickerLabel>
        <SelectPicker
          data={options}
          defaultValue={defaultGranularity}
          cleanable={false}
          searchable={false}
          onChange={onGranularityChange}
          renderValue={GranularityValueRender}
        />
      </FormItemWrapper>
    </FormWrapper>
  );
}
