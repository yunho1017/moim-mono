import { useStoreState } from "app/store";

export default function useParentMoimUser(): Moim.User.IOriginalUserDatum | null {
  const { user } = useStoreState(state => ({ user: state.app.parentMoimUser }));

  return user;
}
