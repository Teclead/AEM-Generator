import * as fs from 'fs';
import { AEMTouchUIDialog } from './../models/AEMTouchUIDialogModels.model';
import { TouchUIXMLGenerator } from './../xmlTouchUIGenerator';
import { exampleTouchUIDialog } from './xmlTouchUIGenerator.test.data';

describe('xml generator for touch ui aem dialogs', () => {
  const UIGenerator = new TouchUIXMLGenerator(exampleTouchUIDialog);

  const touchUIDialogPath =
    './src/__tests___/results/touchUI/_cq_dialog/.content.xml';
  const analyticsPath =
    './src/__tests___/results/touchUI/analytics/.content.xml';
  const configPath = './src/__tests___/results/touchUI/.content.xml';
  const reactPath = './src/__tests___/results/touchUI/touchUI.html';
  const cqConfigPath = './src/__tests___/results/touchUI/_cq_editConfig.xml';
  const cqDesignDialogPath =
    './src/__tests___/results/touchUI/_cq_design_dialog/.content.xml';
  const htmlTagPath =
    './src/__tests___/results/touchUI/_cq_htmlTag/.content.xml';
  const newParPath = './src/__tests___/results/touchUI/new/.content.xml';

  const externalReactAppTemplate =
    './src/templates/reactExternal.template.html';

  [touchUIDialogPath, analyticsPath, configPath].forEach((file) => {
    try {
      fs.unlinkSync(file);
    } catch (e) {
      //
    }
  });
  UIGenerator.writeFilesToAEM();

  it('should print the touchUI dialog', () => {
    const renderedFile = fs.readFileSync(touchUIDialogPath).toString();
    expect(renderedFile).toMatchSnapshot();
  });

  it('should print the analytics file', () => {
    const renderedFile = fs.readFileSync(analyticsPath).toString();
    expect(renderedFile).toMatchSnapshot();
  });

  it('should print the new par file', () => {
    const renderedFile = fs.readFileSync(newParPath).toString();
    expect(renderedFile).toMatchSnapshot();
  });

  it('should print the component config file', () => {
    const renderedFile = fs.readFileSync(configPath).toString();
    expect(renderedFile).toMatchSnapshot();
  });

  it('should print the react template file', () => {
    const renderedFile = fs.readFileSync(reactPath).toString();
    expect(renderedFile).toMatchSnapshot();
  });

  it('should print the cq config file', () => {
    const renderedFile = fs.readFileSync(cqConfigPath).toString();
    expect(renderedFile).toMatchSnapshot();
  });

  it('should print the cq design dialog file', () => {
    const renderedFile = fs.readFileSync(cqDesignDialogPath).toString();
    expect(renderedFile).toMatchSnapshot();
  });

  it('should print the html-tag file', () => {
    const renderedFile = fs.readFileSync(htmlTagPath).toString();
    expect(renderedFile).toMatchSnapshot();
  });

  it('should print a template for a external react app', () => {
    const externalReactAppPath = './src/__tests___/results/externalReactApp';
    const externalreactPath =
      './src/__tests___/results/externalReactApp/externalReactApp.html';

    const config: AEMTouchUIDialog = {
      componentName: 'externalApp',
      sightlyTemplate: externalReactAppTemplate,
      componentGroup: 'External Group',
      componentDescription: '...',
      componentPath: externalReactAppPath,
      tabs: [],
    };
    const touchUIGenerator = new TouchUIXMLGenerator(config);
    touchUIGenerator.writeFilesToAEM();
    const renderedFile = fs.readFileSync(externalreactPath).toString();
    expect(renderedFile).toMatchSnapshot();
  });
});
