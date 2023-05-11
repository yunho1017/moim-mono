import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { FormattedMessage, useIntl } from "react-intl";
import { useActions, useStoreState } from "app/store";
import {
  nonePositionIdSelector,
  positionsSelectorById,
} from "app/selectors/position";
import { ActionCreators as EntityActionCreator } from "app/actions/entity";

import CollapsibleBox from "common/components/collapsibleBox";
import { Switch } from "common/components/designSystem/inputs";
import PositionSearchForm from "common/components/positionSearchForm";
import { IChipData } from "common/components/positionSearchForm/useHooks";
import SettingInput from "app/modules/settingMoim/components/settingInput";
import { useProps, useHandlers } from "./useHooks";
import { RIGHT_HOLDER_TYPE, VISIBLE_AUTHOR_INPUT_KEYS } from "./constants";
import {
  Wrapper,
  Title,
  FieldDescription,
  CollapseBoxHeaderStyle,
  CollapseBoxInnerWrapper,
  InnerSettingInputWrapper,
} from "./styled";
import { batchPositionData } from "common/helpers/batchService";
import AuthorRightSwitchInput from "./components/authorRightSwitchInput";

export interface IProps {
  channelId: Moim.Id;
  channelType: Moim.Channel.Type;
}

export interface IChangesRight {
  resource: Moim.Id;
  right: Moim.Permission.PermissionType;
  target: Moim.Permission.APPLIED_TYPE;
  limited?: Moim.Id[];
}

export interface IRefHandler {
  getRightsData(): IChangesRight[];
}

interface IFormFieldProps {
  title: React.ReactNode;
  name: Moim.Permission.PermissionType; // 권한 이름
  availableOptions: RIGHT_HOLDER_TYPE[];
  channelId?: Moim.Id;
  description?: React.ReactNode;
  initialOption?: RIGHT_HOLDER_TYPE;
  limited?: Moim.Id[];
  placeholder?: string;
  headerWrapperStyle?: FlattenInterpolation<any>;
  onChangeRightData(params: IChangesRight): void;
}

export const RightField: React.FC<IFormFieldProps> = React.memo(
  ({
    channelId,
    name,
    title,
    description,
    limited,
    initialOption = RIGHT_HOLDER_TYPE.ANYONE,
    availableOptions,
    placeholder,
    headerWrapperStyle,
    onChangeRightData,
  }) => {
    const intl = useIntl();
    const [isInitialed, setInitialed] = React.useState(false);
    const optionsObject = React.useMemo(
      () => ({
        [RIGHT_HOLDER_TYPE.ANYONE]: intl.formatMessage({
          id: "channel_settings/rights/right_holders_anyone",
        }),
        [RIGHT_HOLDER_TYPE.MEMBERS]: intl.formatMessage({
          id: "channel_settings/rights/right_holders_any_community_member",
        }),
        [RIGHT_HOLDER_TYPE.LIMITED]: intl.formatMessage({
          id: "channel_settings/rights/right_holders_limited",
        }),
      }),
      [intl],
    );
    const options = React.useMemo(
      () => availableOptions.map(opt => optionsObject[opt]),
      [availableOptions, optionsObject],
    );
    const limitedPosition = React.useMemo(
      () => limited?.filter(item => item.startsWith("P")) || [],
      [limited],
    );
    const visibleAuthorInput = React.useMemo(
      () => VISIBLE_AUTHOR_INPUT_KEYS.includes(name),
      [name],
    );
    const { positions, nonePositions } = useStoreState(state => ({
      positions: positionsSelectorById(state, limitedPosition),
      nonePositions: nonePositionIdSelector(state, limitedPosition),
    }));
    const { dispatchAddEntities } = useActions({
      dispatchAddEntities: EntityActionCreator.addEntity,
    });
    const [open, setOpen] = React.useState(
      initialOption === RIGHT_HOLDER_TYPE.LIMITED,
    );
    const [isPositionLoading, setIsPositionLoading] = React.useState(false);
    const [appliedType, setAppliedType] = React.useState<RIGHT_HOLDER_TYPE>(
      initialOption,
    );
    const [positionLimited, setPositionLimited] = React.useState<IChipData[]>(
      [],
    );
    const [positionEnable, setPositionEnable] = React.useState(true);
    const [authorEnable, setAuthorEnable] = React.useState(
      Boolean(limited?.includes("AUTHOR")),
    );

    const handleSetAppliedType = React.useCallback(
      (type: RIGHT_HOLDER_TYPE) => {
        if (availableOptions.includes(type)) {
          setAppliedType(type);
        } else {
          setAppliedType(initialOption);
        }
      },
      [availableOptions, initialOption],
    );

    const selectedAppliedOption = React.useMemo(() => {
      switch (appliedType) {
        case "ANYONE":
          return optionsObject.ANYONE;
        case "MEMBERS":
          return optionsObject.MEMBERS;
        case "LIMITED":
          return optionsObject.LIMITED;
      }
    }, [appliedType, optionsObject]);

    const handleChangePositionSwitch: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
      e => {
        setPositionEnable(e.currentTarget.checked);
        if (!e.currentTarget.checked) {
          setPositionLimited([]);
        }
      },
      [],
    );

    const handleChangeAuthorEnable = React.useCallback((option: boolean) => {
      setAuthorEnable(option);
    }, []);

    const handleOptionChange = React.useCallback(
      option => {
        switch (option) {
          case optionsObject[RIGHT_HOLDER_TYPE.LIMITED]: {
            if (appliedType !== RIGHT_HOLDER_TYPE.LIMITED) {
              setAuthorEnable(true);
            }
            setOpen(true);
            handleSetAppliedType(RIGHT_HOLDER_TYPE.LIMITED);
            break;
          }
          case optionsObject[RIGHT_HOLDER_TYPE.ANYONE]: {
            setOpen(false);
            handleSetAppliedType(RIGHT_HOLDER_TYPE.ANYONE);
            break;
          }

          case optionsObject[RIGHT_HOLDER_TYPE.MEMBERS]: {
            setOpen(false);
            handleSetAppliedType(RIGHT_HOLDER_TYPE.MEMBERS);
            break;
          }
        }
      },
      [appliedType, handleSetAppliedType, optionsObject],
    );

    React.useEffect(() => {
      if (initialOption === RIGHT_HOLDER_TYPE.LIMITED) {
        setOpen(true);
      }

      handleSetAppliedType(initialOption);
    }, [handleSetAppliedType, initialOption]);

    React.useEffect(() => {
      setAuthorEnable(Boolean(limited?.includes("AUTHOR")));
    }, [limited]);

    React.useEffect(() => {
      if (nonePositions.length) {
        setIsPositionLoading(true);
        batchPositionData(nonePositions).then(result => {
          setIsPositionLoading(false);
          setPositionLimited(
            positionLimited.map(position => {
              const positionEntity = result.positions[position.id];
              if (positionEntity) {
                return {
                  id: positionEntity.id,
                  text: positionEntity.name,
                  color: positionEntity.color,
                };
              }

              return position;
            }),
          );
          dispatchAddEntities(result);
        });
      }
    }, [dispatchAddEntities, nonePositions, positionLimited]);

    React.useEffect(() => {
      const newLimited = Boolean(positionLimited.length)
        ? positionLimited.map(item => item.id)
        : appliedType === "LIMITED"
        ? []
        : undefined;

      if (authorEnable && visibleAuthorInput) {
        newLimited?.push("AUTHOR");
      }
      onChangeRightData({
        resource: channelId || "",
        right: name,
        target: appliedType,
        limited: newLimited,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channelId, appliedType, positionLimited, authorEnable]);

    React.useEffect(() => {
      if (
        !isInitialed &&
        positions.length > 0 &&
        positions.length !== positionLimited.length
      ) {
        setPositionLimited(
          positions.map(position => ({
            id: position.id,
            text: position.name,
            color: position.color,
          })),
        );
        setInitialed(true);
      }
    }, [positions.length, positionLimited.length, positions, isInitialed]);

    return (
      <>
        <CollapsibleBox
          disableHeadClick={true}
          open={open}
          title={<Title isOpen={open}>{title}</Title>}
          options={options}
          selectedOption={selectedAppliedOption}
          headerWrapperStyle={headerWrapperStyle ?? CollapseBoxHeaderStyle}
          onOptionChange={handleOptionChange}
        >
          <CollapseBoxInnerWrapper>
            <div>
              {visibleAuthorInput && (
                <AuthorRightSwitchInput
                  checked={authorEnable}
                  onChange={handleChangeAuthorEnable}
                />
              )}
              <InnerSettingInputWrapper>
                <SettingInput
                  input={
                    <Switch
                      checked={positionEnable}
                      onChange={handleChangePositionSwitch}
                    />
                  }
                  direction="horizontal"
                  title={intl.formatMessage({ id: "select_position/title" })}
                />
              </InnerSettingInputWrapper>
              <PositionSearchForm
                name={name}
                readonly={!positionEnable}
                placeholder={
                  placeholder ??
                  intl.formatMessage({
                    id: "select_position/search_placeholder",
                  })
                }
                isPositionChipsLoading={isPositionLoading}
                chips={positionLimited}
                onChangeChips={setPositionLimited}
              />
            </div>
          </CollapseBoxInnerWrapper>
        </CollapsibleBox>
        {description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}
      </>
    );
  },
);

const ChannelRights = React.forwardRef<IRefHandler, IProps>((props, ref) => {
  const {
    channelId,
    rights,
    handleChangeRightData,
    getRightsData,
  } = useHandlers(useProps(props));

  React.useImperativeHandle(ref, () => ({ getRightsData }));
  const elements = React.useMemo(
    () =>
      rights.map(right => (
        <RightField
          channelId={channelId}
          key={`field_${right.key}`}
          name={right.key}
          initialOption={right.defaultRightHolder}
          availableOptions={right.availableRightHolder}
          title={<FormattedMessage id={right.textKey} />}
          description={
            right.descriptionKey ? (
              <FormattedMessage id={right.descriptionKey} />
            ) : (
              undefined
            )
          }
          limited={right.limited}
          onChangeRightData={handleChangeRightData}
        />
      )),
    [rights, channelId, handleChangeRightData],
  );

  return <Wrapper>{elements}</Wrapper>;
});

export default ChannelRights;
