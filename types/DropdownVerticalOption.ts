export interface DropdownVerticalOption<T = string> {
  value: T
  title: string
}

export interface DropdownVerticalOptionUnion<T = string | number>
  extends DropdownVerticalOption<T> {}

export type DropdownVerticalOptionPropOption = import('vue').PropOptions<
  DropdownVerticalOption<number | string>[]
>
