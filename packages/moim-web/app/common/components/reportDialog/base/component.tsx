import * as React from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import { FormattedMessage } from "react-intl";
import { isiOS } from "common/helpers/browserDetect";

import GroupInput, { IForwardRef } from "common/components/groupInput";
import {
  FlatButton,
  GhostGeneralButton,
} from "common/components/designSystem/buttons";
import { Spacer } from "common/components/designSystem/spacer";

import { useIntlShort } from "common/hooks/useIntlShort";
import isEmpty from "common/components/richEditor/helpers/isEmpty";
import { px2rem } from "common/helpers/rem";

const ButtonContainer = styled.div`
  display: flex;

  margin-top: ${px2rem(12)};

  button {
    flex: 1;
    width: 100%;
  }

  button + button {
    margin-left: ${px2rem(8)};
  }
`;

interface IProps {
  id: string;
  placeholder: string;
  onReport(
    contents: Moim.Blockit.Blocks[],
    files: Moim.Blockit.IFileBlock[],
  ): void;
  onClose(): void;
}

const ReportDialogComponent: React.FC<IProps> = ({
  id,
  placeholder,
  onReport,
  onClose,
}) => {
  const intl = useIntlShort();
  const refEditor = React.useRef<IForwardRef>(null);
  const [tmpContents, setTmpContents] = React.useState<Moim.Blockit.Blocks[]>(
    [],
  );
  const [tmpFiles, setTmpFiles] = React.useState<Moim.Blockit.IFileBlock[]>([]);

  const handleChange = React.useCallback(
    (_contents: Moim.Blockit.Blocks[], files: Moim.Blockit.IFileBlock[]) => {
      setTmpContents(_contents);
      setTmpFiles(files);
    },
    [],
  );

  const handleReport = React.useCallback(
    debounce(() => {
      onReport(tmpContents, tmpFiles);
    }, 300),
    [tmpContents, tmpFiles, onReport],
  );

  const disableReportButton = React.useMemo(() => {
    const { isEmptyText } = isEmpty(tmpContents);

    return isEmptyText;
  }, [tmpContents]);
  return (
    <>
      <GroupInput
        ref={refEditor}
        placeholder={intl(placeholder)}
        id={`global_report_dialog_input_${id}`}
        value={tmpContents}
        autoFocus={!isiOS()}
        useSaveButton={false}
        useImageFileAttachButton={true}
        minInputLine={5}
        onChange={handleChange}
        onCancel={onClose}
      />
      <ButtonContainer>
        <GhostGeneralButton size="m" onClick={onClose}>
          <FormattedMessage id="cancel_button" />
        </GhostGeneralButton>
        <FlatButton
          size="m"
          disabled={disableReportButton}
          onClick={handleReport}
        >
          <FormattedMessage id="button_report" />
        </FlatButton>
      </ButtonContainer>
      <Spacer value={36} />
    </>
  );
};

export default ReportDialogComponent;
