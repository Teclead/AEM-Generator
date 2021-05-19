// import * as fs from 'fs';
import {
  TouchUIDialogFieldOptions,
  TouchUIDialogTab,
  TouchUIField,
} from '../models';
import { AEMTouchUIDialog } from './../models/AEMTouchUIDialogModels.model';

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
  { title: 'Mein erstes Tab', fields, hide: () => location.href.includes('/de') },
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
      /* {
        label: 'Tag',
        databaseName: 'tag',
        type: TouchUIField.Tag,
        description: 'Tolle Tags'
      } */
    ],
    hide: (params) => {
      console.log(params);
      return params?.contentPath.includes('/it')
    }
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
  clientlibsCategories: ['cq.authoring.dialog']
};
