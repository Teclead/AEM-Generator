// import * as fs from 'fs';
import {
  TouchUIDialogFieldOptions,
  TouchUIDialogTab,
  TouchUIField,
} from '../models';
import { TouchUIXMLGenerator } from '../xmlTouchUIGenerator';
import { AEMTouchUIDialog } from './../models/AEMTouchUIDialogModels.model';

export class DialogGenerator extends TouchUIXMLGenerator {

  public getFields(fields: TouchUIDialogFieldOptions[]) {
      const template =  super.getFields(fields);
      
      if (this.has('acs-commons-nested')) {
        return this.replaceResourceType(template,  'container', 'granite/ui/components/foundation/form/fieldset');
      }

      return template;
  } 
}   

const fields: TouchUIDialogFieldOptions[] = [
  {
    label: 'Mein Textfeld',
    type: TouchUIField.Text,
    databaseName: 'label',
    isRequired: true,
    description: 'Meine Beschreibung für Textfeld...',
  },
  {
    label: 'Mein PathField',
    type: TouchUIField.Path,
    databaseName: 'path',
    description: 'Meine Beschreibung für PathField...',
  },
  {
    label: 'Mein Selectfeld',
    type: TouchUIField.Checkbox,
    databaseName: 'select',
    description: 'Meine Beschreibung für Select...',
    checked: true,
  },
  {
    label: 'Mein Numberfield',
    type: TouchUIField.Number,
    databaseName: 'numbwr',
    description: 'Meine Beschreibung für Numberfield...',
    max: 50,
    min: 20,
  },
  {
    label: 'Mein Imagefield',
    type: TouchUIField.Imagefield,
    databaseName: 'image',
    description: 'Meine Beschreibung für Imagefield',
    isRequired: true,
  },
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
    hide: ({contentPath}) => contentPath.includes('/de')
  },
  {
    label: 'Mein Dropdown mit DataSource',
    type: TouchUIField.Dropdown,
    databaseName: 'dropdown',
    description: 'Meine Beschreibung für Dropdown',
    options : {
      dataSource: 'path/to/java/servlet',
      attributes: { 
        'mode': 'placeholderOne', 
        'mode1': 'placeholderTwo'
    }
      
    },
  },
  {
    label: 'My Dropdown with only dataSource path ',
    type: TouchUIField.Dropdown,
    databaseName: 'dropdown',
    description: 'Meine Beschreibung für Dropdown',
    options : {
      dataSource: 'path/to/java/servlet'
    },
  },
  {
    label: 'Meine Textarea',
    type: TouchUIField.TextArea,
    databaseName: 'label',
    description: 'Meine Beschreibung für Textarea...',
    maxLength: 50,
  },
  {
    label: 'Mein Richtexteld',
    type: TouchUIField.RichText,
    databaseName: 'richtext',
    description: 'Meine Beschreibung für Richtext...',
  },
  {
    label: 'Mein Button',
    type: TouchUIField.Button,
    javaScriptHandler: 'alert(123)',
  },
];

const tabs: TouchUIDialogTab[] = [
  { title: 'Mein erstes Tab', fields },
  {
    title: 'Mein zweites Tab',
    fields: [
      {
        label: 'Mein Touch UI Multifield',
        type: TouchUIField.Multifield,
        description: 'Meine Beschreibung für das Multifield...',
        databaseName: 'multitouchuidatabase',
        multifieldtype: TouchUIField.Text,
      },
    ],
  },
  {
    title: 'Mein drittes Tab',
    fields: [
      {
        label: 'Nested Multifield',
        databaseName: 'multi',
        type: TouchUIField.MultifieldNested,
        multifieldOptions: fields.slice(5),
      },
    ],
  },
  {
    title: 'Mein viertes Tab',
    fields: [
      {
        label: 'Nested Multifield with JSON storage',
        databaseName: 'multi',
        'acs-commons-nested': "JSON_STORE",
        type: TouchUIField.MultifieldNested,
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
              ]
          },
        ]
      },
      {
        label: "6.2 Pathbrowser",
        type: TouchUIField.PathBrowser,
        databaseName: "pathBrowser",    
      },
    ],
    hide: ({contentPath}) => contentPath.includes('/it')
  },
];

const ReactTemplate =  './src/templates/react.template.html';
// const ReactTemplate =  fs.readFileSync('./src/templates/react.template.html').toString();
export const exampleTouchUIDialog: AEMTouchUIDialog = {
  sightlyTemplate: ReactTemplate,
  componentName: 'MyTestComponent',
  componentGroup: 'MyTestGroup',
  componentDescription: 'MyTestComponentDescription',
  noDecoration: false,
  isContainer: false,
  componentPath: './src/__tests___/results/touchUI',
  tag: 'div',
  css: 'sample-style',
  tabs,
  analytics: {
    values: ['value1', 'value2'],
    events: ['event1', 'event2'],
  },
  resourceSuperType: 'core/wcm/components/text/v2/text',
  newPar: true,
};
