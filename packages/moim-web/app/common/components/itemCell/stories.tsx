import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { MarginSize } from "app/enums";
const { storiesOf } = require("@storybook/react");
import {
  BaseItemCell,
  ChannelItem,
  GroupItem,
  LabelWithSwitch,
  MemberItem,
  RenderRightElement,
} from ".";
import { px2rem } from "common/helpers/rem";
import { H2Bold, H4Bold } from "common/components/designSystem/typos";
import { RAW } from "app/__mocks__";
const { action } = require("@storybook/addon-actions");

storiesOf(`${STORYBOOK_PREFIX.DESIGN_SYSTEM}/ItemCell`, module)
  .add("size", () => (
    <div>
      <H2Bold>Size 별 ItemCell</H2Bold>
      <section>
        <H4Bold>XXS</H4Bold>
        <BaseItemCell
          size="xxs"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "xs",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />

        <BaseItemCell
          size="xxs"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "s",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />
      </section>
      <section>
        <H4Bold>XS</H4Bold>
        <BaseItemCell
          size="xs"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "xs",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />

        <BaseItemCell
          size="xs"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "s",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />
      </section>

      <section>
        <H4Bold>S</H4Bold>
        <BaseItemCell
          size="s"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "xs",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />

        <BaseItemCell
          size="s"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "s",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />
      </section>

      <section>
        <H4Bold>M</H4Bold>
        <BaseItemCell
          size="m"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "xs",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.SIXTEEN,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />

        <BaseItemCell
          size="m"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "s",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />

        <BaseItemCell
          size="m"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "m",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />
      </section>

      <section>
        <H4Bold>L</H4Bold>

        <BaseItemCell
          size="l"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "xs",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.SIXTEEN,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />

        <BaseItemCell
          size="l"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "s",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />

        <BaseItemCell
          size="l"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "m",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />

        <BaseItemCell
          size="l"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "l",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />
      </section>

      <section>
        <H4Bold>XL</H4Bold>
        <BaseItemCell
          size="xl"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "xs",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.SIXTEEN,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />

        <BaseItemCell
          size="xl"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "s",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />

        <BaseItemCell
          size="xl"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "m",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />

        <BaseItemCell
          size="xl"
          title="user name"
          leftElement={{
            element: (
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            ),
            props: {
              leftContentsSize: "l",
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }}
          rightElement={
            <RenderRightElement
              type="button"
              text="Button"
              onClick={action("Button Click")}
            />
          }
        />
      </section>
    </div>
  ))
  .add("group item", () => (
    <div style={{ width: px2rem(320) }}>
      <GroupItem
        title="Group name"
        image={{ title: "Group", icon: RAW.IMAGE_ICON }}
        rightElement={
          <RenderRightElement
            type="button"
            onClick={action("Button Click")}
            text="Button"
          />
        }
      />
      <GroupItem
        title="Group name"
        subTitle="Sub Title"
        image={{ title: "Group", icon: RAW.IMAGE_ICON }}
        rightElement={
          <RenderRightElement
            type="button"
            onClick={action("Button Click")}
            text="Button"
          />
        }
      />
    </div>
  ))
  .add("member item", () => (
    <div style={{ width: px2rem(320) }}>
      <MemberItem
        title="user name"
        image={{ userId: "U12345", src: RAW.IMAGE_ICON.data.url, size: "m" }}
        button={{
          type: "button",
          text: "Button",
          onClick: action("Button Click"),
        }}
      />
      <MemberItem
        title="user name"
        subTitle="Sub Title"
        image={{ userId: "U12345", src: RAW.IMAGE_ICON.data.url, size: "m" }}
        button={{
          type: "button",
          text: "Button",
          onClick: action("Button Click"),
        }}
      />
      <MemberItem
        title="user name"
        subTitle="Sub Title"
        image={{ userId: "U12345", src: RAW.IMAGE_ICON.data.url, size: "m" }}
        button={{
          type: "radio",
          name: "userSelect",
          defaultChecked: true,
          value: 1,
          onChange: action("Item Change"),
        }}
      />
      <MemberItem
        title="user name"
        subTitle="Sub Title"
        image={{ userId: "U12345", src: RAW.IMAGE_ICON.data.url, size: "m" }}
        button={{
          type: "radio",
          name: "userSelect",
          value: 2,
          onChange: action("Item Change"),
        }}
      />
      <MemberItem
        title="user name"
        subTitle="Sub Title"
        image={{ userId: "U12345", src: RAW.IMAGE_ICON.data.url, size: "m" }}
        button={{
          type: "radio",
          name: "userSelect",
          value: 3,
          onChange: action("Item Change"),
        }}
      />

      <MemberItem
        title="user name"
        subTitle="Sub Title"
        image={{ userId: "U12345", src: RAW.IMAGE_ICON.data.url, size: "m" }}
        button={{
          type: "checkbox",
          name: "userSelect",
          value: 3,
          onChange: action("Item Change"),
        }}
      />

      <MemberItem
        title="user name"
        subTitle="Sub Title"
        image={{ userId: "U12345", src: RAW.IMAGE_ICON.data.url, size: "m" }}
        button={{
          type: "checkbox",
          name: "userSelect",
          value: 3,
          onChange: action("Item Change"),
        }}
      />
    </div>
  ))
  .add("label with switch", () => (
    <div style={{ width: px2rem(320) }}>
      <LabelWithSwitch title="group name" />
    </div>
  ))
  .add("Channel Item", () => (
    <>
      <ChannelItem name="Chat" channelType="conversation" size="m" />
      <ChannelItem name="Forum" channelType="forum" size="m" />
    </>
  ));
