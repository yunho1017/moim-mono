import * as React from "react";
import { FormattedMessage } from "react-intl";

import { StyledLink } from "../components/styled";

import { CreateMoimStep } from "app/enums";

export const getStepDataMap = (moim?: string) =>
  new Map<Moim.Enums.CreateMoimStep, Moim.Group.ICreateMoimStepData>([
    [
      CreateMoimStep.MOIM_NAME,
      {
        title: <FormattedMessage id="create_moim/moim_name/page_title" />,
        buttonDescription: (
          <FormattedMessage
            id="create_moim/moim_name/terms"
            values={{ tag: (msg: string) => <StyledLink>{msg}</StyledLink> }}
          />
        ),
        buttonText: <FormattedMessage id="next_button" />,
      },
    ],
    [
      CreateMoimStep.MOIM_DOMAIN,
      {
        title: <FormattedMessage id="create_moim/moim_url/page_title" />,
        description: <FormattedMessage id="create_moim/moim_url/guide" />,
        buttonText: <FormattedMessage id="next_button" />,
      },
    ],
    [
      CreateMoimStep.MOIM_ACCESS,
      {
        title: <FormattedMessage id="create_moim/set_private/page_title" />,
        buttonText: <FormattedMessage id="next_button" />,
      },
    ],
    [
      CreateMoimStep.MOIM_ICON,
      {
        title: <FormattedMessage id="create_moim/moim_icon/page_title" />,
        description: <FormattedMessage id="create_moim/moim_icon/guide" />,
        buttonText: <FormattedMessage id="next_button" />,
      },
    ],
    [
      CreateMoimStep.USER_NAME,
      {
        title: <FormattedMessage id="create_moim/set_username/page_title" />,
        subTitle: (
          <FormattedMessage
            id="create_moim/set_username/page_sub_title"
            values={{ moim_name: moim }}
          />
        ),
        description: (
          <FormattedMessage id="create_moim/set_username/input_field_guide" />
        ),
        buttonText: (
          <FormattedMessage id="create_moim/set_username/button_create_moim" />
        ),
      },
    ],
    [
      CreateMoimStep.MOIM_RESULT,
      {
        title: <FormattedMessage id="create_moim/finish/page_title" />,
        description: <FormattedMessage id="create_moim/finish/guide" />,
        buttonText: <FormattedMessage id="create_moim/finish/button_done" />,
      },
    ],
  ]);

export const DEFAULT_STEP_DATA = getStepDataMap();

export function getStepData(key: Moim.Enums.CreateMoimStep, moimName?: string) {
  return moimName
    ? getStepDataMap(moimName).get(key)
    : DEFAULT_STEP_DATA.get(key);
}
