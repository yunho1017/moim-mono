import * as React from "react";
import styled from "styled-components";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");

import { User, Message, Post, Comment, Moim } from ".";
import { RAW } from "app/__mocks__";

const Wrapper = styled.div`
  width: 640px;
`;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Search`, module)
  .add("User", () => {
    return (
      <Wrapper>
        <User
          user={{
            moimName: "SOSEJI",
            id: "U1234",
            username: "USERNAME HERE",
            bio:
              "bio goes moiming here bio goes here bio goes here bbio goes here bio goes here bio goes here bes here bbio goes here bio goes here bio goes here bio goes moiming here bio goes here bio goes here bbio goes here bio goes here bio goes here bes here bbio goes here bio goes here bio goes here bio goes moiming here bio goes here bio goes here bbio goes here bio goes here bio goes here bes here bbio goes here bio goes here bio goes here bio goes moiming here bio goes here bio goes here bbio goes here bio goes here bio goes here bes here bbio goes here bio goes here bio goes here",
            positions: [
              {
                name: "TEXT POSITION",
                color: "#9acafa",
              },
            ],
            url: "https://soseji.vingle.network/user/U1234",
          }}
        />
      </Wrapper>
    );
  })
  .add("Message", () => {
    return (
      <Wrapper>
        <Message
          message={{
            moimName: "SOSEJI",
            channelName: "Test channel",
            channelId: "C1234",
            url: "https://soseji.vingle.network/conversation/C123#m1234",
            content: {
              id: "M1234",
              creator: {
                id: "U123",
                username: "USERNAME",
              },
              createdAt: RAW.MESSAGE.created_at,
              body: {
                texts: [
                  "Lorem ipsum <mark dolor> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                ],
              },
            },
          }}
        />
      </Wrapper>
    );
  })
  .add("Post", () => {
    return (
      <Wrapper>
        <Post
          post={{
            moimName: "MoimName",
            channelName: "ChannelName",
            channelId: "Q1234",

            url: "",
            content: {
              id: "T1234",
              title: "Title TITLE Title TITLE",
              creator: {
                username: "TextAuthor",
                id: "U123",
                avatar: "",
              },
              createdAt: RAW.THREAD.created_at,
              body: {
                texts: ["hello"],
              },
              thumbnails: {
                id: "F5FXWBZYO",
                src_set:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 300w, https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 780w, https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 1120w, https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 1600w,https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 1920w",
                title: "sensegrass_cover.png",
                url:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3",
                url_lg:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=lg",
                url_md:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=md",
                url_sm:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=sm",
                url_xl:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xl",
                url_xs:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs",
              },
            },
          }}
        />
      </Wrapper>
    );
  })
  .add("Comment", () => {
    return (
      <Wrapper>
        <Comment
          comment={{
            moimName: "MoimName",
            channelName: "ChannelName",
            channelId: "Q1234",
            url: "",
            parentContent: {
              id: "T1234",
              title: "Title TITLE Title TITLE",
              creator: {
                username: "Author origin",
                id: "U123",
                avatar: "",
              },
              createdAt: RAW.THREAD.created_at,
              body: {
                texts: ["Parent Thread"],
              },
              thumbnails: {
                id: "F5FXWBZYO",
                src_set:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 300w, https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 780w, https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 1120w, https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 1600w,https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 1920w",
                title: "sensegrass_cover.png",
                url:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3",
                url_lg:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=lg",
                url_md:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=md",
                url_sm:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=sm",
                url_xl:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xl",
                url_xs:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs",
              },
            },
            content: {
              id: "R1234",
              title: "Title TITLE Title TITLE",
              creator: {
                username: "TextAuthor",
                id: "U123",
                avatar: "",
              },
              createdAt: RAW.THREAD.created_at,
              body: {
                texts: ["hello"],
              },
              thumbnails: {
                id: "F5FXWBZYO",
                src_set:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 300w, https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 780w, https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 1120w, https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 1600w,https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs 1920w",
                title: "sensegrass_cover.png",
                url:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3",
                url_lg:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=lg",
                url_md:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=md",
                url_sm:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=sm",
                url_xl:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xl",
                url_xs:
                  "https://files.vingle.network/processed?key=files/G0033S6TH/F5FXWBZYO/sensegrass_cover.png&type=ratio&value=5:3&scale=xs",
              },
            },
          }}
        />
      </Wrapper>
    );
  })
  .add("Moim", () => {
    return (
      <Wrapper>
        <Moim moim={RAW.GROUP} />
      </Wrapper>
    );
  });
