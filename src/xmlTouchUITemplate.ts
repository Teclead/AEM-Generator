import * as fs from 'fs';
import * as path from 'path';
import { FilePath } from './models';
const Template = require('./dialogGeneratorConfig');
import('./dialogGeneratorConfig');
export const getFile = (filePath: string) => {
  return fs.readFileSync(filePath).toString();
};

const CommonField =
  'name="{{DATABASE}}" fieldLabel="{{TITLE}}"{{VALUE}} {{REQUIRED}} {{DESC}} {{DISABLED}} {{CLASSNAME}} {{CUSTOM_ATTRIBUTE}}';

// here we may get costum template path or we use the defuelt template
export const template = {
  commonField: CommonField,
  dialog: getFile(Template.dialogTemplate || path.resolve(__dirname, FilePath.Dialog)),
  tab: getFile(Template.tabTemplate || path.resolve(__dirname, FilePath.Tab)),
  textfield: getFile(Template.textfieldTemplate || path.resolve(__dirname, FilePath.Text)),
  richtext: getFile(Template.richtextTemplate || path.resolve(__dirname, FilePath.RichText)),
  numberfield: getFile(Template.numberfieldTemplate || path.resolve(__dirname, FilePath.Number)),
  pathfield: getFile(Template.pathfieldTemplate || path.resolve(__dirname, FilePath.Path)),
  checkbox: getFile(Template.checkboxTemplate || path.resolve(__dirname, FilePath.Checkbox)),
  dropdown: getFile(Template.dropdownTemplate || path.resolve(__dirname, FilePath.Dropdown)),
  multiField: getFile(Template.multifieldTemplate || path.resolve(__dirname, FilePath.Multifield)),
  multiFieldNested: getFile(Template.multifieldNestedTemplate || path.resolve(__dirname, FilePath.MultifieldNested)),
  datePicker: getFile(Template.datePicker || path.resolve(__dirname, FilePath.DatePicker)),
  heading: getFile(Template.heading || path.resolve(__dirname, FilePath.Heading)),
  fieldSet: getFile(Template.fieldSet || path.resolve(__dirname, FilePath.FieldSet)),
  radioGroup: getFile(Template.radioGroup || path.resolve(__dirname, FilePath.RadioGroup)),
  tracking: getFile(Template.trackingTemplate || path.resolve(__dirname, FilePath.Tracking)),
  component: getFile(Template.componentTemplate || path.resolve(__dirname, FilePath.Component)),
  cqEditConfig: getFile(Template.cqEditConfigTemplate || path.resolve(__dirname, FilePath.CqEditConfig)),
  htmlTag: getFile(Template.htmlTagTemplate || path.resolve(__dirname, FilePath.HtmlTag)),
  tag: getFile(Template.tagTemplate || path.resolve(__dirname, FilePath.Tag)),
  button: getFile(Template.buttonTemplate || path.resolve(__dirname, FilePath.Button)),
  imagefield: getFile(Template.imagefieldTemplate || path.resolve(__dirname, FilePath.Imagefield)),
  cqDesignDialog: getFile(Template.cqDesignDialogTemplate || path.resolve(__dirname, FilePath.CqDesignDialog)),
  newPar: getFile(Template.newParTemplate || path.resolve(__dirname, FilePath.NewPar)),
  clientlibs: getFile(Template.clientlibs || path.resolve(__dirname, FilePath.Clientlibs)),
};
