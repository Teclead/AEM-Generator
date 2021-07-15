<img src="https://teclead.de/assets/custom_img/teclead_black.svg"
     alt="Teclead Logo"
     style="float: right; width:250px" />

# AEM Dialog Generator

This project contains the Custom Dialog Generator for AEM. The Library provides the creating of all necessary AEM Files (XML, HTML) to create an AEM component
based on a TypeScript file, which describes the structure of the dialog and the component

## Development

The library can be run by executing builder.js. It is recommended to implement a script in the package.json, that looks like this

```json
“build:dialogues”: “node node_modules/@teclead/aem-generator/builder.js”,
```

Building the dialogues can then be executed by running npm run build:dialogues

## Touch UI fields

The default props for the touch ui fields will be define with TouchUIFieldOptionKeysEnum.model.ts
Expand the default props with the enum

## API

The following example shows a \*.dialog.ts file with the necessary configuration for the creating of an AEM component.

---

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

The variable fields: TouchUIDialogFieldOptions[] describes the individual fields of the Dialog. Label, type, databaseName are always required,
all additional configurations are optional and also based on the selected type. To select the Type the TouchUiField-Object should be include and the wanted field-type needs to be selected in the properties. You can add custom additional common keys for own implementations on touch ui dialog field level. The hide property is optional and can be used to hide a dialog field inside a specific condition. This property uses a function where return a boolean. For further information check out the individual interfaces for the different field types.

Side-Node: The button offers to execute javaScript code with the onClick listener by adding the javaScriptHandler-Property.

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

The variable tabs: TouchUiDialogTab[] describes the required tabs for the dialog, it hold a title and a field property. The field property should hold the value of the fields: TouchUIDialogFieldOptions[] variable. If more than one tab is used, then obviously more than one fields: TouchUIDialogFieldOptions[] variable needs to be configured. The hide property is optional and can be used to hide a tab inside a specific condition. This property uses a function where return a boolean.

```typescript
const tabs: TouchUIDialogTab[] = [
  { title: 'Mein erstes Tab', fields, hide: ({contentPath: '/path/to/content'}) => contentPath.includes('/to') },
  ...
]
```

The sightlyTemplate variable is referencing the HTMl-Template that is used to build the AEM component. It is mandatory to create this reference on a component Level.

```typescript
const sightlyTemplate = "<h1>my custom template...</h1>";
```

The exampleTouchUiDialog: AEMTouchUIDialog variable describes the configuration of the AEM component. It holds the reference to the sightlyTemplate, the component name, the component group, the component description, tabs and the component path (destination path) as required inputs and a couple of optional properties than can be configured. For more Information check out the Interfaces.

```typescript
export const exampleTouchUIDialog: AEMTouchUIDialog = {
  sightlyTemplate: sightlyTemplate,
  componentName: "MyTestComponent",
  componentGroup: "MyTestGroup",
  componentDescription: "MyTestComponentDescription",
  componentPath: "./src/__tests___/results/touchUI",
  tabs: tabs,
};
```

## Full example for a simple component

```typescript
import { AEMTouchUIDialog, TouchUIField } from "@teclead/aem-generator/models";
import { TouchUIXMLGenerator } from "@teclead/aem-generator";
import {
  COMPONENTPATH,
  COMPONENT_GROUP,
  REACT_TEMPLATE,
} from "../Commons/commons";

const dropDownOptions = [
  { value: "val1", name: "Label 1" },
  { value: "val2", name: "Label 2" },
];

export const ctaDialog: AEMTouchUIDialog = {
  componentPath: COMPONENTPATH + "ctaReact",
  sightlyTemplate: REACT_TEMPLATE,
  componentName: "Button-React",
  componentGroup: COMPONENT_GROUP,
  tabs: [
    {
      title: "My first Tab",
      fields: [
        { label: "Text field", databaseName: "text", type: TouchUIField.Text },
        {
          label: "Text Area",
          databaseName: "textArea",
          type: TouchUIField.TextArea,
        },
        {
          label: "Dropdown field",
          databaseName: "dropdown",
          type: TouchUIField.Dropdown,
          options: dropDownOptions,
        },
        { label: "Pathfield", databaseName: "path", type: TouchUIField.Path },
        {
          label: "Checkbox",
          databaseName: "check",
          type: TouchUIField.Checkbox,
        },
        { label: "Image", databaseName: "img", type: TouchUIField.Imagefield },
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

## How to contribute

The CustomDialog Generator was set up and implemented by team Online Sales 5. We are still working on new features and are maintaining this library. Yet we are very grateful and very happy about any contribution. You may contribute by opening a pull-request with a bugfix or new features. You may also report a bug or improve our documentation.

### Development Guideline

We work with pull-requests. No commit is permitted on the master branch. The code will be merged after it was reviewed by at least one member of our team.

We like code reviews for two reasons:

The knowledge about the components is spread. The reviewer will automatically gain knownledge of the code and will be informed as well as the author.

The quality of the code is verfied

Is the documentation comprehensible and does it suffice?
Does the implementation behave as expected?
Are all important branches covered by unit tests?
Does the code style fulfill the standards of this library?
Important notice: Pull requests that are opened while they're still being worked on should have the prefix 'WIP:', which will signal ongoing changes on the branch and that the pull request is not ready to be merged.
Collapse

## License

[MIT](https://teclead.de/#contact)
