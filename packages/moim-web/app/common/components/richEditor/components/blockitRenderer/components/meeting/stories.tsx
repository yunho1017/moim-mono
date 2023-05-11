import * as React from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import { generateMockStore } from "app/__mocks__/mockStore";
import { initialState as appInitialState } from "app/rootReducer";
const { storiesOf } = require("@storybook/react");
const { date: dateKnob } = require("@storybook/addon-knobs");

import MeetingBlock from ".";
import { STORY_BOOK_PATH } from "../..";
import { RAW } from "app/__mocks__";

// "2021-05-16 15:00:00" => 1621144800000
const currentDate = new Date();

const Wrapper = styled.div`
  width: 37.5rem;
  margin: 1rem;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/Meeting`, module).add(
  "Default",
  () => {
    const mockStore = generateMockStore({
      ...appInitialState,
      entities: {
        ...appInitialState.entities,
        users: {
          U11111: { ...RAW.NORMALIZED_MEMBER, id: "U11111" },
          U22222: { ...RAW.NORMALIZED_MEMBER, id: "U22222" },
          U33333: { ...RAW.NORMALIZED_MEMBER, id: "U33333" },
          U44444: { ...RAW.NORMALIZED_MEMBER, id: "U44444" },
          U55555: { ...RAW.NORMALIZED_MEMBER, id: "U55555" },
          U66666: { ...RAW.NORMALIZED_MEMBER, id: "U66666" },
          U77777: { ...RAW.NORMALIZED_MEMBER, id: "U77777" },
          U88888: { ...RAW.NORMALIZED_MEMBER, id: "U88888" },
          U99999: { ...RAW.NORMALIZED_MEMBER, id: "U99999" },
          U101010: { ...RAW.NORMALIZED_MEMBER, id: "U101010" },
        },
      },
    });
    return (
      <Provider store={mockStore}>
        <div>
          <Wrapper>
            <MeetingBlock
              name="Video Call test 01"
              attendeesCount={10}
              previewAttendees={[
                "U11111",
                "U22222",
                "U33333",
                "U44444",
                "U55555",
                "U66666",
                "U77777",
                "U88888",
                "U99999",
                "U101010",
              ]}
              status="open"
              meetingId="m123124"
              startAt={dateKnob("Start At", currentDate, "G1")}
              blocks={[
                {
                  type: "button",
                  element: {
                    content: "참여하기",
                    type: "flat",
                    style: "primary",
                    size: "medium",
                    status: "enabled",
                    textColor: "#FFF",
                  },
                },
              ]}
            />
          </Wrapper>
          <Wrapper>
            <MeetingBlock
              name="Video Call test 01"
              attendeesCount={20}
              previewAttendees={[
                "U11111",
                "U22222",
                "U33333",
                "U44444",
                "U55555",
                "U66666",
                "U77777",
                "U88888",
                "U99999",
                "U101010",
              ]}
              status="end"
              meetingId="m123124"
              startAt={dateKnob("Start At", currentDate, "G2")}
              endAt={dateKnob("End At", currentDate, "G2")}
              blocks={[
                {
                  type: "button",
                  element: {
                    content: "참여하기",
                    type: "flat",
                    style: "primary",
                    size: "medium",
                    status: "disabled",
                    textColor: "#FFF",
                  },
                },
              ]}
            />
          </Wrapper>
        </div>
      </Provider>
    );
  },
);
