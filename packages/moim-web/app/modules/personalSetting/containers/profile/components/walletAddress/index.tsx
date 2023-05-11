import * as React from "react";
import { FormattedMessage } from "react-intl";
import Share from "common/components/share";
import { Section, SectionTitle, InputWrapper } from "../styled";
import { CopyIcon, AddressItemWrapper, AddressValue } from "./styled";
import { GhostGeneralButton } from "common/components/designSystem/buttons";

const AddressItem: React.FC<{ address: string }> = ({ address }) => {
  return (
    <AddressItemWrapper>
      <AddressValue>{address}</AddressValue>
      <Share displayText={<CopyIcon />} copyValue={address} />
    </AddressItemWrapper>
  );
};

const WalletAddressSection: React.FC<{ metamask?: string }> = ({
  metamask,
}) => {
  return (
    <Section>
      <SectionTitle>
        <FormattedMessage id="edit_profile_show_wallet_address_title" />

        {/* TODO 추후 진행 */}
        {false && (
          <GhostGeneralButton size="s">
            <FormattedMessage id="add_button" />
          </GhostGeneralButton>
        )}
      </SectionTitle>
      <InputWrapper>
        {metamask && <AddressItem address={metamask} />}
      </InputWrapper>
    </Section>
  );
};

export default React.memo(WalletAddressSection);
