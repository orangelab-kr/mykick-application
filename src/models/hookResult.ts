export type HookResultValue<t, o = null | undefined> = t | o;
export type HookResultSetValue<t, o = null | undefined> = React.Dispatch<
  React.SetStateAction<t | o>
>;

export type HookResult<t, o = null | undefined> = [
  HookResultValue<t, o>,
  HookResultSetValue<t, o>,
];
