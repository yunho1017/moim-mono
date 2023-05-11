import * as React from "react";
import shortid from "shortid";
import { Button } from "common/components/modalLayout/alert/styled";
import { IButton } from "common/components/modalLayout/alert/types";

export function renderButtons(buttons: IButton[]) {
  return buttons.map(button => (
    <Button
      onClick={button.onClick}
      key={shortid()}
      disabled={button.disabled}
      textColor={button.textColor}
    >
      {button.text}
    </Button>
  ));
}
