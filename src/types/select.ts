import { SelectProps as BaseSelectProps } from "@radix-ui/react-select";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends BaseSelectProps {
  placeholder?: string;
  options: SelectOption[];
}
