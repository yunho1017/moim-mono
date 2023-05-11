export default function getDirectMessageTargetUser(
  currentUser?: Moim.User.INormalizedUser,
  members?: Moim.User.IUser[],
): Moim.User.IUser | undefined {
  if (!members?.find(member => member.id === currentUser?.id)) {
    return;
  }

  const returnUser =
    members?.filter(member => member.id !== currentUser?.id)[0] || currentUser;

  return returnUser.group_id !== "empty" ? returnUser : undefined;
}
