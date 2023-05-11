import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps<Moim.IMatchParams> {}

const SellerListContainer: React.FC<IProps> = ({ match }) => {
  return <div>Hello this is Seller List: {match.params.id}</div>;
};

export default SellerListContainer;
