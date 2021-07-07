/**
 * Please use index.ts to import and export the models out of the model folder
 */
import { TouchUIDialogFieldOptions } from './AEMTouchUIDialogModels.model';
import { TouchUIField } from './TouchUIFieldEnum.model';
import { HideFunction } from './TouchUIFunction.model';

export interface CommonOptions {
  description?: string;
  isRequired?: boolean;
  label: string;
  defaultValue?: string | boolean | number;
  hide?: HideFunction;
}

export interface DataSourceOptionAttribute {
  [key: string]: string;
}

export interface DataSourceOptions {
  dataSource: string;
  attributes: DataSourceOptionAttribute;
}
export interface BaseOptions extends CommonOptions {
  databaseName: string;
}

export interface TouchUIFieldOption {
  selected?: boolean;
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
  checked?: boolean;
  isDisabled?: boolean;
}

export interface DropdownOptions extends BaseOptions {
  type: TouchUIField.Dropdown;
  options: TouchUIFieldOption[] | DataSourceOptions;
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
