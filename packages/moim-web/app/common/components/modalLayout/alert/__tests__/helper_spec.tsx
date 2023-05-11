import * as React from "react";
import { shallow } from "enzyme";
import { renderButtons } from "common/components/modalLayout/alert/helper";
import { IButton } from "common/components/modalLayout/alert/types";
import { Button } from "common/components/modalLayout/alert/styled";

describe("renderButtons()", () => {
  const buttons: IButton[] = [
    {
      text: "Hello",
      onClick: jest.fn(),
    },
    {
      text: "Press",
      onClick: jest.fn(),
    },
  ];

  describe("when inject buttons array", () => {
    it("should render that the same number of button components", () => {
      const wrapper = shallow(<div>{renderButtons(buttons)}</div>);

      expect(wrapper.find(Button).length).toEqual(buttons.length);
    });
  });
});
