import * as fs from 'fs';
import { Templates } from './models';

let templates: Templates = {} as any;
const exists = fs.existsSync('dialogGenerator.json');

if (exists) {
  const templatesPaths: any = fs.readFileSync('dialogGenerator.json');
  templates = JSON.parse(templatesPaths);
}

const parsedTemplates: Templates = {
  buttonTemplate: templates.buttonTemplate || '',
  checkboxTemplate: templates.checkboxTemplate || '',
  clientlibs: templates.clientlibs || '',
  componentTemplate: templates.componentTemplate || '',
  cqDesignDialogTemplate: templates.cqDesignDialogTemplate || '',
  cqEditConfigTemplate: templates.cqEditConfigTemplate || '',
  datePicker: templates.datePicker || '',
  dialogTemplate: templates.dialogTemplate || '',
  dropdownTemplate: templates.dropdownTemplate || '',
  fieldSet: templates.fieldSet || '',
  heading: templates.heading || '',
  hideFunctionTemplate: templates.hideFunctionTemplate || '',
  htmlTagTemplate: templates.htmlTagTemplate || '',
  imagefieldTemplate: templates.imagefieldTemplate || '',
  multifieldNestedTemplate: templates.multifieldNestedTemplate || '',
  multifieldTemplate: templates.multifieldTemplate || '',
  newParTemplate: templates.newParTemplate || '',
  numberfieldTemplate: templates.numberfieldTemplate || '',
  onChangeFunctionTemplate: templates.onChangeFunctionTemplate || '',
  onLoadFunctionTemplate: templates.onLoadFunctionTemplate || '',
  pathfieldTemplate: templates.pathfieldTemplate || '',
  radioGroup: templates.radioGroup || '',
  richtextTemplate: templates.richtextTemplate || '',
  tabTemplate: templates.tabTemplate || '',
  tagTemplate: templates.tagTemplate || '',
  textfieldTemplate: templates.textfieldTemplate || '',
  trackingTemplate: templates.trackingTemplate || '',
};

export default parsedTemplates;
