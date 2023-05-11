// vendor
import * as React from "react";
// component
import { BaseItemCell } from "common/components/itemCell";
import {
  Title,
  RightArrowIcon,
  Wrapper,
  IconImageWrapper,
  LoadingWrapper,
} from "./styled";
// helper
import { MarginSize } from "app/enums";
import MoimIconUploader from "common/components/moimIconUploader";
import { LoadingIcon } from "common/components/loading";
import GroupProfileImage from "common/components/groupProfileImage";

interface IProps extends React.ComponentProps<typeof MoimIconUploader> {
  isLoading: boolean;
  icon?: Moim.IIcon | null;
  label?: string;
  moimName?: string;
}

function SettingMoimIcon(props: IProps) {
  const { icon, moimName, label, isLoading, ...rest } = props;

  // TODO: Show UI Loading State
  return (
    <Wrapper>
      <BaseItemCell
        title={<Title>{label ?? "Update Icon"}</Title>}
        hover={true}
        leftElement={{
          element: (
            <IconImageWrapper>
              <GroupProfileImage icon={icon} size="l" title={moimName || ""} />

              {isLoading && (
                <LoadingWrapper>
                  <LoadingIcon />
                </LoadingWrapper>
              )}
            </IconImageWrapper>
          ),
          props: {
            leftContentsSize: "l",
            margin: {
              left: MarginSize.ZERO,
              right: MarginSize.TWELVE,
            },
          },
        }}
        rightElement={<RightArrowIcon />}
        size="xl"
      />

      <MoimIconUploader {...rest} />
    </Wrapper>
  );
}

export default SettingMoimIcon;
