import { InputProps } from "@/ui/components/ui/input";
import { SelectProps } from "@/types/select";
import { FormComponent } from "@/types/dialog-form";

export interface Component {
  component: FormComponent;
  props: InputProps | SelectProps;
}
