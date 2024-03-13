/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * This type enforces that a given type T cannot have extra keys outside of the one defined in AllowedKeys
 * By default TypeScript allows extra keys not specified in the type and doesn't support Exact types yet
 * Related issue : https://github.com/Microsoft/TypeScript/issues/12936
 * Thanks to T6#2591 from TypeScript Community Discord for this userland solution
 */
type Exact<T, AllowedKeys> = Partial<
  Record<Exclude<keyof T, keyof AllowedKeys>, never>
> &
  (T extends never ? T : AllowedKeys);

type CreateComponentAllowedKeys = { actions?: any; state?: any; t?: any };

/**
 * Create a hook that can only return the following keys : actions, state, t
 * The purpose of this function is to enforce a standard way of writing and consuming hooks across the codebase
 */
const createComponentHook = <
  T,
  F extends (props: any) => CreateComponentAllowedKeys | void
>(
  fn: F & ((props: any) => Exact<T, CreateComponentAllowedKeys> | void)
): F => fn;

type DistributivePick<T, K extends keyof T> = T extends T ? Pick<T, K> : never;

type OmitStrict<T, K extends keyof T> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never;

export type { DistributivePick, OmitStrict };
export { createComponentHook };
