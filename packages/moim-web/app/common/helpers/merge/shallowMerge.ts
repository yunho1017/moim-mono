/**
 * this merge function is immutable
 */

function shallowMerge<TSource, TSource1>(
  source: TSource,
  source1: TSource,
): NonNullable<TSource & TSource1>;

function shallowMerge<TSource, TSource1, TSource2>(
  source: TSource,
  source1: TSource1,
  source2: TSource2,
): NonNullable<TSource & TSource1 & TSource2>;

function shallowMerge<TSource, TSource1, TSource2, TSource3>(
  source: TSource,
  source1: TSource1,
  source2: TSource2,
  source3: TSource3,
): NonNullable<TSource & TSource1 & TSource2 & TSource3>;

function shallowMerge<TSource, TSource1, TSource2, TSource3, TSource4>(
  source: TSource,
  source1: TSource1,
  source2: TSource2,
  source3: TSource3,
  source4: TSource4,
): NonNullable<TSource & TSource1 & TSource2 & TSource3 & TSource4>;

function shallowMerge<T>(originSource: T, ...sources: T[]): T {
  return sources.reduce<T>(
    (target, source) => ({
      ...target,
      ...source,
    }),
    originSource,
  );
}

export default shallowMerge;
