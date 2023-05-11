import * as React from "react";
import { Provider } from "react-redux";
import styled, { FlattenInterpolation } from "styled-components";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const {
  boolean: booleanKnob,
  select: selectKnob,
  text: textKnob,
} = require("@storybook/addon-knobs");

import * as Design from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import MenuIcon from "@icon/24-menu-g.svg";
import ForumIcon from "@icon/18-forum-g.svg";

import { initialState } from "app/rootReducer";
import { generateMockStore } from "app/__mocks__/mockStore";
import { RAW } from "app/__mocks__";

const MOCK_EN_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.`;
const MOCK_KO_TEXT = `하나에 패, 같이 별 위에 무엇인지 사랑과 없이 속의 거외다. 둘 자랑처럼
별 추억과 멀듯이, 언덕 겨울이 마디씩 버리었습니다. 라이너 내 새겨지는
지나고 아무 봅니다. 어머니, 하나의 가득 지나고 내린 듯합니다. 헤는 못
하나에 가득 오면 내일 거외다. 하나에 때 이 다 추억과 경, 아직 프랑시스
있습니다. 때 아침이 가을 했던 나의 까닭이요, 다하지 별을 듯합니다.
아름다운 부끄러운 자랑처럼 가득 계십니다. 불러 별이 시와 별 위에도
걱정도 청춘이 계십니다. 아이들의 이름을 걱정도 이제 시인의 무성할
소녀들의 듯합니다.`;

const ButtonWrapper = styled.div`
  > * ~ * {
    margin-left: 10px;
  }
`;

// Typo
storiesOf(`${STORYBOOK_PREFIX.DESIGN_SYSTEM}/Typos/Sentence`, module)
  .add("heading1", () => <Design.Typos.H2Bold>Heading 1</Design.Typos.H2Bold>)
  .add("heading2", () => <Design.Typos.H4Bold>Heading 2</Design.Typos.H4Bold>)
  .add("heading3", () => <Design.Typos.H8Bold>Heading 3</Design.Typos.H8Bold>)
  .add("heading4", () => (
    <Design.Typos.H8Regular>Heading 4</Design.Typos.H8Regular>
  ))
  .add("heading5", () => <Design.Typos.H8Bold>Heading 5</Design.Typos.H8Bold>)
  .add("heading6", () => <Design.Typos.H6Bold>Heading 6</Design.Typos.H6Bold>)
  .add("heading7", () => <Design.Typos.H10Bold>Heading 7</Design.Typos.H10Bold>)
  .add("body1", () => <Design.Typos.B1Regular>Body 1</Design.Typos.B1Regular>)
  .add("body2", () => <Design.Typos.B3Regular>Body 2</Design.Typos.B3Regular>)
  .add("body3", () => <Design.Typos.B3Regular>Body 3</Design.Typos.B3Regular>)
  .add("caption", () => (
    <Design.Typos.B4Regular>Caption</Design.Typos.B4Regular>
  ));

const TypoLoader = styled.p<{ overrideStyle: FlattenInterpolation<any> }>`
  ${props => props.overrideStyle};
`;

const ShowCase: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <label
        style={{
          fontSize: "18px",
          paddingLeft: "8px",
          borderLeft: "2px solid red",
        }}
      >
        Type: {title}
      </label>
      {children}
      <hr />
    </div>
  );
};

storiesOf(`${STORYBOOK_PREFIX.DESIGN_SYSTEM}/Typos/Paragraph`, module).add(
  "Default",
  () => (
    <div>
      <ShowCase title="H1(EN)">
        <TypoLoader overrideStyle={Design.Typos.H2RegularStyle}>
          {MOCK_EN_TEXT}
        </TypoLoader>
      </ShowCase>
      <ShowCase title="H1(KO)">
        <TypoLoader overrideStyle={Design.Typos.H2RegularStyle}>
          {MOCK_KO_TEXT}
        </TypoLoader>
      </ShowCase>

      <ShowCase title="H2(EN)">
        <TypoLoader overrideStyle={Design.Typos.H4BoldStyle}>
          {MOCK_EN_TEXT}
        </TypoLoader>
      </ShowCase>
      <ShowCase title="H2(KO)">
        <TypoLoader overrideStyle={Design.Typos.H4BoldStyle}>
          {MOCK_KO_TEXT}
        </TypoLoader>
      </ShowCase>

      <ShowCase title="H3(EN)">
        <TypoLoader overrideStyle={Design.Typos.H8BoldStyle}>
          {MOCK_EN_TEXT}
        </TypoLoader>
      </ShowCase>
      <ShowCase title="H3(KO)">
        <TypoLoader overrideStyle={Design.Typos.H8BoldStyle}>
          {MOCK_KO_TEXT}
        </TypoLoader>
      </ShowCase>

      <ShowCase title="H4(EN)">
        <TypoLoader overrideStyle={Design.Typos.H8RegularStyle}>
          {MOCK_EN_TEXT}
        </TypoLoader>
      </ShowCase>
      <ShowCase title="H4(KO)">
        <TypoLoader overrideStyle={Design.Typos.H8RegularStyle}>
          {MOCK_KO_TEXT}
        </TypoLoader>
      </ShowCase>

      <ShowCase title="H5(EN)">
        <TypoLoader overrideStyle={Design.Typos.pB1BoldStyle}>
          {MOCK_EN_TEXT}
        </TypoLoader>
      </ShowCase>
      <ShowCase title="H5(KO)">
        <TypoLoader overrideStyle={Design.Typos.pB1BoldStyle}>
          {MOCK_KO_TEXT}
        </TypoLoader>
      </ShowCase>

      <ShowCase title="H6(EN)">
        <TypoLoader overrideStyle={Design.Typos.pB2BoldStyle}>
          {MOCK_EN_TEXT}
        </TypoLoader>
      </ShowCase>
      <ShowCase title="H6(KO)">
        <TypoLoader overrideStyle={Design.Typos.pB2BoldStyle}>
          {MOCK_KO_TEXT}
        </TypoLoader>
      </ShowCase>

      <ShowCase title="H7(EN)">
        <TypoLoader overrideStyle={Design.Typos.pB3BoldStyle}>
          {MOCK_EN_TEXT}
        </TypoLoader>
      </ShowCase>
      <ShowCase title="H7(KO)">
        <TypoLoader overrideStyle={Design.Typos.pB3BoldStyle}>
          {MOCK_KO_TEXT}
        </TypoLoader>
      </ShowCase>

      <ShowCase title="Body1(EN)">
        <TypoLoader overrideStyle={Design.Typos.pB1RegularStyle}>
          {MOCK_EN_TEXT}
        </TypoLoader>
      </ShowCase>
      <ShowCase title="Body1(KO)">
        <TypoLoader overrideStyle={Design.Typos.pB1RegularStyle}>
          {MOCK_KO_TEXT}
        </TypoLoader>
      </ShowCase>
      <ShowCase title="Body2(EN)">
        <TypoLoader overrideStyle={Design.Typos.pB2RegularStyle}>
          {MOCK_EN_TEXT}
        </TypoLoader>
      </ShowCase>
      <ShowCase title="Body2(KO)">
        <TypoLoader overrideStyle={Design.Typos.pB2RegularStyle}>
          {MOCK_KO_TEXT}
        </TypoLoader>
      </ShowCase>

      <ShowCase title="Body3(EN)">
        <TypoLoader overrideStyle={Design.Typos.pB3RegularStyle}>
          {MOCK_EN_TEXT}
        </TypoLoader>
      </ShowCase>
      <ShowCase title="Body3(KO)">
        <TypoLoader overrideStyle={Design.Typos.pB3RegularStyle}>
          {MOCK_KO_TEXT}
        </TypoLoader>
      </ShowCase>

      <ShowCase title="Caption(EN)">
        <TypoLoader overrideStyle={Design.Typos.pB4RegularStyle}>
          {MOCK_EN_TEXT}
        </TypoLoader>
      </ShowCase>
      <ShowCase title="Caption(KO)">
        <TypoLoader overrideStyle={Design.Typos.pB4RegularStyle}>
          {MOCK_KO_TEXT}
        </TypoLoader>
      </ShowCase>
    </div>
  ),
);

// Button
storiesOf(`${STORYBOOK_PREFIX.DESIGN_SYSTEM}/Buttons`, module)
  .add("Floating Action", () => (
    <ButtonWrapper>
      <Design.Buttons.FloatActionButton size="l">
        +
      </Design.Buttons.FloatActionButton>
    </ButtonWrapper>
  ))
  .add("FlatButton", () => (
    <ButtonWrapper>
      <Design.Buttons.FlatButton size="l">
        Flat Button large
      </Design.Buttons.FlatButton>
      <Design.Buttons.FlatButton size="m">
        Flat Button medium
      </Design.Buttons.FlatButton>
      <Design.Buttons.FlatButton size="s">
        Flat Button small
      </Design.Buttons.FlatButton>
    </ButtonWrapper>
  ))
  .add("FlatButton (disabled)", () => (
    <ButtonWrapper>
      <Design.Buttons.FlatButton disabled={true} size="l">
        Flat Button large
      </Design.Buttons.FlatButton>
      <Design.Buttons.FlatButton disabled={true} size="m">
        Flat Button medium
      </Design.Buttons.FlatButton>
      <Design.Buttons.FlatButton disabled={true} size="s">
        Flat Button small
      </Design.Buttons.FlatButton>
    </ButtonWrapper>
  ))
  .add("FlatButton (waiting)", () => (
    <ButtonWrapper>
      <Design.Buttons.FlatButton waiting={true} size="l">
        Flat Button large
      </Design.Buttons.FlatButton>
      <Design.Buttons.FlatButton waiting={true} size="m">
        Flat Button medium
      </Design.Buttons.FlatButton>
      <Design.Buttons.FlatButton waiting={true} size="s">
        Flat Button small
      </Design.Buttons.FlatButton>
    </ButtonWrapper>
  ))
  .add("FlatGeneralButton", () => (
    <ButtonWrapper>
      <Design.Buttons.FlatGeneralButton size="l">
        Flat Button large
      </Design.Buttons.FlatGeneralButton>
      <Design.Buttons.FlatGeneralButton size="m">
        Flat Button medium
      </Design.Buttons.FlatGeneralButton>
      <Design.Buttons.FlatGeneralButton size="s">
        Flat Button small
      </Design.Buttons.FlatGeneralButton>
    </ButtonWrapper>
  ))
  .add("FlatGeneralButton (disabled)", () => (
    <ButtonWrapper>
      <Design.Buttons.FlatGeneralButton disabled={true} size="l">
        Flat Button large
      </Design.Buttons.FlatGeneralButton>
      <Design.Buttons.FlatGeneralButton disabled={true} size="m">
        Flat Button medium
      </Design.Buttons.FlatGeneralButton>
      <Design.Buttons.FlatGeneralButton disabled={true} size="s">
        Flat Button small
      </Design.Buttons.FlatGeneralButton>
    </ButtonWrapper>
  ))
  .add("FlatGeneralButton (waiting)", () => (
    <ButtonWrapper>
      <Design.Buttons.FlatGeneralButton waiting={true} size="l">
        Flat Button large
      </Design.Buttons.FlatGeneralButton>
      <Design.Buttons.FlatGeneralButton waiting={true} size="m">
        Flat Button medium
      </Design.Buttons.FlatGeneralButton>
      <Design.Buttons.FlatGeneralButton waiting={true} size="s">
        Flat Button small
      </Design.Buttons.FlatGeneralButton>
    </ButtonWrapper>
  ))
  .add("GhostButton", () => (
    <ButtonWrapper>
      <Design.Buttons.GhostButton
        isActive={booleanKnob("IsActive", false, "g1")}
        size="l"
      >
        Ghost Button large
      </Design.Buttons.GhostButton>
      <Design.Buttons.GhostButton
        isActive={booleanKnob("IsActive", false, "g1")}
        size="m"
      >
        Ghost Button medium
      </Design.Buttons.GhostButton>
      <Design.Buttons.GhostButton
        isActive={booleanKnob("IsActive", false, "g1")}
        size="s"
      >
        Ghost Button small
      </Design.Buttons.GhostButton>
    </ButtonWrapper>
  ))
  .add("GhostButton (disabled)", () => (
    <ButtonWrapper>
      <Design.Buttons.GhostButton
        isActive={booleanKnob("IsActive", false, "g1")}
        disabled={true}
        size="l"
      >
        Ghost Button large
      </Design.Buttons.GhostButton>
      <Design.Buttons.GhostButton
        isActive={booleanKnob("IsActive", false, "g1")}
        disabled={true}
        size="m"
      >
        Ghost Button medium
      </Design.Buttons.GhostButton>
      <Design.Buttons.GhostButton
        isActive={booleanKnob("IsActive", false, "g1")}
        disabled={true}
        size="s"
      >
        Ghost Button small
      </Design.Buttons.GhostButton>
    </ButtonWrapper>
  ))
  .add("GhostButton (waiting)", () => (
    <ButtonWrapper>
      <Design.Buttons.GhostButton
        isActive={booleanKnob("IsActive", false, "g1")}
        waiting={true}
        size="l"
      >
        Ghost Button large
      </Design.Buttons.GhostButton>
      <Design.Buttons.GhostButton
        isActive={booleanKnob("IsActive", false, "g1")}
        waiting={true}
        size="m"
      >
        Ghost Button medium
      </Design.Buttons.GhostButton>
      <Design.Buttons.GhostButton
        isActive={booleanKnob("IsActive", false, "g1")}
        waiting={true}
        size="s"
      >
        Ghost Button small
      </Design.Buttons.GhostButton>
    </ButtonWrapper>
  ))
  .add("TextButton", () => (
    <ButtonWrapper>
      <Design.Buttons.TextButton size="l">
        Text Button large
      </Design.Buttons.TextButton>
      <Design.Buttons.TextButton size="m">
        Text Button medium
      </Design.Buttons.TextButton>
      <Design.Buttons.TextButton size="s">
        Text Button small
      </Design.Buttons.TextButton>
    </ButtonWrapper>
  ))
  .add("TextButton (disabled)", () => (
    <ButtonWrapper>
      <Design.Buttons.TextButton disabled={true} size="l">
        Text Button large
      </Design.Buttons.TextButton>
      <Design.Buttons.TextButton disabled={true} size="m">
        Text Button medium
      </Design.Buttons.TextButton>
      <Design.Buttons.TextButton disabled={true} size="s">
        Text Button small
      </Design.Buttons.TextButton>
    </ButtonWrapper>
  ))
  .add("TextButton (waiting)", () => (
    <ButtonWrapper>
      <Design.Buttons.TextButton waiting={true} size="l">
        Text Button large
      </Design.Buttons.TextButton>
      <Design.Buttons.TextButton waiting={true} size="m">
        Text Button medium
      </Design.Buttons.TextButton>
      <Design.Buttons.TextButton waiting={true} size="s">
        Text Button small
      </Design.Buttons.TextButton>
    </ButtonWrapper>
  ))
  .add("IconButton (single)", () => (
    <div>
      <div>
        S
        <div>
          <Design.Buttons.IconButton size="s">
            <MenuIcon size="xs" />
          </Design.Buttons.IconButton>
        </div>
      </div>
      <div>
        M
        <div>
          <Design.Buttons.IconButton size="m">
            <MenuIcon size="xs" />
          </Design.Buttons.IconButton>
        </div>
      </div>
    </div>
  ))
  .add("IconButton (multiple)", () => (
    <div>
      <div>
        S
        <div>
          <Design.Buttons.IconButton onClick={action("Click 1")} size="s">
            <MenuIcon size="xs" />
          </Design.Buttons.IconButton>
          <Design.Buttons.IconButton onClick={action("Click 2")} size="s">
            <ForumIcon size="xs" />
          </Design.Buttons.IconButton>
        </div>
      </div>
      <div>
        M
        <div>
          <Design.Buttons.IconButton onClick={action("Click 1")} size="m">
            <MenuIcon size="xs" />
          </Design.Buttons.IconButton>
          <Design.Buttons.IconButton onClick={action("Click 2")} size="m">
            <ForumIcon size="xs" />
          </Design.Buttons.IconButton>
        </div>
      </div>
    </div>
  ));

// Input
storiesOf(`${STORYBOOK_PREFIX.DESIGN_SYSTEM}/Inputs`, module)
  .add("Switch", () => <Design.Inputs.Switch />)
  .add("Switch (disabled)", () => <Design.Inputs.Switch disabled={true} />)
  .add("Radio", () => (
    <ButtonWrapper>
      <label>
        <Design.Inputs.Radio name="t" value={1} checked={true} /> Item 1
      </label>
      <label>
        <Design.Inputs.Radio name="t" value={2} disabled={true} /> Item 2
      </label>
      <label>
        <Design.Inputs.Radio name="t" value={3} /> Item 3
      </label>
    </ButtonWrapper>
  ))
  .add("Checkbox", () => (
    <ButtonWrapper>
      <label>
        <Design.Inputs.Checkbox name="t" value={1} checked={true} /> Item 1
      </label>
      <label>
        <Design.Inputs.Checkbox name="t" value={2} disabled={true} /> Item 2
      </label>
      <label>
        <Design.Inputs.Checkbox name="t" value={3} /> Item 3
      </label>
    </ButtonWrapper>
  ));

// Media
storiesOf(`${STORYBOOK_PREFIX.DESIGN_SYSTEM}/Media/Preview`, module)
  .addDecorator((story: any) => {
    const mockStore = generateMockStore({
      ...initialState,
      entities: {
        ...initialState.entities,
        files: {
          1234: RAW.FILE_UPLOAD_STATUS_AVAILABLE.data,
        },
      },
    });
    return (
      <Provider store={mockStore}>
        <div style={{ width: "320px", paddingTop: "300px" }}>{story()}</div>
      </Provider>
    );
  })
  .add("image", () => (
    <Design.Media.MediaPreview
      fileId="1234"
      disableButtons={booleanKnob("disableButtons", false)}
      isSmallDeleteButton={booleanKnob("isSmallDeleteButton", false)}
      onClickRetry={action("onClickRetry")}
      onClickDelete={action("onClickDelete")}
    />
  ))
  .add("gif", () => (
    <Design.Media.MediaPreview
      fileId="1234"
      disableButtons={booleanKnob("disableButtons", false)}
      isSmallDeleteButton={booleanKnob("isSmallDeleteButton", false)}
      onClickRetry={action("onClickRetry")}
      onClickDelete={action("onClickDelete")}
    />
  ))
  .add("video", () => (
    <Design.Media.MediaPreview
      fileId="1234"
      disableButtons={booleanKnob("disableButtons", false)}
      isSmallDeleteButton={booleanKnob("isSmallDeleteButton", false)}
      onClickRetry={action("onClickRetry")}
      onClickDelete={action("onClickDelete")}
    />
  ));

storiesOf(`${STORYBOOK_PREFIX.DESIGN_SYSTEM}/Media/Cell`, module).add(
  "default",
  () => {
    const file = selectKnob("file", {
      upload: RAW.FILE_UPLOAD_STATUS_QUEUED.data,
      available: RAW.FILE_UPLOAD_STATUS_AVAILABLE.data,
    });
    const mockStore = generateMockStore({
      ...initialState,
      entities: {
        ...initialState.entities,
        files: {
          1234: file,
        },
      },
    });
    return (
      <Provider store={mockStore}>
        <div style={{ width: "320px", paddingTop: "300px" }}>
          <Design.Media.MediaCell
            fileId="1234"
            disableButtons={booleanKnob("disableButtons", false)}
            isSmallDeleteButton={booleanKnob("isSmallDeleteButton", false)}
            onClickRetry={action("onClickRetry")}
            onClickDelete={action("onClickDelete")}
          />
        </div>
      </Provider>
    );
  },
);

storiesOf(
  `${STORYBOOK_PREFIX.DESIGN_SYSTEM}/Texts/Native Emoji safe with text`,
  module,
).add("default", () => (
  <Design.Typos.B4Regular>
    <Design.Texts.NativeEmojiSafeText
      value={textKnob("value", "👍hihi🧑‍💻jack")}
    />
  </Design.Typos.B4Regular>
));
