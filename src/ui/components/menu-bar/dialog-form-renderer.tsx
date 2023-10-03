import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/ui/select";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/components/ui/dialog";
import { Button } from "@/ui/components/ui/button";
import { Input } from "@/ui/components/ui/input";
import { Label } from "@/ui/components/ui/label";
import { DialogFormDataItem, FormComponent } from "@/types/dialog-form";
import { SelectProps } from "@/types/select";

interface DialogFormRendererProps {
  dialog?: DialogFormDataItem;
  setDialogOpen?: (open: boolean) => void;
}

export default function DialogFormRenderer(props: DialogFormRendererProps) {
  const { dialog, setDialogOpen } = props;
  const close = () => setDialogOpen?.(false);

  if (!dialog) return null;

  return (
    <>
      <DialogHeader>
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogDescription>{dialog.description}</DialogDescription>
      </DialogHeader>
      {dialog.components && (
        <form onSubmit={(event) => dialog?.onSubmit?.(event, close)}>
          <div className="grid gap-4 py-4">
            {dialog.components.map((component, ix) => {
              const { component: type, props } = component;

              if (type === FormComponent.Input) {
                const { children, ...inputProps } = props;
                return (
                  <div className="grid grid-cols-4 items-center gap-4" key={ix}>
                    <Label htmlFor={inputProps.name} className="text-right">
                      {children}
                    </Label>
                    <Input
                      id={inputProps.name}
                      className="col-span-3"
                      {...inputProps}
                    />
                  </div>
                );
              }

              if (type === FormComponent.Select) {
                const { children, placeholder, options, ...selectProps } =
                  props as SelectProps;
                return (
                  <div className="grid grid-cols-4 items-center gap-4" key={ix}>
                    <Label htmlFor={selectProps.name} className="text-right">
                      {children}
                    </Label>
                    <Select {...selectProps}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              return <></>;
            })}
          </div>
          <DialogFooter>
            {dialog.confirm && <Button type="submit">{dialog.confirm}</Button>}
          </DialogFooter>
        </form>
      )}
    </>
  );
}
