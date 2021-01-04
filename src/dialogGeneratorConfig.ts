import * as fs from 'fs';
import { Templates } from './models';

let templates: Templates = {} as any;
const exists = fs.existsSync('dialogGenerator.json');
if (exists) {
  const templatesPaths: any = fs.readFileSync('dialogGenerator.json');
  templates = JSON.parse(templatesPaths);
}
module.exports = {
  buttonTemplate: templates.buttonTemplate || '',
  componentTemplate: templates.componentTemplate || '',
  cqDesignDialogTemplate: templates.cqDesignDialogTemplate || '',
  cqEditConfigTemplate: templates.cqEditConfigTemplate || '',
  dialogTemplate: templates.dialogTemplate || '',
  dropdownTemplate: templates.dropdownTemplate || '',
  htmlTagTemplate: templates.htmlTagTemplate || '',
  imagefieldTemplate: templates.imagefieldTemplate || '',
  multifieldTemplate: templates.multifieldTemplate || '',
  multifieldNestedTemplate: templates.multifieldNestedTemplate || '',
  numberfieldTemplate: templates.numberfieldTemplate || '',
  pathfieldTemplate: templates.pathfieldTemplate || '',
  richtextTemplate: templates.richtextTemplate || '',
  checkboxTemplate: templates.checkboxTemplate || '',
  tabTemplate: templates.tabTemplate || '',
  textfieldTemplate: templates.textfieldTemplate || '',
  trackingTemplate: templates.trackingTemplate || '',
  newParTemplate: templates.newParTemplate || '',
};
