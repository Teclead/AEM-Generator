/**
 * Please use index.ts to import and export the models out of model folder
 */

// if we implement new ui we should add the file name extension

export enum FilePath {
  Path = 'templates/pathfield.template.xml',
  Text = 'templates/textfield.template.xml',
  RichText = 'templates/richtext.template.xml',
  Checkbox = 'templates/select.template.xml',
  Dropdown = 'templates/dropdown.template.xml',
  Number = 'templates/numberfield.template.xml',
  Multifield = 'templates/multifield.template.xml',
  Imagefield = 'templates/imagefield.template.xml',
  Tag = 'templates/tag.template.xml',
  Button = 'templates/button.template.xml',
  Dialog = 'templates/dialog.template.xml',
  Tab = 'templates/tab.template.xml',
  Component = 'templates/component.template.xml',
  Tracking = 'templates/tracking.template.xml',
  MultifieldNested = 'templates/multifieldNested.template.xml',
  CqDesignDialog = 'templates/cqDesignDialog.template.xml',
  HtmlTag = 'templates/htmlTag.template.xml',
  CqEditConfig = 'templates/cqEditConfig.template.xml',
}

export enum PlaceHolder {
  Common = '{{COMMON}}',
  Tab = '{{TABPLACEHOLDER}}',
  Element = 'ELNAME',
  Title = '{{TITLE}}',
  Value = '{{VALUE}}',
  Fields = '{{FIELDS}}',
  Field = '{{FIELD}}',
  Database = '{{DATABASE}}',
  Description = '{{DESC}}',
  Options = '{{OPTIONS}}',
  Group = '{{GROUP}}',
  TrackingEvents = '{{EVENTS}}',
  TrackingVars = '{{VARS}}',
  Required = '{{REQUIRED}}',
  MaxLength = '{{MAXLENGTH}}',
  isDisabled = '{{DISABLED}}',
  Max = '{{MAX}}',
  Min = '{{MIN}}',
  ComponentDescription = '{{COMP_DESCRIPTION}}',
  Tag = '{{TAG}}',
  Class = '{{CLASS}}',
  NoDecoration = '{{NO_DECORATION}}',
  IsContainer = '{{IS_CONTAINER}}',
  FullyQualifiedClassName = '{{PACKAGE_CLASS}}', // Optional, to replace standard ServerSideRenderingComponent with your own class.
  ResourceSuperType = '{{RESOURCE_SUPER_TYPE_PLACEHOLDER}}',
  StyleSheets = '{{STYLES}}',
  JavaScript = '{{javascript}}',
  VariableName = '{{VAR}}',
  Tariffspinner = '{{TARIFFSPINNER}}',
}
