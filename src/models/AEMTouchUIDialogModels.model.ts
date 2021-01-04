/**
 * Please use index.ts to import and export the models out of model folder
 */

import * as options from './TouchUIFieldOptions.model';
export type TouchUIDialogFieldOptions =
  | options.TextOptions
  | options.PathOptions
  | options.RichTextOptions
  | options.TextAreaOptions
  | options.CheckboxOptions
  | options.DropdownOptions
  | options.NumberOptions
  | options.MultifieldOptions
  | options.ImagefieldOptions
  | options.ButtonOptions
  | options.MultifieldNestedOptions;

export interface AEMTouchUIDialog {
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
  tabs: TouchUIDialogTab[]; // Tab-Object which holds the tabs and inside the fields for each tab.
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

export interface TouchUIDialogTab {
  title: string;
  fields: TouchUIDialogFieldOptions[];
}

export interface TouchUIAnalytics {
  events?: string[] | string;
  values?: string[] | string;
}

export interface Templates {
  buttonTemplate: string;
  componentTemplate: string;
  cqDesignDialogTemplate: string;
  cqEditConfigTemplate: string;
  dialogTemplate: string;
  dropdownTemplate: string;
  htmlTagTemplate: string;
  imagefieldTemplate: string;
  multifieldTemplate: string;
  multifieldNestedTemplate: string;
  numberfieldTemplate: string;
  pathfieldTemplate: string;
  richtextTemplate: string;
  checkboxTemplate: string;
  tabTemplate: string;
  textfieldTemplate: string;
  trackingTemplate: string;
  newParTemplate: string;
}
