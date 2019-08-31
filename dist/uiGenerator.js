"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var xmlTouchUITemplate_1 = require("./xmlTouchUITemplate");
var UiGenerator = /** @class */ (function () {
    function UiGenerator(dialogConfig) {
        this.dialogConfig = dialogConfig;
    }
    /**
     * getCqConfig() returns cqEditConfig template string
     */
    UiGenerator.prototype.getCqConfig = function () {
        return xmlTouchUITemplate_1.template.cqEditConfig;
    };
    /**
     * getCqDesignDialog() returns getCqDesignDialog template string
     */
    UiGenerator.prototype.getCqDesignDialog = function () {
        return xmlTouchUITemplate_1.template.cqDesignDialog;
    };
    /**
     * getDialog() replaces the config placeholders Title and Tab
     * in the dialog template and returns dialog template string
     */
    UiGenerator.prototype.getDialog = function () {
        return xmlTouchUITemplate_1.template.dialog
            .replace(models_1.PlaceHolder.Title, this.dialogConfig.componentName)
            .replace(models_1.PlaceHolder.Tab, this.buildTabs());
    };
    /**
     * getHtmlTag() replaces the config placeholders Tag and Class
     * in the getHtmlTag template and returns getHtmlTag template string
     */
    UiGenerator.prototype.getHtmlTag = function () {
        return xmlTouchUITemplate_1.template.htmlTag
            .replace(models_1.PlaceHolder.Tag, this.dialogConfig.tag ? this.dialogConfig.tag : 'div')
            .replace(models_1.PlaceHolder.Class, this.dialogConfig.css ? this.dialogConfig.css : '');
    };
    /**
     * buildTabs() replaces the config placeholders Element, Title and Fields
     * in the buildTabs template and returns buildTabs template string
     */
    UiGenerator.prototype.buildTabs = function () {
        var _this = this;
        return this.dialogConfig.tabs
            .map(function (tab, index) {
            return xmlTouchUITemplate_1.template.tab
                .replace(models_1.PlaceHolder.Element, 'tab_' + index)
                .replace('/' + models_1.PlaceHolder.Element, '/tab_' + index)
                .replace(models_1.PlaceHolder.Title, tab.title)
                .replace(models_1.PlaceHolder.Fields, tab.fields
                .map(function (field, fieldIndex) { return _this.getField(field, fieldIndex); })
                .join(''));
        })
            .join('');
    };
    /**
     * getTemplate() check the field type and return
     * the right field template string
     * @param  field TouchUIDialogFieldOptions
     * @returns {string}
     */
    UiGenerator.prototype.getTemplate = function (field) {
        var _this = this;
        switch (field.type) {
            case models_1.TouchUIField.Path:
                return xmlTouchUITemplate_1.template.pathfield;
            case models_1.TouchUIField.Checkbox:
                return xmlTouchUITemplate_1.template.select;
            case models_1.TouchUIField.Dropwdown:
                return xmlTouchUITemplate_1.template.dropdown.replace(models_1.PlaceHolder.Options, field.options
                    ? field.options
                        .map(function (option, i) { return _this.getOption(option, i); })
                        .join('')
                    : 'OPTIONERROR');
            case models_1.TouchUIField.Multifield:
                return xmlTouchUITemplate_1.template.multiField.replace(models_1.PlaceHolder.Field, this.getMultiField(field));
            case models_1.TouchUIField.MultifieldNested:
                return xmlTouchUITemplate_1.template.multiFieldNested
                    .replace(models_1.PlaceHolder.Title, field.label)
                    .replace(models_1.PlaceHolder.Options, this.getMultiFieldNested(field));
            case models_1.TouchUIField.Imagefield:
                return xmlTouchUITemplate_1.template.imagefield;
            case models_1.TouchUIField.Number:
                return xmlTouchUITemplate_1.template.numberfield;
            /* case TouchUIField.Tag:
              return template.tag; */
            case models_1.TouchUIField.RichText:
                return xmlTouchUITemplate_1.template.richtext;
            case models_1.TouchUIField.Button:
                return xmlTouchUITemplate_1.template.button.replace(models_1.PlaceHolder.JavaScript, field.javaScriptHandler || '');
            default:
                // text, bumber, error
                return xmlTouchUITemplate_1.template.textfield.replace('textfield', field.type || 'FIELDERROR');
        }
    };
    /**
     * getField() calls
     * the right field template string getTemplate() to get the field
     * and replaces the config placeholders Common, MaxLength, Max, Min, Required,
     * isDisabled, Element, Title, Database, Description
     * @param  field TouchUIDialogFieldOptions, i: number
     * @returns {string}
     */
    UiGenerator.prototype.getField = function (field, i) {
        var _field = field; // not every interface has every options
        return (this.getTemplate(field)
            .replace(models_1.PlaceHolder.Common, xmlTouchUITemplate_1.template.commonField)
            .replace(models_1.PlaceHolder.MaxLength, _field.maxLength ? " maxlength=\"" + _field.maxLength + "\" " : '')
            .replace(models_1.PlaceHolder.Max, _field.max ? " max=\"" + _field.max + "\" " : '')
            .replace(models_1.PlaceHolder.Min, _field.min ? " min=\"" + _field.min + "\" " : '')
            .replace(models_1.PlaceHolder.Required, _field.isRequired ? " required=\"{Boolean}true\" " : '')
            .replace(models_1.PlaceHolder.Element, 'element_' + i)
            .replace('/' + models_1.PlaceHolder.Element, '/element_' + i)
            .replace(models_1.PlaceHolder.Title, _field.label)
            .replace(models_1.PlaceHolder.Database, "./" + _field.databaseName)
            .replace(models_1.PlaceHolder.Description, _field.description ? " fieldDescription=\"" + _field.description + "\"" : '')
            /**
             * not used anymore
             * keep for the case of different requirements
             */
            .replace(models_1.PlaceHolder.isDisabled, _field.isDisabled ? " disabled=\"{Boolean}true\" " : ''));
    };
    /**
     * getOption() returns string element
     * @param  option: TouchUIFieldOption, i: number
     * @returns {string}
     */
    UiGenerator.prototype.getOption = function (option, i) {
        return "<option_" + i + " jcr:primaryType=\"nt:unstructured\" value=\"" + option.value + "\" text=\"" + option.name + "\"/>";
    };
    /**
     * getMultiField() returns the multifieldtype or FIELD-TYPE-ERROR
     * @param  field: TouchUIDialogFieldOptions
     * @returns {string}
     */
    UiGenerator.prototype.getMultiField = function (field) {
        return field.multifieldtype ? field.multifieldtype : 'FIELD-TYPE-ERROR';
    };
    /**
     * getMultiFieldNested() calls  getField and returns the field string template
     * @param  field: TouchUIDialogFieldOptions
     * @returns {string}
     */
    UiGenerator.prototype.getMultiFieldNested = function (field) {
        var _this = this;
        return (field.multifieldOptions || [])
            .map(function (fieldOption, index) { return _this.getField(fieldOption, index); })
            .join('');
    };
    /**
     * getSightlyTemplate() creates the sightly Template file if we have sightlyTemplate
     * in config
     * @returns {string}
     */
    UiGenerator.prototype.getSightlyTemplate = function () {
        if (this.dialogConfig.sightlyTemplate) {
            return this.dialogConfig.sightlyTemplate;
        }
        return;
    };
    return UiGenerator;
}());
exports.UiGenerator = UiGenerator;
//# sourceMappingURL=uiGenerator.js.map