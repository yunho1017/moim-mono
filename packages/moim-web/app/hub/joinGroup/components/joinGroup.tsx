import * as React from "react";
import { MarginSize } from "app/enums";

import { FormattedMessage } from "react-intl";
import JoinIcon from "@icon/24-join-b.svg";
import ArrowIcon from "@icon/24-arrow-g.svg";
import { Section, Description } from "./styled";
import { BaseItemCell, Divider } from "common/components/itemCell";

export default function JoinGroup() {
  return (
    <Section hover={true}>
      <Divider />
      <BaseItemCell
        title={<FormattedMessage id="get_started/join_a_moim_button" />}
        leftElement={{
          element: <JoinIcon size="s" />,
          props: {
            leftContentsSize: "s",
            margin: {
              left: MarginSize.SIXTEEN,
              right: MarginSize.TWELVE,
            },
          },
        }}
        rightElement={<ArrowIcon size="s" />}
      />
      <Description>
        <FormattedMessage id="get_started/join_another_moim_guide" />
      </Description>
    </Section>
  );
}
