import * as React from "react";
import { MarginSize } from "app/enums";

import { FormattedMessage } from "react-intl";
import ArrowIcon from "@icon/24-arrow-g.svg";
import AddIcon from "@icon/24-add-b.svg";
import { Link } from "react-router-dom";
import { Section } from "./styled";
import { BaseItemCell, Divider } from "common/components/itemCell";

import { MoimURL } from "common/helpers/url";

export default function CreateGroup() {
  return (
    <Link to={MoimURL.CreateGroup.toString()}>
      <Section>
        <Divider />
        <BaseItemCell
          title={<FormattedMessage id="get_started/create_moim_button" />}
          leftElement={{
            element: <AddIcon size="s" />,
            props: {
              leftContentsSize: "s",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={<ArrowIcon size="s" />}
          hover={true}
        />
      </Section>
    </Link>
  );
}
