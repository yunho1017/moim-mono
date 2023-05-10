declare namespace Moim {
  declare namespace Blockit {
    declare namespace Campaign {
      interface ICampaignSummaryPreviewBlock extends BaseBlock {
        type: "campaign-summary-preview";
        campaignId: string;
      }

      interface ICampaignRequestFundPreviewBlock extends BaseBlock {
        type: "campaign-request-fund-preview";
        campaignId: string;
        requestCreateButton: ButtonElement;
        title?: string;
        columnCount: number; // :DEPRECATED:
        columnCount_web: number; // :DEPRECATED:
        maxDisplayedItemsCount?: number; // :DEPRECATED:
        rowCount?: number; // :DEPRECATED: TBD
        rowCount_web?: number; // :DEPRECATED: TBD
        itemGutterSize?: number; // :DEPRECATED: TBD px unit
        itemGutterSize_web?: number; // :DEPRECATED: TBD px unit
        listElement?: IListStyleElement;
      }
    }
  }
}
