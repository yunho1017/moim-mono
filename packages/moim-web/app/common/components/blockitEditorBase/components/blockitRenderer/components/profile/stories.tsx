import * as React from "react";
import styled from "styled-components";
import { Provider } from "react-redux";
const { storiesOf } = require("@storybook/react");
const {
  text: textKnob,
  select: selectKnob,
} = require("@storybook/addon-knobs");

import ProfileBlock from ".";
import { STORY_BOOK_PATH } from "../..";
import { generateMockStore } from "app/__mocks__/mockStore";
import { initialState } from "app/rootReducer";
import { NORMALIZED, RAW } from "app/__mocks__";

const Wrapper = styled.div`
  width: 37.5rem;
  margin: 1rem;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/Profile`, module)
  .addDecorator((story: any) => {
    const mockStore = generateMockStore({
      ...initialState,
      entities: {
        ...initialState.entities,
        positions: {
          P1: {
            ...NORMALIZED.POSITION.entities.positions[0],
            color: "#fab",
            id: "P1",
            name: "position-P1",
          },
        },
        users: {
          U1234: {
            ...RAW.NORMALIZED_MEMBER,
            name:
              "킹갓제너럴엠페러마제스티골져스프레셔스뷰리풀하이클래스엘레강스럭셔리클래식지니어스원더풀러블리월드탑클래스",
            positions: ["P1"],
          },
        },
      },
    });
    return <Provider store={mockStore}>{story()}</Provider>;
  })
  .add("Default", () => {
    const align = selectKnob(
      "Alignment",
      {
        Left: "left",
        Right: "right",
      },
      "left",
    );
    const avatarType = selectKnob(
      "Avatar Shape",
      {
        Round: "round",
        Square: "square",
      },
      "round",
    );
    const bottomDesc = textKnob("Bottom description", undefined);
    const rightDesc = textKnob("Right description", undefined);

    return (
      <div>
        <Wrapper>
          <div>Large</div>
          <ProfileBlock
            size="large"
            userId="U1234"
            avatarType={avatarType}
            align={align}
            bottomDescription={{
              content: bottomDesc,
            }}
            rightDescription={{
              subType: "caption",
              content: rightDesc,
            }}
          />
        </Wrapper>

        <Wrapper>
          <div>Medium</div>
          <ProfileBlock
            size="medium"
            userId="U1234"
            avatarType={avatarType}
            align={align}
            bottomDescription={{
              content: bottomDesc,
            }}
            rightDescription={{
              subType: "caption",
              content: rightDesc,
            }}
          />
        </Wrapper>

        <Wrapper>
          <div>Small</div>
          <ProfileBlock
            size="small"
            userId="U1234"
            avatarType={avatarType}
            align={align}
            bottomDescription={{
              content: bottomDesc,
            }}
            rightDescription={{
              subType: "caption",
              content: rightDesc,
            }}
          />
        </Wrapper>
      </div>
    );
  });
