"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var fields = [
    {
        label: 'Mein Textfeld',
        type: models_1.TouchUIField.Text,
        databaseName: 'label',
        isRequired: true,
        description: 'Meine Beschreibung für Textfeld...'
    },
    {
        label: 'Mein PathField',
        type: models_1.TouchUIField.Path,
        databaseName: 'path',
        description: 'Meine Beschreibung für PathField...'
    },
    {
        label: 'Mein Selectfeld',
        type: models_1.TouchUIField.Checkbox,
        databaseName: 'select',
        description: 'Meine Beschreibung für Select...'
    },
    {
        label: 'Mein Numberfield',
        type: models_1.TouchUIField.Number,
        databaseName: 'numbwr',
        description: 'Meine Beschreibung für Numberfield...',
        max: 50,
        min: 20
    },
    {
        label: 'Mein Imagefield',
        type: models_1.TouchUIField.Imagefield,
        databaseName: 'image',
        description: 'Meine Beschreibung für Imagefield',
        isRequired: true
    },
    {
        label: 'Mein Dropwdown',
        type: models_1.TouchUIField.Dropwdown,
        databaseName: 'dropdown',
        description: 'Meine Beschreibung für Dropwdown',
        options: [
            { value: 1, name: 'Name 1' },
            { value: 2, name: 'Name 2' },
            { value: 3, name: 'Name 3' }
        ]
    },
    {
        label: 'Meine Textarea',
        type: models_1.TouchUIField.TextArea,
        databaseName: 'label',
        description: 'Meine Beschreibung für Textarea...',
        maxLength: 50
    },
    {
        label: 'Mein Richtexteld',
        type: models_1.TouchUIField.RichText,
        databaseName: 'richtext',
        description: 'Meine Beschreibung für Richtext...'
    },
    {
        label: 'Mein Button',
        type: models_1.TouchUIField.Button,
        javaScriptHandler: 'alert(123)'
    }
];
var tabs = [
    { title: 'Mein erstes Tab', fields: fields },
    {
        title: 'Mein zweites Tab',
        fields: [
            {
                label: 'Mein Touch UI Multifield',
                type: models_1.TouchUIField.Multifield,
                description: 'Meine Beschreibung für das Multifield...',
                databaseName: 'multitouchuidatabase',
                multifieldtype: models_1.TouchUIField.Text
            }
        ]
    },
    {
        title: 'Mein drittes Tab',
        fields: [
            {
                label: 'Nested Multifield',
                databaseName: 'multi',
                type: models_1.TouchUIField.MultifieldNested,
                multifieldOptions: fields.slice(5)
            }
        ]
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
        ]
    }
];
var ReactTemplate = './src/templates/react.template.html';
exports.exampleTouchUIDialog = {
    sightlyTemplate: ReactTemplate,
    componentName: 'MyTestComponent',
    componentGroup: 'MyTestGroup',
    componentDescription: 'MyTestComponentDescription',
    noDecoration: false,
    isContainer: false,
    componentPath: './src/__tests___/results/touchUI',
    tag: 'div',
    css: 'sample-style',
    tabs: tabs,
    analytics: {
        values: ['value1', 'value2'],
        events: ['event1', 'event2']
    },
    resourceSuperType: 'core/wcm/components/text/v2/text'
};
//# sourceMappingURL=xmlTouchUIGenerator.test.data.js.map