import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { boolean: booleanKnob } = require("@storybook/addon-knobs");

import Coupon from ".";
import { RAW } from "app/__mocks__";

const ONE_DAY_MILLISECOND = 86400000;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Commerce/Coupon`, module).add(
  "Default",
  () => (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(1, 5, 5, 0.28)",
        gap: "4px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          width: "375px",
          gap: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Coupon
          currency="KRW"
          coupon={RAW.COMMERCE.myCoupons.data[0]}
          status="expired"
          expiredAt={RAW.COMMERCE.myCoupons.data[0].endAt}
          onClick={action("onClick")}
        />
        <Coupon
          currency="KRW"
          coupon={RAW.COMMERCE.myCoupons.data[0]}
          status="active"
          expiredAt={Date.now() + ONE_DAY_MILLISECOND * 7}
          onClick={action("onClick")}
        />

        <Coupon
          currency="KRW"
          coupon={RAW.COMMERCE.myCoupons.data[0]}
          status="active"
          expiredAt={Date.now() + ONE_DAY_MILLISECOND * 365}
          onClick={action("onClick")}
        />

        <Coupon
          currency="KRW"
          coupon={RAW.COMMERCE.myCoupons.data[0]}
          status="used"
          expiredAt={Date.now() + ONE_DAY_MILLISECOND * 365}
          onClick={action("onClick")}
        />
      </div>
      <div
        style={{
          width: "375px",
          gap: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Coupon
          currency="KRW"
          coupon={RAW.COMMERCE.BATCH_DOWNLOADABLE_COUPONS.data[0]}
          status="active"
          expiredAt={Date.now() + ONE_DAY_MILLISECOND * 365}
          isLoadingDownloadButton={false}
          download={{ isDownloaded: false }}
          onClickDownload={action("onClickDownload")}
        />
        <Coupon
          currency="KRW"
          coupon={RAW.COMMERCE.BATCH_DOWNLOADABLE_COUPONS.data[0]}
          status="active"
          expiredAt={Date.now() + ONE_DAY_MILLISECOND * 365}
          isLoadingDownloadButton={true}
          download={{ isDownloaded: false }}
          onClickDownload={action("onClickDownload")}
        />
        <Coupon
          currency="KRW"
          coupon={RAW.COMMERCE.BATCH_DOWNLOADABLE_COUPONS.data[0]}
          status="active"
          expiredAt={Date.now() + ONE_DAY_MILLISECOND * 365}
          isLoadingDownloadButton={true}
          download={{ isDownloaded: true }}
          onClickDownload={action("onClickDownload")}
        />
      </div>
      <div
        style={{
          width: "375px",
          gap: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Coupon
          currency="KRW"
          coupon={RAW.COMMERCE.BATCH_DOWNLOADABLE_COUPONS.data[0]}
          status="expired"
          expiredAt={Date.now() + ONE_DAY_MILLISECOND * 365}
          isLoadingDownloadButton={false}
          download={{ isDownloaded: false }}
          onClickDownload={action("onClickDownload")}
        />
        <Coupon
          currency="KRW"
          coupon={RAW.COMMERCE.BATCH_DOWNLOADABLE_COUPONS.data[0]}
          status="expired"
          expiredAt={Date.now() + ONE_DAY_MILLISECOND * 365}
          isLoadingDownloadButton={true}
          download={{ isDownloaded: false }}
          onClickDownload={action("onClickDownload")}
        />
        <Coupon
          currency="KRW"
          coupon={RAW.COMMERCE.BATCH_DOWNLOADABLE_COUPONS.data[0]}
          status="expired"
          expiredAt={Date.now() + ONE_DAY_MILLISECOND * 365}
          isLoadingDownloadButton={true}
          download={{ isDownloaded: true }}
          onClickDownload={action("onClickDownload")}
        />

        <Coupon
          currency="KRW"
          coupon={RAW.COMMERCE.BATCH_DOWNLOADABLE_COUPONS.data[0]}
          status="expired"
          expiredAt={Date.now() + ONE_DAY_MILLISECOND * 365}
          isLoadingDownloadButton={false}
          download={{ isDownloaded: false }}
          hasFocus={booleanKnob("hasFocus", false)}
          onClickDownload={action("onClickDownload")}
        />
      </div>
    </div>
  ),
);
