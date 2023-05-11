import * as React from "react";
import actionCountFormat from "common/helpers/actionCountFormat";

interface IProps {
  value?: number;
  defaultValue?: string;
}

export default React.memo(function ActionCount({
  value,
  defaultValue,
}: IProps) {
  return <>{value ? actionCountFormat(value) : defaultValue || null}</>;
});
