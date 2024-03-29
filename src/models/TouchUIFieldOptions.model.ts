/**
 * Please use index.ts to import and export the models out of the model folder
 */

import { TouchUIDialogFieldOptions } from './AEMTouchUIDialogModels.model';
import { TouchUIField } from './TouchUIFieldEnum.model';
import { OptionKeys } from './TouchUIFieldOptionKeysEnum.model';
import {
  HideFunction,
  OnChangeFunction,
  OnLoadFunction,
} from './TouchUIFunction.model';

export interface CustomOptionAttribute {
  [key: string]: any;
}

export interface CommonOptions extends CustomOptionAttribute {
  [OptionKeys.Description]?: string;
  [OptionKeys.IsRequired]?: boolean;
  [OptionKeys.Label]: string;
  [OptionKeys.HideFunction]?: HideFunction;
  [OptionKeys.OnLoadFunction]?: OnLoadFunction;
  [OptionKeys.OnLoadTarget]?: string;
  [OptionKeys.OnChangeFunction]?: OnChangeFunction;
  [OptionKeys.OnChangeTarget]?: string;
  [OptionKeys.ClassName]?: string;
}

export interface DataSourceOptions {
  dataSource: string;
  attributes?: CustomOptionAttribute;
}
export interface BaseOptions extends CommonOptions {
  [OptionKeys.DatabaseName]: string;
}

export interface TouchUIFieldOption {
  [OptionKeys.Selected]?: boolean;
  [OptionKeys.Name]: string;
  [OptionKeys.Value]: string | number;
  [OptionKeys.OnLoadFunction]?: OnLoadFunction;
}
export interface TextOptions extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.Text;
  [OptionKeys.MaxLength]?: number;
}
export interface PathOptions extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.Path;
}

export interface PathBrowserOptions extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.PathBrowser;
  [OptionKeys.Value]?: string;
}

export interface RichTextOptions extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.RichText;
}

export interface TextAreaOptions extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.TextArea;
  [OptionKeys.MaxLength]?: number;
}

export interface CheckboxOptions extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.Checkbox;
  [OptionKeys.Checked]?: boolean;
  [OptionKeys.IsDisabled]?: boolean;
}

export interface DropdownOptions extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.Dropdown;
  [OptionKeys.Options]: TouchUIFieldOption[] | DataSourceOptions;
  [OptionKeys.Value]?: string | number;
}

export interface NumberOptions extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.Number;
  [OptionKeys.Max]?: number;
  [OptionKeys.Min]?: number;
  [OptionKeys.Value]?: number | string;
  [OptionKeys.DefaultValue]?: number | string;
}

export interface MultifieldOptions extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.Multifield;
  [OptionKeys.MultiFieldType]: TouchUIField;
}

export interface ImagefieldOptions extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.Imagefield;
}

export interface ButtonOptions extends CommonOptions {
  [OptionKeys.Type]: TouchUIField.Button;
  [OptionKeys.JavaScriptHandler]?: string;
}

export interface MultifieldNestedOptions<T> extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.MultifieldNested;
  [OptionKeys.MultiFieldOptions]: Array<TouchUIDialogFieldOptions<T>>;
}

export interface DatePickerOptions extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.DatePicker;
  [OptionKeys.Value]?: string;
  displayedFormat: 'YYYY-MM-DD HH:mm' | string;
  minDate?: 'today' | string;
  // type in XML
  dateType: 'datetime' | 'date' | 'time';
}

interface NoneBaseField {
  [key: string]: any;
}
export interface HeadingOptions extends NoneBaseField {
  [OptionKeys.Type]: TouchUIField.Heading;
  text: string;
  // {Long}4
  level: number;
}
export interface FieldSetOptions<T> extends NoneBaseField {
  [OptionKeys.Type]: TouchUIField.FieldSet;
  options: Array<TouchUIDialogFieldOptions<T>>;
  label: string;
}
export interface RadioGroupOptions extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.RadioGroup;
  [OptionKeys.Value]?: string | number;
  options: Array<{
    text: string;
    value: string;
    // checked?: boolean
  }>;
  vertical?: boolean;
}
