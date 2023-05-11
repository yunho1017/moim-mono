import { IGroupIcon } from "./groupIcon";

export interface IStepProps<T> {
  data: IGroupDataWithHandler<T>;
  handleButtonClick: () => void;
  stepData?: Moim.Group.ICreateMoimStepData;
}

export interface IGroupDataWithHandler<T> {
  value: T;
  error?: Moim.IErrorResponse;
  isLoading?: boolean;
  handler: (value: T) => void;
}

export interface IIconDataWithHandler {
  value: IGroupIcon;
  isLoading?: boolean;
  handler: (blob: Blob | null) => void;
}
