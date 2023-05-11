import * as React from "react";
import { css, FlattenInterpolation } from "styled-components";

import Line from "./components/line";
import Inputs from "./components/inputs";
import Buttons from "./components/buttons";
import Timer from "./components/timer";
import Texts from "./components/texts";
import ShavedTextBlockit from "./components/shavedText";
import ProfileBlockit from "./components/profile";
import SectionBlock from "./components/section";
import ReferenceBlock from "./components/referenceBlock";
import FormBlock from "./components/form";
import ListBlock from "./components/list";
import ItemCellBlock from "./components/list/components/itemCell";
import LoadingBlock from "./components/loader";
import CalendarBlock from "./components/calendar";
import GridBlock from "./components/grid";
import ChipBlock from "./components/chip";
import ImageBlock from "./components/image";
import MenuBlock from "./components/menu";
import SingleLineBlock from "./components/horizontal/singleLine";
import MultiLineBlock from "./components/horizontal/multiLine";
import MeetingBlock from "./components/meeting";
import CarouselBlock from "./components/carousel";
import QuickLinkNavigation from "./components/quickLInkNavigation";
import ContentGroup from "./components/contentsGroup";
import ContentGroupPreview from "./components/contentsGroup/preview";
import BinaryTextBlock from "./components/binaryTextItemCell";
import ChildMoimGroupBlock from "./components/childMoimGroup";
import ChildMoimGroupPreviewBlock from "./components/childMoimGroup/preview";
// commerce
import CommerceCategory from "./components/commerce/category";
import CommerceProductList from "./components/commerce/productList";
import CommerceProductListPreview from "./components/commerce/productListPreview";
import EmbedProductList from "./components/embedProductList";
import DownloadableCouponList from "./components/downloadableCouponList";
// campaign
import CampaignOverviewSummaryPreview from "./components/campaign/summaryPreview";
import CampaignOverviewRequestFundsPreview from "./components/campaign/requestFundPreview";
// DQuest
import DQuestGroupPreviewBlock from "./components/dquestGroupPreview";
// NFT
import NftSetPreview from "./components/nftSetPreview";
import NftSummary from "./components/nftSummary";
import NftCollectionItem from "./components/nftCollectionItem";
// treasury
import TreasuryItem from "./components/treasuryItem";
// cryptobadge
import CryptobadgeGroupPreview from "./components/cryptobadgeGroupPreview";

// NOTE: 2020-09-15 시점에선 아래 두 블록킷을 제외합니다.
// FileCell
// LinkPreview
// NOTE: doBlockAction을 호출할때, React.useContext(PluginPanelContext); 통해서 어디서 호출됐는지 확인할 수 있게 해주세요.

interface IProps {
  block: Moim.Blockit.Blocks;
  wrapperStyle?: FlattenInterpolation<any>;
  gridWrapperStyle?: FlattenInterpolation<any>;
  gridItemStyle?: FlattenInterpolation<any>;
  inputWrapperStyle?: FlattenInterpolation<any>;
  buttonWrapperStyle?: FlattenInterpolation<any>;
  lineWrapperStyle?: FlattenInterpolation<any>;
  shavedTextWrapperStyle?: FlattenInterpolation<any>;
  textWrapperStyle?: FlattenInterpolation<any>;
  profileWrapperStyle?: FlattenInterpolation<any>;
  calendarWrapperStyle?: FlattenInterpolation<any>;
  imageWrapperStyle?: FlattenInterpolation<any>;
  menuWrapperStyle?: FlattenInterpolation<any>;
}

const BlockitRenderer: React.FC<IProps> = ({
  block,
  wrapperStyle,
  gridWrapperStyle,
  gridItemStyle,
  inputWrapperStyle,
  buttonWrapperStyle,
  lineWrapperStyle,
  shavedTextWrapperStyle,
  textWrapperStyle,
  profileWrapperStyle,
  calendarWrapperStyle,
  imageWrapperStyle,
  menuWrapperStyle,
}) => {
  const blocks = React.useMemo(() => {
    if (block.type === "section" || block.type === "form") {
      return (block.blocks || []).map(item => (
        <BlockitRenderer
          block={item}
          gridWrapperStyle={gridWrapperStyle}
          gridItemStyle={gridItemStyle}
          inputWrapperStyle={inputWrapperStyle}
          buttonWrapperStyle={buttonWrapperStyle}
          lineWrapperStyle={lineWrapperStyle}
          shavedTextWrapperStyle={shavedTextWrapperStyle}
          textWrapperStyle={textWrapperStyle}
          profileWrapperStyle={profileWrapperStyle}
          calendarWrapperStyle={calendarWrapperStyle}
          imageWrapperStyle={imageWrapperStyle}
          menuWrapperStyle={menuWrapperStyle}
          wrapperStyle={wrapperStyle}
        />
      ));
    }
    return [];
  }, [
    block,
    buttonWrapperStyle,
    calendarWrapperStyle,
    gridItemStyle,
    gridWrapperStyle,
    imageWrapperStyle,
    inputWrapperStyle,
    lineWrapperStyle,
    menuWrapperStyle,
    profileWrapperStyle,
    shavedTextWrapperStyle,
    textWrapperStyle,
    wrapperStyle,
  ]);

  switch (block.type) {
    case "loading": {
      return <LoadingBlock />;
    }
    case "input": {
      return (
        <Inputs
          wrapperStyle={css`
            ${wrapperStyle};
            ${inputWrapperStyle};
          `}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          name={block.name}
          label={block.label}
          element={block.element}
          description={block.description}
          onChange={block.onChange}
        />
      );
    }
    case "button": {
      return (
        <Buttons
          wrapperStyle={css`
            ${wrapperStyle};
            ${buttonWrapperStyle};
          `}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          element={block.element}
        />
      );
    }
    case "line": {
      return (
        <Line
          wrapperStyle={css`
            ${wrapperStyle};
            ${lineWrapperStyle};
          `}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          backgroundColor={block.backgroundColor}
          fillColor={block.fillColor}
          fillWidth={block.fillWidth}
          height={block.height}
        />
      );
    }
    case "timer": {
      return (
        <Timer
          styleType={block.style}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          imageUrl={block.imageUrl}
          textSets={block.textSets}
          beforeStart={block.beforeStart}
          onGoing={block.onGoing}
          afterEnd={block.afterEnd}
          startDateTime={block.startDateTime}
          endDateTime={block.endDateTime}
        />
      );
    }
    case "shavedText": {
      return (
        <ShavedTextBlockit
          wrapperStyle={css`
            ${wrapperStyle};
            ${shavedTextWrapperStyle};
          `}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          content={block.content}
        />
      );
    }
    case "text": {
      return (
        <Texts
          wrapperStyle={css`
            ${wrapperStyle}
            ${textWrapperStyle}
          `}
          fontStyle={block.subType}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          content={block.content}
          align={block.align}
          color={block.color}
          background={block.background}
          padding={block.padding}
          border={block.border}
          textSets={block.textSets}
          subType={block.subType}
        />
      );
    }
    case "section": {
      return (
        <SectionBlock
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          columnCount={block.columnCount}
          blocks={blocks}
        />
      );
    }
    case "reference": {
      return (
        <ReferenceBlock
          wrapperStyle={wrapperStyle}
          gridWrapperStyle={gridWrapperStyle}
          gridItemStyle={gridItemStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          blockId={block.blockId}
          replaceId={block.replaceId}
          isReplaceHome={block.isReplaceHome}
        />
      );
    }
    case "form": {
      return (
        <FormBlock
          wrapperStyle={wrapperStyle}
          gridWrapperStyle={gridWrapperStyle}
          gridItemStyle={gridItemStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          buttons={block.buttons}
          blocks={block.blocks}
          confirm={block.confirm}
        />
      );
    }

    case "list": {
      return (
        <ListBlock
          wrapperStyle={wrapperStyle}
          gridWrapperStyle={gridWrapperStyle}
          gridItemStyle={gridItemStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          blockId={block.blockId}
          paging={block.paging}
          blocks={block.blocks}
          headerBlocks={block.headerBlocks}
        />
      );
    }

    case "profile": {
      return (
        <ProfileBlockit
          wrapperStyle={css`
            ${wrapperStyle};
            ${profileWrapperStyle};
          `}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          userId={block.userId}
          canUserId={block.canUserId}
          avatarType={block.avatarType}
          size={block.size}
          align={block.align}
          title={block.title}
          bottomDescription={block.bottomDescription}
          rightDescription={block.rightDescription}
          rightTitleDescription={block.rightTitleDescription}
        />
      );
    }

    case "itemCell": {
      return (
        <ItemCellBlock
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          title={block.title}
          avatarUrl={block.avatarUrl}
          avatarType={block.avatarType}
          size={block.size}
          align={block.align}
          bottomDescription={block.bottomDescription}
          rightDescription={block.rightDescription}
          rightTitleDescription={block.rightTitleDescription}
        />
      );
    }

    case "calendar": {
      return (
        <CalendarBlock
          wrapperStyle={css`
            ${wrapperStyle};
            ${calendarWrapperStyle};
          `}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          {...block}
        />
      );
    }

    case "grid": {
      return (
        <GridBlock
          wrapperStyle={wrapperStyle}
          gridWrapperStyle={gridWrapperStyle}
          gridItemStyle={gridItemStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          minColumn={block.minColumn}
          maxColumn={block.maxColumn}
          blocks={block.blocks}
          backgroundColor={block.backgroundColor}
          borderColor={block.borderColor}
        />
      );
    }

    case "image": {
      return (
        <ImageBlock
          wrapperStyle={css`
            ${wrapperStyle};
            ${imageWrapperStyle};
          `}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          imageHref={block.imageHref}
          fileId={block.fileId}
          blur_hash={block.blur_hash}
          blurHash={block.blurHash}
          width={block.width}
          height={block.height}
          ratio={block.ratio}
          src={block.src}
          srcXs={block.srcXs}
          srcSm={block.srcSm}
          srcMd={block.srcMd}
          srcLg={block.srcLg}
          srcXl={block.srcXl}
          srcSet={block.srcSet}
          fallbackSrc={block.fallbackSrc ?? block.src}
        />
      );
    }

    case "single-line-horizontal-block": {
      return (
        <SingleLineBlock
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          blocks={block.blocks}
          align={block.align}
        />
      );
    }
    case "multi-line-horizontal-block": {
      return (
        <MultiLineBlock
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          blocks={block.blocks}
          align={block.align}
        />
      );
    }

    case "chip": {
      return (
        <ChipBlock
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          content={block.content}
          style={block.style}
          size={block.size}
          color={block.color}
        />
      );
    }

    case "menu": {
      return (
        <MenuBlock
          wrapperStyle={css`
            ${wrapperStyle};
            ${menuWrapperStyle};
          `}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          menus={block.menus}
        />
      );
    }

    case "meeting": {
      return (
        <MeetingBlock
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          name={block.name}
          previewAttendees={block.previewAttendees}
          attendeesCount={block.attendeesCount}
          status={block.status}
          meetingId={block.meetingId}
          startAt={block.startAt}
          endAt={block.endAt}
          blocks={block.blocks}
        />
      );
    }
    case "carousel": {
      return (
        <CarouselBlock
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          images={block.images}
          images_web={block.images_web}
          style={block.style}
          interval={block.interval}
          style_web={block.style_web}
          interval_web={block.interval_web}
        />
      );
    }

    case "category": {
      return (
        <CommerceCategory
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          categoryId={block.categoryId}
          itemContainerWidth={block.itemContainerWidth}
          itemContainerWidth_web={block.itemContainerWidth_web}
          columnCount={block.columnCount}
          columnCount_web={block.columnCount_web}
          rowCount={block.rowCount}
          rowCount_web={block.rowCount_web}
          itemGutterSize={block.itemGutterSize}
          itemGutterSize_web={block.itemGutterSize_web}
          itemStyle={block.itemStyle}
          itemStyle_web={block.itemStyle_web}
          header={block.header}
          footer={block.footer}
        />
      );
    }

    case "product-list": {
      return (
        <CommerceProductList
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          title={block.title}
          description={block.description}
          header={block.header}
          resourceType={block.resourceType}
          resourceId={block.resourceId}
        />
      );
    }

    case "product-list-preview": {
      return (
        <CommerceProductListPreview
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          title={block.title}
          description={block.description}
          header={block.header}
          footer={block.footer}
          resourceType={block.resourceType}
          resourceId={block.resourceId}
          itemLayout_web={block.itemLayout_web}
          listElement={block.listElement}
          direction_web={block.direction_web}
          maxDisplayedItemsCount={block.maxDisplayedItemsCount}
          maxDisplayedItemsCount_web={block.maxDisplayedItemsCount_web}
        />
      );
    }

    case "campaign-summary-preview": {
      return (
        <CampaignOverviewSummaryPreview
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          campaignId={block.campaignId}
          header={block.header}
          footer={block.footer}
        />
      );
    }

    case "campaign-request-fund-preview": {
      return (
        <CampaignOverviewRequestFundsPreview
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          campaignId={block.campaignId}
          requestCreateButton={block.requestCreateButton}
          title={block.title}
          columnCount={block.columnCount}
          columnCount_web={block.columnCount_web}
          maxDisplayedItemsCount={block.maxDisplayedItemsCount}
          rowCount={block.rowCount}
          rowCount_web={block.rowCount_web}
          itemGutterSize={block.itemGutterSize}
          itemGutterSize_web={block.itemGutterSize_web}
          listElement={block.listElement}
          header={block.header}
          footer={block.footer}
        />
      );
    }

    case "quick-link-navigation": {
      return (
        <QuickLinkNavigation
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          listElement={block.listElement}
          navigationItems={block.navigationItems}
          itemStyle={block.itemStyle}
          itemStyle_web={block.itemStyle_web}
          header={block.header}
          footer={block.footer}
        />
      );
    }
    case "content-group": {
      return (
        <ContentGroup
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          title={block.title}
          description={block.description}
          resourceId={block.resourceId}
          listElement={block.listElement}
          listShowConfig={block.listShowConfig}
        />
      );
    }

    case "content-group-preview": {
      return <ContentGroupPreview wrapperStyle={wrapperStyle} {...block} />;
    }

    case "binaryTextItemCell": {
      return (
        <BinaryTextBlock
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          ratio={block.ratio}
          left={block.left}
          right={block.right}
        />
      );
    }

    case "embed-product-list": {
      return (
        <EmbedProductList
          wrapperStyle={wrapperStyle}
          botId={block.botId}
          margin={block.margin}
          actionId={block.actionId}
          params={block.params}
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          productIds={block.productIds}
        />
      );
    }

    case "child-moim-group": {
      return <ChildMoimGroupBlock wrapperStyle={wrapperStyle} {...block} />;
    }

    case "child-moim-group-preview": {
      return (
        <ChildMoimGroupPreviewBlock wrapperStyle={wrapperStyle} {...block} />
      );
    }

    case "downloadable-coupon-list": {
      return <DownloadableCouponList wrapperStyle={wrapperStyle} {...block} />;
    }

    case "dquest-group-preview": {
      return <DQuestGroupPreviewBlock {...block} />;
    }

    case "nft-set-preview": {
      return (
        <NftSetPreview
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          title={block.title}
          description={block.description}
          header={block.header}
          footer={block.footer}
          resourceId={block.resourceId}
          listElement={block.listElement}
          listShowConfig={block.listShowConfig}
        />
      );
    }

    case "nft-summary": {
      return (
        <NftSummary
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          resourceId={block.resourceId}
          showConfig={block.showConfig}
          header={block.header}
          footer={block.footer}
        />
      );
    }

    case "nft-collection-item": {
      return (
        <NftCollectionItem
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          resourceId={block.resourceId}
          showConfig={block.showConfig}
          header={block.header}
          footer={block.footer}
        />
      );
    }

    case "treasury-item": {
      return (
        <TreasuryItem
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          resourceId={block.resourceId}
          showConfig={block.showConfig}
          header={block.header}
          footer={block.footer}
        />
      );
    }

    case "cryptobadge-group-preview": {
      return (
        <CryptobadgeGroupPreview
          sectionWidth={block.sectionWidth}
          sectionMaxWidth={block.sectionMaxWidth}
          sectionMinWidth={block.sectionMinWidth}
          contentWidth={block.contentWidth}
          title={block.title}
          description={block.description}
          header={block.header}
          footer={block.footer}
          resourceId={block.resourceId}
          listElement={block.listElement}
          listShowConfig={block.listShowConfig}
        />
      );
    }

    default: {
      return null;
    }
  }
};

export default React.memo(BlockitRenderer);
export { STORY_BOOK_PATH } from "./stories";
