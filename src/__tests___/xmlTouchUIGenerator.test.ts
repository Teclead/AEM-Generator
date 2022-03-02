import * as fs from 'node:fs';
import { TouchUIField } from '../models';
import { AEMTouchUIDialog } from './../models/AEMTouchUIDialogModels.model';
import { TouchUIXMLGenerator } from './../xmlTouchUIGenerator';
import {
  DialogGenerator,
  exampleTouchUIDialog,
} from './xmlTouchUIGenerator.test.data';

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

  const clientlibsPath =
    './src/__tests___/results/touchUI/clientlibs/.content.xml';

  for (const file of [touchUIDialogPath, analyticsPath, configPath]) {
    try {
      fs.unlinkSync(file);
    } catch {
      //
    }
  }

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

  it('should print the clientlibs content xml', () => {
    const renderedFile = fs.readFileSync(clientlibsPath).toString();
    expect(renderedFile).toMatchSnapshot();
  });

  it('should print a template for a external react app', () => {
    const externalReactAppPath = './src/__tests___/results/externalReactApp';
    const externalreactPath =
      './src/__tests___/results/externalReactApp/externalReactApp.html';

    const config: AEMTouchUIDialog<object> = {
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

  it('should print a template for a extended version of TouchUIXMLGenerator', () => {
    const externalExtendedPath =
      './src/__tests___/results/extendedTouchUIXMLGenerator';

    const dialog: AEMTouchUIDialog<object> = {
      componentName: 'extended',
      sightlyTemplate: '<h1>my custom template...</h1>',
      componentGroup: 'Extended',
      componentDescription: '...',
      componentPath: externalExtendedPath,
      tabs: [
        {
          title: 'Mein viertes Tab',
          fields: [
            {
              label: 'Nested Multifield with JSON storage',
              databaseName: 'multi',
              type: TouchUIField.MultifieldNested,
              'acs-commons-nested': 'JSON_STORE',
              multifieldOptions: [
                {
                  label: 'Mein Dropdown',
                  type: TouchUIField.Dropdown,
                  databaseName: 'dropdown',
                  description: 'Meine Beschreibung für Dropdown',
                  options: [
                    { value: 1, name: 'Name 1' },
                    { value: 2, name: 'Name 2' },
                    { value: 3, name: 'Name 3', selected: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    new DialogGenerator(dialog).writeFilesToAEM();

    const touchUIDialogExtendedPath =
      './src/__tests___/results/extendedTouchUIXMLGenerator/_cq_dialog/.content.xml';

    const renderedFile = fs.readFileSync(touchUIDialogExtendedPath).toString();
    expect(renderedFile).toMatchSnapshot();
  });
});
