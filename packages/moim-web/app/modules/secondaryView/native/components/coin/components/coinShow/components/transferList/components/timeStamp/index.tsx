import * as React from "react";
import { TimeStampTitle } from "./styled";

interface PropsType {
  date: string;
}
const TimeStamp: React.FC<PropsType> = ({ date }) => (
  <TimeStampTitle>{date}</TimeStampTitle>
);

export default React.memo(TimeStamp);
