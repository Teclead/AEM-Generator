<p align="center">
  <img src="https://teclead-ventures.de/wp-content/uploads/2021/11/cropped-TLV-NEW_h_l.png"
     alt="Teclead Ventures Logo"
     width="100px"
     height="100px" />
</p>

# AEM Dialog Generator

This project contains the Custom Dialog Generator for AEM. The Library provides the creating of all necessary AEM Files (XML, HTML) to create an AEM component based on a TypeScript file, which describes the structure of the dialog and the component

## Development

The library can be run by executing builder.js. It is recommended to implement a script in the `package.json`, that looks like this

```json
“build:dialogues”: “node node_modules/@teclead/aem-generator/builder.js”,
```

Building the dialogues can then be executed by running

```bash
npm run build:dialogues
```

## Touch UI fields

The default props for the touch ui fields will be define with `TouchUIFieldOptionKeysEnum.model.ts`
Expand the default props with the enum

## API

The following example shows a \*.dialog.ts file with the necessary configuration for the creating of an AEM component.

### Full Example

```typescript
import {
  TouchUIDialogFieldOptions,
  TouchUIDialogTab,
  TouchUIField,
  AEMTouchUIDialog
} from '@teclead/aem-generator/models';

import {
  TouchUIXMLGenerator
} from '@teclead/aem-generator';

const fields: TouchUIDialogFieldOptions[] = [
  {
    label: 'Mein Textfeld',
    type: TouchUIField.Text,
    databaseName: 'label',
    isRequired: true,
    description: 'Meine Beschreibung für Textfeld...'
  },
  {
    label: 'Mein PathField',
    type: TouchUIField.Path,
    databaseName: 'path',
    description: 'Meine Beschreibung für PathField...',
  },
  ...]


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
        multifieldtype: TouchUIField.Text
      }
    ]
  },
  ...]


export const dialog: AEMTouchUIDialog = {
  sightlyTemplate: ReactTemplate, // HTML String
  componentName: 'MyTestComponent',
  componentGroup: 'MyTestGroup',
  componentDescription: 'MyTestComponentDescription',
  componentPath: './src/__tests___/results/touchUI',
  tabs,
  resourceSuperType: 'core/wcm/components/text/v2/text',
};

new TouchUIXMLGenerator(dialog).writeFilesToAEM();
```

The variable fields: `TouchUIDialogFieldOptions[]` describes the individual fields of the Dialog. `label`, `type`, `databaseName` are always required,
all additional configurations are optional and also based on the selected type. To select the Type the TouchUiField-Object should be include and the wanted field-type needs to be selected in the properties. You can add custom additional common keys for own implementations on touch ui dialog field level.

The `hide` property is optional and can be used to hide a dialog field inside a specific condition. This property uses a function where return a boolean.

```typescript
const fields: TouchUIDialogFieldOptions[] = [{
    label: 'Mein Button',
    type: TouchUIField.Button,
    'acs-commons-nested': "JSON_STORE",
    databaseName: 'btn',
    javaScriptHandler: 'alert(123)',
    hide: ({contentPath: '/path/to/content'}) => contentPath.includes('/to'),
},
...
];
```

The `onLoad` property is optional and can be used to execute a function after the dialog is loaded. This property uses a function where return a void.

```typescript
const fields: TouchUIDialogFieldOptions[] = [{
    label: 'Mein Button',
    type: TouchUIField.Button,
    databaseName: 'btn',
    onLoad: ({ contentPath }) => {
      console.log(contentPath);
    },
},
...
];
```

The `onChange` property is optional and can be used to execute a function after a TouchUI field has changed. This property uses a function where return a void. The `targetElement` is an HTMLElement or an array of HTMLElements which can be used to manipulate the DOM. To get this to work, you need to setup the field `onChangeTarget` and if you want to use a custom class name, you have to set the property `className` in the target field.

```typescript
const fields: TouchUIDialogFieldOptions[] = [
  {
    label: 'Mein Dropdown',
    type: TouchUIField.Dropdown,
    databaseName: 'dropdown',
    onChange: ({ contentPath, targetElement }) => {
      console.log(contentPath, targetElement);
    },
    onChangeTarget: 'my-button-class',
  },
  {
    label: 'Mein Button',
    type: TouchUIField.Button,
    databaseName: 'btn',
    className: 'my-button-class',
  }
...
];
```

For further information check out the individual interfaces for the different field types.

Side-Node: The button offers to execute javaScript code with the `onClick` listener by adding the `javaScriptHandler`-Property.



The variable tabs: `TouchUiDialogTab[]` describes the required tabs for the dialog, it hold a title and a field property. The field property should hold the value of the fields: `TouchUIDialogFieldOptions[]` variable. If more than one tab is used, then obviously more than one fields: `TouchUIDialogFieldOptions[]` variable needs to be configured. The `hide` property is optional and can be used to `hide` a tab inside a specific condition. This property uses a function where return a boolean.

```typescript
const tabs: TouchUIDialogTab[] = [
  { title: 'Mein erstes Tab', fields, hide: ({contentPath: '/path/to/content'}) => contentPath.includes('/to') },
  ...
]
```

The sightlyTemplate variable is referencing the HTMl-Template that is used to build the AEM component. It is mandatory to create this reference on a component Level.

```typescript
const sightlyTemplate = '<h1>my custom template...</h1>';
```

The exampleTouchUiDialog: `AEMTouchUIDialog` variable describes the configuration of the AEM component. It holds the reference to the sightlyTemplate, the component name, the component group, the component description, tabs and the component path (destination path) as required inputs and a couple of optional properties than can be configured. For more Information check out the Interfaces.

```typescript
export const exampleTouchUIDialog: AEMTouchUIDialog = {
  sightlyTemplate: sightlyTemplate,
  componentName: 'MyTestComponent',
  componentGroup: 'MyTestGroup',
  componentDescription: 'MyTestComponentDescription',
  componentPath: './src/__tests___/results/touchUI',
  tabs: tabs,
};
```

### Full example for a simple component

```typescript
import { AEMTouchUIDialog, TouchUIField } from '@teclead/aem-generator/models';
import { TouchUIXMLGenerator } from '@teclead/aem-generator';
import {
  COMPONENTPATH,
  COMPONENT_GROUP,
  REACT_TEMPLATE,
} from '../Commons/commons';

const dropDownOptions = [
  { value: 'val1', name: 'Label 1' },
  { value: 'val2', name: 'Label 2' },
];

export const ctaDialog: AEMTouchUIDialog = {
  componentPath: COMPONENTPATH + 'ctaReact',
  sightlyTemplate: REACT_TEMPLATE,
  componentName: 'Button-React',
  componentGroup: COMPONENT_GROUP,
  tabs: [
    {
      title: 'My first Tab',
      fields: [
        { label: 'Text field', databaseName: 'text', type: TouchUIField.Text },
        {
          label: 'Text Area',
          databaseName: 'textArea',
          type: TouchUIField.TextArea,
        },
        {
          label: 'Dropdown field',
          databaseName: 'dropdown',
          type: TouchUIField.Dropdown,
          options: dropDownOptions,
        },
        { label: 'Pathfield', databaseName: 'path', type: TouchUIField.Path },
        {
          label: 'Checkbox',
          databaseName: 'check',
          type: TouchUIField.Checkbox,
        },
        { label: 'Image', databaseName: 'img', type: TouchUIField.Imagefield },
      ],
    },
  ],
};

new TouchUIXMLGenerator(ctaDialog).writeFilesToAEM(); // will write the files when npm build:dialogues is called
```

## TouchUIXMLGenerator extended

The TouchUIXMLGenerator can be extended for own implementation on touch ui dialog field level
for this you can add custom additional common keys e.g. acs-commons-nested, inside TouchUIDialogFieldOptions

```typescript
const tabs = [
  {
    title: 'Mein viertes Tab',
    fields: [
        {
          label: 'Nested Multifield with JSON storage',
          databaseName: 'multi',
          type: TouchUIField.MultifieldNested,
          'acs-commons-nested': "JSON_STORE",
          multifieldOptions: [ ... ]
        },
        ...
    ]
  },
  ...
]

class DialogGenerator extends TouchUIXMLGenerator {

  public getFields(fields: TouchUIDialogFieldOptions[]) {
      const template =  super.getFields(fields);

      if (this.has('acs-commons-nested')) {
        return this.replaceResourceType(template,  'container', 'granite/ui/components/foundation/form/fieldset');
      }

      return template;
  }
}
const dialog: AEMTouchUIDialog = {
  componentPath: COMPONENTPATH + "ctaReact",
  sightlyTemplate: REACT_TEMPLATE,
  componentName: "Button-React",
  componentGroup: COMPONENT_GROUP,
  tabs
}

new DialogGenerator(dialog).writeFilesToAEM();
```


## Contributing
If you want to contribute on this project, check out our [Contribution Guidelines](https://github.com/Teclead/AEM-Generator/tree/master/.github/CONTRIBUTING.md).