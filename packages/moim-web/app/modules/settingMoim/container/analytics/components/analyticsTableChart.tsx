import React from "react";
import { Table } from "rsuite";
import { TableWrapper } from "./styled";

export interface IProps {
  data: {
    [key: string]: string | number | boolean;
  }[];
  indexKey: {
    key: string;
    label: string;
  };
  valueKeys: {
    key: string;
    label: string;
  }[];
}

export default function AnalyticsTableChart(props: IProps) {
  const { valueKeys, indexKey, data } = props;

  const columns = React.useMemo(
    () =>
      valueKeys.map(value => (
        <Table.Column flexGrow={1} key={value.key}>
          <Table.HeaderCell>{value.label}</Table.HeaderCell>
          <Table.Cell dataKey={value.key} />
        </Table.Column>
      )),
    [valueKeys],
  );

  return (
    <TableWrapper>
      <Table data={data} autoHeight={true} wordWrap={true}>
        <Table.Column flexGrow={1.5}>
          <Table.HeaderCell>{indexKey.label}</Table.HeaderCell>
          <Table.Cell dataKey={indexKey.key} />
        </Table.Column>
        {columns}
      </Table>
    </TableWrapper>
  );
}
