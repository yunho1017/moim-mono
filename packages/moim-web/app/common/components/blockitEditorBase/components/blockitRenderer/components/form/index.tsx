import * as React from "react";
import { FormattedMessage } from "react-intl";
import { FlattenInterpolation } from "styled-components";
import { useActions } from "app/store";
import {
  doBlockAction as doBlockActionDispatch,
  ActionCreators as ReferenceBlockActionCreators,
} from "app/actions/referenceBlock";
import AlertDialog from "common/components/alertDialog";
import { IButton } from "common/components/modalLayout/alert/types";
import BlockitRenderer from "../..";
import { ButtonElement } from "../buttons";
import {
  textValidCheck,
  numberValidCheck,
} from "../inputs/textInput/validCheck";
import { Wrapper, Body, Footer, ButtonWrapper } from "./styled";
import { PluginPanelContext } from "app/modules/secondaryView/plugin/context";

type IProps = Omit<Moim.Blockit.IFormBlock, "type"> & {
  wrapperStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
  gridWrapperStyle?: FlattenInterpolation<any>;
  gridItemStyle?: FlattenInterpolation<any>;
};

const FormBlock: React.FC<IProps> = ({
  buttons,
  blocks,
  botId,
  actionId,
  params,
  wrapperStyle,
  margin,
  gridWrapperStyle,
  gridItemStyle,
  confirm,
}) => {
  const isInPluginPanel = React.useContext(PluginPanelContext);
  const [openAlert, setOpenAlertStatus] = React.useState(false);
  const [waiting, setWaiting] = React.useState(false);
  const [inputValidations, setInputValidations] = React.useState<{
    [key: string]: boolean;
  }>({});
  const refForm = React.useRef<HTMLFormElement>(null);
  const { doBlockAction, closeModal } = useActions({
    doBlockAction: doBlockActionDispatch,
    closeModal: ReferenceBlockActionCreators.closeBlockitModal,
  });

  const submitEnable = React.useMemo(
    () =>
      Object.entries(inputValidations).reduce(
        (prevChecks, validation) => prevChecks && validation[1],
        true,
      ),
    [inputValidations],
  );

  const closeAlertModal = React.useCallback(() => {
    setOpenAlertStatus(false);
  }, []);

  const handleCancel: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      setWaiting(false);
      closeModal();
    },
    [closeModal],
  );

  const submitAction = React.useCallback(async () => {
    const invalids: string[] = [];
    const dataHash: { [key: string]: any } = {};
    const dataFields = blocks
      .filter(block => block.type === "input")
      .map((block: Moim.Blockit.IInputBlock) => block.name);

    dataFields.forEach(key => {
      const element = refForm.current?.elements.namedItem(key) as any;
      if (element) {
        invalids.push(element.dataset.invalid);

        switch (element.type) {
          case "checkbox": {
            dataHash[key] = element.checked;
            break;
          }
          case "number": {
            let val = 0;
            try {
              val = parseFloat(element.value ? element.value : "0");
            } catch {
              val = 0;
            }
            dataHash[key] = val;
            break;
          }
          default: {
            dataHash[key] = element.value ?? "";
            break;
          }
        }
      }
    });

    if (botId && actionId && !invalids.includes("true")) {
      setWaiting(true);
      closeAlertModal();
      await doBlockAction(
        {
          botId,
          data: {
            actionId,
            params: {
              ...params,
              ...dataHash,
            },
          },
        },
        isInPluginPanel,
      );
      setWaiting(false);
    }
  }, [
    actionId,
    blocks,
    botId,
    closeAlertModal,
    doBlockAction,
    isInPluginPanel,
    params,
  ]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    e => {
      e.preventDefault();
      if (confirm) {
        setOpenAlertStatus(true);
      } else {
        submitAction();
      }
    },
    [confirm, submitAction],
  );

  const handleInputChange: Moim.Blockit.IInputBlockChangeEvent = React.useCallback(
    (_, validate, e) => {
      const name = e.name;
      if (name) {
        setInputValidations(s => ({
          ...s,
          [name]: e.required ? !validate : true,
        }));
      }
    },
    [],
  );

  const elements = React.useMemo(
    () =>
      blocks.map((block, idx) => {
        let blockDatum = block;
        if (block.type === "input") {
          let initialCheck = false;
          const initValue = block.element.initialValue;
          if (initValue) {
            if (block.element.type === "text-input") {
              initialCheck = !textValidCheck(
                initValue.toString(),
                block.element,
              );
            } else if (block.element.type === "number-input") {
              initialCheck = !numberValidCheck(
                initValue.toString(),
                block.element,
              );
            }
          }

          setInputValidations(s => ({
            ...s,
            [block.name]: block.element.required ? initialCheck : true,
          }));
          blockDatum = {
            ...block,
            onChange: handleInputChange,
          };
        }
        return (
          <BlockitRenderer
            key={`${block.type}_${idx}`}
            gridWrapperStyle={gridWrapperStyle}
            gridItemStyle={gridItemStyle}
            block={blockDatum}
          />
        );
      }),
    [blocks, gridItemStyle, gridWrapperStyle, handleInputChange],
  );

  const buttonElements = React.useMemo(() => {
    const array = [
      <ButtonWrapper>
        <ButtonElement
          key="submit_btn"
          type="submit"
          withoutWrapper={true}
          element={{
            ...buttons.submit,
            status: submitEnable ? "enabled" : "disabled",
          }}
          isWaiting={waiting}
        />
      </ButtonWrapper>,
    ];
    if (buttons.cancel) {
      array.unshift(
        <ButtonWrapper>
          <ButtonElement
            key="cancel_btn"
            withoutWrapper={true}
            onClick={handleCancel}
            element={{
              ...buttons.cancel,
              status: waiting ? "disabled" : undefined,
            }}
          />
        </ButtonWrapper>,
      );
    }

    return array;
  }, [buttons.submit, buttons.cancel, submitEnable, waiting, handleCancel]);

  const alertButtons = React.useMemo(() => {
    const btns: IButton[] = [
      {
        text: <FormattedMessage id="ok_button" />,
        onClick: submitAction,
      },
    ];
    if (confirm?.showCancelButton) {
      btns.unshift({
        text: <FormattedMessage id="cancel_button" />,
        onClick: closeAlertModal,
      });
    }
    return btns;
  }, [closeAlertModal, confirm, submitAction]);

  return (
    <Wrapper
      overrideStyle={wrapperStyle}
      margin={margin}
      ref={refForm}
      onSubmit={handleSubmit}
    >
      <Body>{elements}</Body>
      <Footer>{buttonElements}</Footer>
      {confirm ? (
        <AlertDialog
          open={openAlert}
          title={confirm.message}
          onClose={closeAlertModal}
          rightButtons={alertButtons}
        />
      ) : null}
    </Wrapper>
  );
};

export default FormBlock;
