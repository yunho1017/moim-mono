declare namespace Moim {
  namespace Agreement {
    type AgreementType = "terms" | "privacy" | string;

    interface IAgreement {
      group_id: Moim.Id;
      type: AgreementType;
      content: Blockit.Blocks[];
      created_at: number;
      updated_at: number;
    }

    interface IAgreementDataState {
      terms: IAgreement | null;
      privacy: IAgreement | null;
      isLoading: boolean;
    }
  }
}
