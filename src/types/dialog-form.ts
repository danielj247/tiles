import { FormEvent } from "react";
import { Component } from "@/types/component";

export enum FormComponent {
  Input = "input",
  Select = "select",
}

export interface DialogFormDataItem {
  title: string;
  description?: string;
  components?: Component[];
  confirm?: string;
  onSubmit?: (event: FormEvent, close: () => void) => void;
}

export interface DialogFormData {
  [key: string]: DialogFormDataItem;
}
