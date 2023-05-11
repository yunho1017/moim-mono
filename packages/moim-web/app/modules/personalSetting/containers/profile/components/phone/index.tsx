import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { B1Regular } from "common/components/designSystem/typos";
import { Section, SectionTitle, InputWrapper, EditIcon } from "../styled";
import PhoneEditDialog from "./phoneEditDialog";
import { GhostGeneralButton } from "common/components/designSystem/buttons";

import getPhoneNumberWithCountryCode from "common/helpers/getPhoneNumberWithCountryCode";
import useOpenState from "common/hooks/useOpenState";
import { px2rem } from "common/helpers/rem";

const PhoneNumber = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  flex: 1;
  min-width: 0;
`;

const PhoneNumberItemWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${px2rem(42)};
  width: 100%;
`;

const PhoneNumberSection: React.FC<{ phone?: Moim.User.IUserPhone }> = ({
  phone,
}) => {
  const { close, isOpen, open } = useOpenState();
  return (
    <>
      <Section>
        <SectionTitle>
          <FormattedMessage id="edit_profile_show/phone_number_title" />
          {!phone && (
            <GhostGeneralButton size="s" onClick={open}>
              <FormattedMessage id="add_button" />
            </GhostGeneralButton>
          )}
        </SectionTitle>
        <InputWrapper>
          {phone && (
            <div>
              <PhoneNumberItemWrapper>
                <PhoneNumber>
                  {getPhoneNumberWithCountryCode(phone)}
                </PhoneNumber>
                <EditIcon onClick={open} />
              </PhoneNumberItemWrapper>
            </div>
          )}
        </InputWrapper>
      </Section>

      <PhoneEditDialog open={isOpen} onClose={close} />
    </>
  );
};

export default React.memo(PhoneNumberSection);
