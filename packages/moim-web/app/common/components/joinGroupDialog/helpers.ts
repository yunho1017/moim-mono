export function getHasSignUpConfig(
  group?: Moim.Group.INormalizedGroup | Moim.Group.IGroup | null,
) {
  return Boolean(
    group &&
      (group.sign_up_config_v2.phone?.state !== "deactivated" ||
        Object.keys(group.sign_up_config_v2.others).length > 0),
  );
}

export function getHasRequiredSignUpConfig(
  group?: Moim.Group.INormalizedGroup | Moim.Group.IGroup | null,
) {
  return Boolean(
    group &&
      (group.sign_up_config_v2.phone?.state === "required" ||
        Object.values(group.sign_up_config_v2.others).some(
          config => config.state === "required",
        )),
  );
}
