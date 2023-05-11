import * as React from "react";
import {
  Container,
  MoimNameWrapper,
  MoimName,
  MoimIconWrapper,
} from "./styled";
import MoimIcon from "common/components/groupProfileImage";
import ShavedText from "common/components/shavedText";

interface IProps {
  icon?: Moim.IIcon;
  name?: string;
}

function MoimInfo({ icon, name }: IProps) {
  if (!name) {
    return null;
  }
  return (
    <Container>
      <MoimIconWrapper>
        <MoimIcon icon={icon} title={name} size="xl" />
      </MoimIconWrapper>

      <MoimNameWrapper>
        <MoimName>
          <ShavedText value={name} line={3} />
        </MoimName>
      </MoimNameWrapper>
    </Container>
  );
}

export default MoimInfo;
