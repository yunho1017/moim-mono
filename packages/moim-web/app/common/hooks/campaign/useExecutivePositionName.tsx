import * as React from "react";
import { useIntl } from "react-intl";

export function useExecutivePositionName() {
  const intl = useIntl();
  return React.useCallback((key: Moim.Campaign.ExecutivePositionKey) => {
    switch (key) {
      case "decisionMaker": {
        return intl.formatMessage({
          id: "funding_proposal_list_decision_maker",
        });
      }
      case "executor": {
        return intl.formatMessage({ id: "funding_proposal_list_requester" });
      }
      case "donor": {
        return intl.formatMessage({ id: "funding_proposal_list_donor" });
      }
      case "host": {
        return intl.formatMessage({ id: "funding_proposal_list_host" });
      }
    }
  }, []);
}
