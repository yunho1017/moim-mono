import * as React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { useRouteMatch } from "react-router-dom";
import useRedirect from "common/hooks/useRedirect";
import { MoimURL } from "common/helpers/url";
import MobileSearchForm from "../../components/inputBar/mobileSearchForm";
import { Input } from "../../components/inputBar/mobileSearchForm/styled";
import { MobileSearchIcon } from "../../components/inputBar/styled";

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

interface IProps {
  showInputBox?: boolean;
  initialValue?: string;
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}

const MobileSearchButton: React.FC<IProps> = ({
  showInputBox,
  initialValue,
  elementPaletteProps,
}) => {
  const intl = useIntl();
  const { params } = useRouteMatch<Moim.IMatchParams>();
  const redirect = useRedirect();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue ?? "");

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleEnter = React.useCallback(() => {
    if (value) {
      handleClose();
      if (params.tab) {
        redirect(
          new MoimURL.SearchWithTab({
            query: value,
            tab: params.tab,
          }).toString(),
        );
      } else {
        redirect(new MoimURL.Search({ query: value }).toString());
      }
    }
  }, [handleClose, params.tab, redirect, value]);

  const handleClickWrapper = React.useCallback(() => {
    handleOpen();
  }, [handleOpen]);

  const displayElement = React.useMemo(() => {
    if (showInputBox) {
      return (
        <InputContainer onClick={handleClickWrapper}>
          <MobileSearchIcon />
          <Input
            readOnly={true}
            value={value}
            placeholder={intl.formatMessage({ id: "search/placeholder" })}
          />
        </InputContainer>
      );
    }

    return (
      <MobileSearchIcon
        elementPaletteProps={elementPaletteProps}
        role="button"
        onClick={handleOpen}
      />
    );
  }, [
    elementPaletteProps,
    handleClickWrapper,
    handleOpen,
    intl,
    showInputBox,
    value,
  ]);

  return (
    <>
      {displayElement}
      <MobileSearchForm
        open={open}
        value={value}
        onChange={setValue}
        onEnter={handleEnter}
        onClose={handleClose}
      />
    </>
  );
};

export default MobileSearchButton;
