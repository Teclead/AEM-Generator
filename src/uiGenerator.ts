import {
  AEMTouchUIDialog,
  MultifieldNestedOptions,
  MultifieldOptions,
  PlaceHolder,
  TouchUIDialogFieldOptions,
  TouchUIField,
  TouchUIFieldOption,
} from './models';
import { template } from './xmlTouchUITemplate';

export class UiGenerator {
  public dialogConfig: AEMTouchUIDialog;

  constructor(dialogConfig: AEMTouchUIDialog) {
    this.dialogConfig = dialogConfig;
  }

  /**
   * getCqConfig() returns cqEditConfig template string
   */
  public getCqConfig() {
    return template.cqEditConfig;
  }

  /**
   * getNewParConfig() returns template string for new par xml config
   */
  public getNewParConfig() {
    return template.newPar;
  }

  /**
   * getCqDesignDialog() returns getCqDesignDialog template string
   */
  public getCqDesignDialog() {
    return template.cqDesignDialog;
  }
  /**
   * getDialog() replaces the config placeholders Title and Tab
   * in the dialog template and returns dialog template string
   */
  public getDialog() {
    return template.dialog
      .replace(PlaceHolder.Title, this.dialogConfig.componentName)
      .replace(PlaceHolder.Tab, this.buildTabs());
  }
  /**
   * getHtmlTag() replaces the config placeholders Tag and Class
   * in the getHtmlTag template and returns getHtmlTag template string
   */
  public getHtmlTag() {
    console.log('????', template.htmlTag);
    return template.htmlTag
      .replace(
        PlaceHolder.Tag,
        this.dialogConfig.tag ? this.dialogConfig.tag : 'div'
      )
      .replace(
        PlaceHolder.Class,
        this.dialogConfig.css ? this.dialogConfig.css : ''
      );
  }
  /**
   * buildTabs() replaces the config placeholders Element, Title and Fields
   * in the buildTabs template and returns buildTabs template string
   */
  public buildTabs(): string {
    return this.dialogConfig.tabs
      .map((tab, index) => {
        return template.tab
          .replace(PlaceHolder.Element, 'tab_' + index)
          .replace('/' + PlaceHolder.Element, '/tab_' + index)
          .replace(PlaceHolder.Title, tab.title)
          .replace(
            PlaceHolder.Fields,
            tab.fields
              .map((field, fieldIndex) => this.getField(field, fieldIndex))
              .join('')
          );
      })
      .join('');
  }

  /**
   * getTemplate() check the field type and return
   * the right field template string
   * @param  field TouchUIDialogFieldOptions
   * @returns {string}
   */
  public getTemplate(field: TouchUIDialogFieldOptions): string {
    switch (field.type) {
      case TouchUIField.Path:
        return template.pathfield;
      case TouchUIField.Checkbox:
        return template.checkbox;
      case TouchUIField.Dropdown:
        return template.dropdown.replace(
          PlaceHolder.Options,
          field.options
            ? field.options
                .map((option, i) => this.getOption(option, i))
                .join('')
            : 'OPTIONERROR'
        );
      case TouchUIField.Multifield:
        return template.multiField.replace(
          PlaceHolder.Field,
          this.getMultiField(field)
        );
      case TouchUIField.MultifieldNested:
        return template.multiFieldNested
          .replace(PlaceHolder.Title, field.label)
          .replace(PlaceHolder.Options, this.getMultiFieldNested(field));
      case TouchUIField.Imagefield:
        return template.imagefield;
      case TouchUIField.Number:
        return template.numberfield;
      /* case TouchUIField.Tag:
        return template.tag; */
      case TouchUIField.RichText:
        return template.richtext;
      case TouchUIField.Button:
        return template.button.replace(
          PlaceHolder.JavaScript,
          field.javaScriptHandler || ''
        );
      default:
        // text, bumber, error
        return template.textfield.replace(
          'textfield',
          field.type || 'FIELDERROR'
        );
    }
  }
  /**
   * getField() calls
   * the right field template string getTemplate() to get the field
   * and replaces the config placeholders Common, MaxLength, Max, Min, Required,
   * isDisabled, Element, Title, Database, Description
   * @param  field TouchUIDialogFieldOptions, i: number
   * @returns {string}
   */
  public getField(field: TouchUIDialogFieldOptions, i: number): string {
    const _field = field as any; // not every interface has every options

    return (
      this.getTemplate(field)
        .replace(PlaceHolder.Common, template.commonField)
        .replace(
          PlaceHolder.MaxLength,
          _field.maxLength ? ` maxlength="${_field.maxLength}" ` : ''
        )
        .replace(PlaceHolder.Max, _field.max ? ` max="${_field.max}" ` : '')
        .replace(PlaceHolder.Min, _field.min ? ` min="${_field.min}" ` : '')
        .replace(
          PlaceHolder.Required,
          _field.isRequired ? ` required="{Boolean}true" ` : ''
        )
        .replace(PlaceHolder.Element, 'element_' + i)
        .replace('/' + PlaceHolder.Element, '/element_' + i)
        .replace(PlaceHolder.Title, _field.label)
        .replace(PlaceHolder.Value, this.getFieldValue(field))
        .replace(PlaceHolder.Database, `./${_field.databaseName}`)
        .replace(PlaceHolder.Checked, _field.checked ? 'checked="true"' : '')
        .replace(
          PlaceHolder.Description,
          _field.description ? ` fieldDescription="${_field.description}"` : ''
        )
        /**
         * not used anymore
         * keep for the case of different requirements
         */
        .replace(
          PlaceHolder.isDisabled,
          _field.isDisabled ? ` disabled="{Boolean}true" ` : ''
        )
    );
  }

  public getFieldValue(field: TouchUIDialogFieldOptions): string {
    return typeof field.defaultValue === 'undefined'
      ? ''
      : ` value="${this.parseFieldValue(field)}"`;
  }

  /**
   * getOption() returns string element
   * @param  option: TouchUIFieldOption, i: number
   * @returns {string}
   */
  public getOption(option: TouchUIFieldOption, i: number) {
    const selectedAttr = option.selected ? 'selected="true"' : '';
    return `<option_${i} jcr:primaryType="nt:unstructured" ${selectedAttr} value="${option.value}" text="${option.name}"/>`;
  }

  /**
   * getMultiField() returns the multifieldtype or FIELD-TYPE-ERROR
   * @param  field: TouchUIDialogFieldOptions
   * @returns {string}
   */
  public getMultiField(field: MultifieldOptions) {
    return field.multifieldtype ? field.multifieldtype : 'FIELD-TYPE-ERROR';
  }
  /**
   * getMultiFieldNested() calls  getField and returns the field string template
   * @param  field: TouchUIDialogFieldOptions
   * @returns {string}
   */
  public getMultiFieldNested(field: MultifieldNestedOptions) {
    return (field.multifieldOptions || [])
      .map((fieldOption, index) => this.getField(fieldOption, index))
      .join('');
  }
  /**
   * getSightlyTemplate() creates the sightly Template file if we have sightlyTemplate
   * in config
   * @returns {string}
   */
  public getSightlyTemplate() {
    if (this.dialogConfig.sightlyTemplate) {
      return this.dialogConfig.sightlyTemplate;
    }
    return;
  }

  private parseFieldValue(field: TouchUIDialogFieldOptions): string {
    switch (typeof field.defaultValue) {
      case 'boolean':
        return `{Boolean}${field.defaultValue ? 'true' : 'false'}`;
      case 'number':
        return `{Double}${field.defaultValue}`;
      case 'string':
        return field.defaultValue;
      default:
        return '';
    }
  }
}
