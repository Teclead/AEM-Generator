/**
 * Please use index.ts to import and export the models out of model folder
 */

import { TouchUIField } from './TouchUIFieldEnum.model';
import * as options from './TouchUIFieldOptions.model';
import {
  HideFunction,
  OnChangeFunction,
  OnLoadFunction,
} from './TouchUIFunction.model';

// Custom TouchUiField Types
type CustomTextOptions<T> = T extends { [TouchUIField.Text]: unknown }
  ? T[TouchUIField.Text]
  : object;
type CustomRichTextOptions<T> = T extends { [TouchUIField.RichText]: unknown }
  ? T[TouchUIField.RichText]
  : object;
type CustomTextAreaOptions<T> = T extends { [TouchUIField.TextArea]: unknown }
  ? T[TouchUIField.TextArea]
  : object;
type CustomCheckboxOptions<T> = T extends { [TouchUIField.Checkbox]: unknown }
  ? T[TouchUIField.Checkbox]
  : object;
type CustomDropdownOptions<T> = T extends { [TouchUIField.Dropdown]: unknown }
  ? T[TouchUIField.Dropdown]
  : object;
type CustomPathOptions<T> = T extends { [TouchUIField.PathBrowser]: unknown }
  ? T[TouchUIField.PathBrowser]
  : object;
type CustomNumberOptions<T> = T extends { [TouchUIField.Number]: unknown }
  ? T[TouchUIField.Number]
  : object;
type CustomMultifieldNestedOptions<T> = T extends {
  [TouchUIField.MultifieldNested]: unknown;
}
  ? T[TouchUIField.MultifieldNested]
  : object;
type CustomButtonOptions<T> = T extends { [TouchUIField.Button]: unknown }
  ? T[TouchUIField.Button]
  : object;
type CustomImagefieldOptions<T> = T extends {
  [TouchUIField.Imagefield]: unknown;
}
  ? T[TouchUIField.Imagefield]
  : object;
type CustomDatePickerOptions<T> = T extends {
  [TouchUIField.DatePicker]: unknown;
}
  ? T[TouchUIField.DatePicker]
  : object;
type CustomHeadingOptions<T> = T extends { [TouchUIField.Heading]: unknown }
  ? T[TouchUIField.Heading]
  : object;
type CustomFieldSetOptions<T> = T extends { [TouchUIField.FieldSet]: unknown }
  ? T[TouchUIField.FieldSet]
  : object;
type CustomRadioGroupOtions<T> = T extends {
  [TouchUIField.RadioGroup]: unknown;
}
  ? T[TouchUIField.RadioGroup]
  : object;

export type TouchUIDialogFieldOptions<T = object> =
  | (options.TextOptions & CustomTextOptions<T>)
  | options.PathOptions
  | (options.PathBrowserOptions & CustomPathOptions<T>)
  | (options.RichTextOptions & CustomRichTextOptions<T>)
  | (options.TextAreaOptions & CustomTextAreaOptions<T>)
  | (options.CheckboxOptions & CustomCheckboxOptions<T>)
  | (options.DropdownOptions & CustomDropdownOptions<T>)
  | (options.NumberOptions & CustomNumberOptions<T>)
  | options.MultifieldOptions
  | (options.ImagefieldOptions & CustomImagefieldOptions<T>)
  | (options.ButtonOptions & CustomButtonOptions<T>)
  | (options.MultifieldNestedOptions<T> & CustomMultifieldNestedOptions<T>)
  | (options.DatePickerOptions & CustomDatePickerOptions<T>)
  | (options.HeadingOptions & CustomHeadingOptions<T>)
  | (options.FieldSetOptions<T> & CustomFieldSetOptions<T>)
  | (options.RadioGroupOptions & CustomRadioGroupOtions<T>);
export interface TouchUIDialogTab<T = object> {
  title: string;
  fields: Array<TouchUIDialogFieldOptions<T>>;
  hide?: HideFunction;
  onLoad?: OnLoadFunction;
  onChange?: OnChangeFunction;
}
export interface TouchUIAnalytics {
  events?: string[] | string;
  values?: string[] | string;
}
export interface AEMTouchUIDialog<T = object> {
  sightlyTemplate?: string; // this is the path to a html file.
  componentName: string; // componentName for selection in AEM.
  componentGroup: string; // componentGroup which contains the component.
  componentDescription: string; // Description about the component.
  componentPath: string; // Destination path for the creation of all files.
  /**
   * The value of the sling:resourceSuperType of
   * the Resource node or resource super type of
   * the resource pointed to by the resource type.
   */
  resourceSuperType?: string;
  tabs: Array<TouchUIDialogTab<T>>; // Tab-Object which holds the tabs and inside the fields for each tab.
  analytics?: TouchUIAnalytics; // Analytics-Object with variables and events for creation of the analytics files.
  noDecoration?: boolean; // This property can be added to a component and a true value forces AEM not to generate any wrapper elements over the component.
  isContainer?: boolean; // Indicates whether the component is a container component and therefore can contain other components such as a paragraph system.
  /**
   * Sets the Tag that should be used to wrap the component,
   * the wrapper element should be added to the current component that are editable.
   * For non-editable component,  the wrapper element can be avoided if it serves no particular function,
   * so that the resulting markup is not unnecessarily bloated.
   */

  tag?: string;
  css?: string; // classes that should be used in the tag
  noCqDesignDialog?: boolean; // conditionally build cqDesignDialog
  newPar?: boolean; // conditionally generate a new par component for containers
}

export interface Templates {
  buttonTemplate: string;
  checkboxTemplate: string;
  clientlibs: string;
  componentTemplate: string;
  cqDesignDialogTemplate: string;
  cqEditConfigTemplate: string;
  datePicker: string;
  dialogTemplate: string;
  dropdownTemplate: string;
  fieldSet: string;
  heading: string;
  hideFunctionTemplate: string;
  htmlTagTemplate: string;
  imagefieldTemplate: string;
  multifieldNestedTemplate: string;
  multifieldTemplate: string;
  newParTemplate: string;
  numberfieldTemplate: string;
  onChangeFunctionTemplate: string;
  onLoadFunctionTemplate: string;
  pathfieldTemplate: string;
  radioGroup: string;
  richtextTemplate: string;
  tabTemplate: string;
  tagTemplate: string;
  textfieldTemplate: string;
  trackingTemplate: string;
}
