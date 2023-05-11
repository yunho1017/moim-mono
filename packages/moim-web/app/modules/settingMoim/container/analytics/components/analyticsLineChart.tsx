import { ResultSet } from "@cubejs-client/core";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { ChartWrapper } from "./styled";

export interface IProps {
  resultSet: ResultSet;
  yDataKeys: string[];
}

export default function AnalyticsLineChart(props: IProps) {
  const { resultSet, yDataKeys } = props;
  const pivot = resultSet.chartPivot();

  const lines = React.useMemo(
    () =>
      yDataKeys.map(key => <Line key={key} type="monotone" dataKey={key} />),
    [yDataKeys],
  );

  return (
    <ChartWrapper>
      <ResponsiveContainer>
        <LineChart data={pivot}>
          {lines}
          <XAxis dataKey="x" />
          <CartesianGrid />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
