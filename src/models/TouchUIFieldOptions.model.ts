/**
 * Please use index.ts to import and export the models out of the model folder
 */

import { TouchUIDialogFieldOptions } from './AEMTouchUIDialogModels.model';
import { TouchUIField } from './TouchUIFieldEnum.model';
import { OptionKeys } from './TouchUIFieldOptionKeysEnum.model';
import { HideFunction } from './TouchUIFunction.model';


export interface CustomOptionAttribute {
  [key: string]: any;
}

export interface CommonOptions extends CustomOptionAttribute {
  [OptionKeys.Description]?: string;
  [OptionKeys.IsRequired]?: boolean;
  [OptionKeys.Label]: string;
  [OptionKeys.DefaultValue]?: string | boolean | number;
  [OptionKeys.HideFunction]?: HideFunction;
}

export interface DataSourceOptions {
  dataSource: string;
  attributes: CustomOptionAttribute;
}
export interface BaseOptions extends CommonOptions {
  [OptionKeys.DatabaseName]: string;
}

export interface TouchUIFieldOption {
  [OptionKeys.Selected]?: boolean;
  [OptionKeys.Name]: string;
  [OptionKeys.Value]: string | number;
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
}

export interface NumberOptions extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.Number;
  [OptionKeys.Max]?: number;
  [OptionKeys.Min]?: number;
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

export interface MultifieldNestedOptions extends BaseOptions {
  [OptionKeys.Type]: TouchUIField.MultifieldNested;
  [OptionKeys.MultiFieldOptions]: TouchUIDialogFieldOptions[];
}
