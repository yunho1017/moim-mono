export default function getIsUnread({
  lastRead,
  latest,
  statCount,
}: {
  lastRead: string;
  latest: string;
  statCount?: number;
}) {
  return latest > lastRead || (statCount ?? 0) > 0;
}
