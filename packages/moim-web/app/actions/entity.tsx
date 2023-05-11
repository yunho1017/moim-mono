import { schema } from "normalizr";
import { EntityTypes } from "./types";
import { ActionUnion } from "./helpers";
import { ThunkPromiseResult } from "../store";
import { definitions } from "app/models";
import buffer from "common/helpers/buffer";
import mergeWithArrayConcatUniq from "common/helpers/mergeWithArrayConcatUniq";
import { getNormalizedBatchDataFromEntities } from "common/helpers/batchService";
import { ThunkResult, AppDispatch } from "app/store";
import { isEmpty } from "lodash";

const ONE_HOUR_MILLISECONDS = 3600000;

const ALWAYS_BATCH_CALL_ENTITIES: (keyof Moim.Entity.INormalizedData)[] = [
  "postTemplates",
];

function createAction<T extends { type: EntityTypes }>(d: T): T {
  return d;
}

export function AddEntities(
  entities: Partial<Moim.Entity.INormalizedData>,
): ThunkResult {
  return dispatch => {
    if (!isEmpty(entities)) {
      dispatch(ActionCreators.addEntity(entities));
    }
  };
}

export const ActionCreators = {
  addEntity: (
    entities: Partial<Moim.Entity.INormalizedData>,
    forceUpdate?: boolean,
  ) =>
    createAction({
      type: EntityTypes.ADD_ENTITY,
      payload: { ...entities, forceUpdate },
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

type RecordOfLoadEntities = Partial<
  Record<Moim.Entity.NormalizedKey, string[]>
>;

export const loadEntitiesAPI = buffer({
  ms: 100,
  async subscribedFn(data: RecordOfLoadEntities[]) {
    const entities = mergeWithArrayConcatUniq({}, ...data);
    return getNormalizedBatchDataFromEntities(entities);
  },
});

export function loadEntitiesDirectCore(
  data: RecordOfLoadEntities,
  // data: NormalizedSchema<any, any>,
): ThunkPromiseResult {
  return async (dispatch, getStore) => {
    if (Object.keys(data).length === 0) {
      return;
    }
    const { entities } = getStore();
    // compare of entities & result
    const loadEntitiesResult = Object.entries(entities).reduce<
      RecordOfLoadEntities
    >(
      (
        result,
        [key, values]: [
          keyof Moim.Entity.INormalizedData,
          Record<Moim.Id, any>,
        ],
      ) => {
        if (data[key]) {
          return {
            ...result,
            [key]: Array.from(
              new Set(
                data[key]!.filter(id => {
                  const notExists = !values.hasOwnProperty(id);
                  const expired =
                    values[id] && values[id].cachedAt
                      ? !(
                          Date.now() - values[id].cachedAt <
                          ONE_HOUR_MILLISECONDS
                        )
                      : false;
                  return (
                    notExists ||
                    expired ||
                    ALWAYS_BATCH_CALL_ENTITIES.includes(key)
                  );
                }),
              ),
            ),
          };
        }
        return result;
      },
      {},
    );
    // load Api of result
    const hasResultLength = Object.values(loadEntitiesResult).some(
      result => result && result.length,
    );
    if (hasResultLength) {
      const apiEntities = await loadEntitiesAPI(loadEntitiesResult);
      if (apiEntities) {
        dispatch(ActionCreators.addEntity(apiEntities));
        dispatch(loadEntitiesDirect(makeLoadEntityRecord(apiEntities)));
      }
    }
  };
}

let bufferLEDInstance: Function | undefined;

const bufferedLoadEntitiesDirect = (
  data: RecordOfLoadEntities,
  dispatch: AppDispatch,
) => {
  if (!bufferLEDInstance) {
    bufferLEDInstance = buffer({
      ms: 100,
      async subscribedFn(input: RecordOfLoadEntities[]) {
        const param = mergeWithArrayConcatUniq({}, ...input);
        return dispatch(loadEntitiesDirectCore(param));
      },
    });
  }
  bufferLEDInstance?.(data);
};

export function loadEntitiesDirect(
  data: RecordOfLoadEntities,
  // data: NormalizedSchema<any, any>,
): ThunkPromiseResult {
  return async dispatch => {
    if (Object.keys(data).length === 0) {
      return;
    }
    bufferedLoadEntitiesDirect(data, dispatch);
  };
}

export function fileBlockitExtractor(
  entity: Moim.Forum.INormalizedThreadContent[],
) {
  return entity.reduce<string[]>((rootResult, currentBlock) => {
    switch (currentBlock.type) {
      case "image": {
        if (currentBlock.fileId) {
          return [...rootResult, currentBlock.fileId];
        }
        return rootResult;
      }
      case "preview":
      case "file": {
        const result = currentBlock.files.reduce<string[]>(
          (preResult, currentData) => [...preResult, currentData],
          [],
        );
        return [...rootResult, ...result];
      }

      default: {
        return rootResult;
      }
    }
  }, []);
}

type EntityRecordHandler = (
  definitionResult: RecordOfLoadEntities,
  entity: any,
) => RecordOfLoadEntities;

const blockitEntityRecordHandler: EntityRecordHandler = (
  definitionResult,
  entity,
) => {
  const files = [
    ...(definitionResult.files || []),
    ...fileBlockitExtractor(entity.blockit),
  ];
  return {
    ...definitionResult,
    files,
  };
};

const entityRecordHandlerSet: Partial<{
  [key: string]: EntityRecordHandler;
}> = {
  blockit: blockitEntityRecordHandler,
};

const arraySchemaOrSchemaFieldFlatter = (
  definition: any,
  definitionResult: Partial<
    Record<keyof Moim.Entity.INormalizedData, string[]>
  > = {},
  entity: any,
  definitionKey: string,
): Partial<Record<keyof Moim.Entity.INormalizedData, string[]>> => {
  if (definition instanceof schema.Array) {
    if ((definition as any).schema.key) {
      return {
        ...definitionResult,
        /*
         * Normalizer의 Array 타입이 schema property를 드러내고 있지 않아서
         * any로 처리했습니다.
         * https://github.com/paularmstrong/normalizr/blob/master/index.d.ts#L6
         */
        [(definition as any).schema.key]: entity[definitionKey],
      };
    } else if (
      Object.keys((definition as any).schema).length > 0 &&
      entity[definitionKey] &&
      entity[definitionKey].length
    ) {
      const keys = Object.keys((definition as any).schema);
      return (entity[definitionKey] as any[]).reduce(
        (acc, itemEntity) =>
          keys.reduce(
            (acc2, field) =>
              arraySchemaOrSchemaFieldFlatter(
                (definition as any).schema[field],
                acc2,
                itemEntity,
                field,
              ),
            acc,
          ),
        definitionResult,
      );
    }
  }

  const def = definition as schema.Entity;

  if (def.key && entity[definitionKey]) {
    return {
      ...definitionResult,
      [def.key]: [
        ...(definitionResult[def.key as Moim.Entity.NormalizedKey] || []),
        entity[definitionKey],
      ],
    };
  }

  return definitionResult;
};

export function makeLoadEntityRecord(
  entities: Partial<Moim.Entity.INormalizedData>,
): RecordOfLoadEntities {
  return Object.entries(entities).reduce<RecordOfLoadEntities>(
    (
      result,
      [key, entityRecord]: [Moim.Entity.NormalizedKey, Record<Moim.Id, any>],
    ) => {
      const entityDefinition = definitions[key]!;
      if (entityDefinition) {
        const entityDefinitionEntries = Object.entries(entityDefinition);
        return {
          ...result,
          ...Object.values(entityRecord).reduce<RecordOfLoadEntities>(
            (entityResult, entity) =>
              mergeWithArrayConcatUniq(
                entityResult,
                entityDefinitionEntries.reduce<RecordOfLoadEntities>(
                  (definitionResult, [definitionKey, definition]) => {
                    // If not have a definitionKey
                    if (!entity.hasOwnProperty(definitionKey)) {
                      return definitionResult;
                    }

                    // TODO: definitionKey가 아닌 Schema의 Key로 대체가 필요합니다.
                    if (entityRecordHandlerSet[definitionKey]) {
                      const entityRecordHandler = entityRecordHandlerSet[
                        definitionKey
                      ] as EntityRecordHandler;

                      definitionResult = entityRecordHandler(
                        definitionResult,
                        entity,
                      );
                    }

                    return arraySchemaOrSchemaFieldFlatter(
                      definition,
                      { ...definitionResult },
                      entity,
                      definitionKey,
                    );
                  },
                  {},
                ),
              ),
            {},
          ),
        };
      }
      return result;
    },
    {},
  );
}

export function loadEntities(
  entities: Moim.Entity.INormalizedData,
  forceUpdate?: boolean,
): ThunkResult {
  return dispatch => {
    dispatch(ActionCreators.addEntity(entities, forceUpdate));
    dispatch(loadEntitiesDirect(makeLoadEntityRecord(entities)));
  };
}
