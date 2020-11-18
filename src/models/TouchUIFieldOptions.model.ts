/**
 * Please use index.ts to import and export the models out of the model folder
 */
import { TouchUIDialogFieldOptions } from "./AEMTouchUIDialogModels.model";
import { TouchUIField } from "./TouchUIFieldEnum.model";

export interface CommonOptions {
  description?: string;
  isRequired?: boolean;
  label: string;
  defaultValue?: string | boolean | number;
}

export interface BaseOptions extends CommonOptions {
  databaseName: string;
}

export interface TouchUIFieldOption {
  name: string;
  value: string | number;
}
export interface TextOptions extends BaseOptions {
  type: TouchUIField.Text;
  maxLength?: number;
}

export interface PathOptions extends BaseOptions {
  type: TouchUIField.Path;
}

export interface RichTextOptions extends BaseOptions {
  type: TouchUIField.RichText;
}

export interface TextAreaOptions extends BaseOptions {
  type: TouchUIField.TextArea;
  maxLength?: number;
}

export interface CheckboxOptions extends BaseOptions {
  type: TouchUIField.Checkbox;
  isDisabled?: boolean;
}

export interface DropdownOptions extends BaseOptions {
  type: TouchUIField.Dropdown;
  options: TouchUIFieldOption[];
}

export interface NumberOptions extends BaseOptions {
  type: TouchUIField.Number;
  max?: number;
  min?: number;
}

export interface MultifieldOptions extends BaseOptions {
  type: TouchUIField.Multifield;
  multifieldtype: TouchUIField;
}

export interface ImagefieldOptions extends BaseOptions {
  type: TouchUIField.Imagefield;
}

export interface ButtonOptions extends CommonOptions {
  type: TouchUIField.Button;
  javaScriptHandler?: string;
}

export interface MultifieldNestedOptions extends BaseOptions {
  type: TouchUIField.MultifieldNested;
  multifieldOptions: TouchUIDialogFieldOptions[];
}
