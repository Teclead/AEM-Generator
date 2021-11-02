import { CommonOptions } from './../dist/models/TouchUIFieldOptions.model.d';
import * as fs from 'fs';
import * as path from 'path';
import {
  AEMTouchUIDialog,
  CustomFilePath,
  CustomOptionAttribute,
  DataSourceOptions,
  DropdownOptions,
  JavaScriptPlaceHolder,
  JQueryHideModel,
  MultifieldNestedOptions,
  MultifieldOptions,
  OptionKeys,
  PlaceHolder,
  TouchUIDialogFieldOptions,
  TouchUIField,
  TouchUIFieldOption,
} from './models';
import { DatePickerOptions, HeadingOptions, FieldSetOptions, RadioGroupOptions } from './models/TouchUIFieldOptions.model';
import { getFile, template } from './xmlTouchUITemplate';
export class UiGenerator<T = {}> {
  public dialogConfig: AEMTouchUIDialog<T>;

  protected clientlibs: Array<{ filename: string, content: string }> = [];

  constructor(dialogConfig: AEMTouchUIDialog<T>) {
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
   * Filter additional common option keys from the default common options keys
   */
  public getAdditionalCommonKeys(field: TouchUIDialogFieldOptions<T[]>): string[] {
    return Object.keys(field).filter(x => !Object.values(OptionKeys).includes(x as any));
  }

  /**
   * Returns key value pairs as object from given touch ui dialog fields and additional common option keys
   */
  public getAdditionalCommon(field: TouchUIDialogFieldOptions<T[]>, additionalCommonKeys: string[]): CustomOptionAttribute {
    return Object
      .entries(field)
      .reduce(
        (total, [key, value]) => (additionalCommonKeys.includes(key)) ? { ...total, [key]: value } : { ...total }, {}
      );
  }
  /**
   * Check have a given key inside touch ui dialog fields 
   * @param {string} key 
   * @return {boolean}
   */
  public has(key: string): boolean {
    return this.dialogConfig.tabs
      .some((tab) => tab.fields
        .some((dialogField) => (dialogField as CommonOptions)[key])
      );
  }

  /**
   * replaceResourceType() replace sling:resourcesType of a field 
   * with given type to replace it with the new type
   * @param {string} tmp - template string to replace with
   * @param {TouchUIField | string} type - touch ui field type to replace
   * @param {string} replace - replace value 
   */
  public replaceResourceType(tmp: string, type: TouchUIField | string = 'container', replace: string): string {
    const regex = '(granite\/ui\/components\/coral\/foundation\/' + type + ')';
    return tmp.replace(new RegExp(regex), replace);
  }

  /**
   * buildTabs() replaces the config placeholders Element, Title and Fields
   * in the buildTabs template and returns buildTabs template string
   */
  public buildTabs(): string {
    if (this.hasHideImplementation()) {
      this.clientlibs = [...this.clientlibs, { filename: 'hide.js', content: this.buildHideScript() }];
    }

    return this.dialogConfig.tabs
      .map((tab, index) => {
        return template.tab
          .replace(PlaceHolder.Element, 'tab_' + index)
          .replace('/' + PlaceHolder.Element, '/tab_' + index)
          .replace(PlaceHolder.Title, tab.title)
          .replace(
            PlaceHolder.Fields,
            this.getFields(tab.fields)

          );
      })
      .join('');
  }

  /**
   * buildHideScript() replace the placeholder in the hideTab scripts template 
   * and returns buildHideScript template string
   */
  public buildHideScript(): string {
    const templateFile = getFile(path.resolve(__dirname, CustomFilePath.HideTab));
    const container: JQueryHideModel[] = [...this.getJQueryHideTabModels(), ...this.getJQueryHideDialogFieldModels()];
    return templateFile
      .replace(JavaScriptPlaceHolder.HideComponentName, this.dialogConfig.componentName.toLowerCase())
      .replace(JavaScriptPlaceHolder.HideContainer, JSON.stringify(container));

  }
  /**
   * buildClientLibs returns cqClientlibs template string
   */
  public buildCqClientLibs(): string {
    return template.clientlibs;
  }
  /**
   * getTemplate() check the field type and return
   * the right field template string
   * @param  field TouchUIDialogFieldOptions
   * @returns {string}
   */
  public getTemplate(field: TouchUIDialogFieldOptions<T>): string {
    switch (field.type) {
      case TouchUIField.Path:
        return template.pathfield;
      case TouchUIField.PathBrowser:
        return template.pathfield
          .replace(
            "granite/ui/components/coral/foundation/form/pathfield",
            "granite/ui/components/coral/foundation/form/pathbrowser");
      case TouchUIField.Checkbox:
        return template.checkbox;
      case TouchUIField.Dropdown:
        return this.createDropdownFields(field);
      case TouchUIField.Multifield:
        return template.multiField.replace(
          PlaceHolder.Field,
          this.getMultiField(field)
        );
      case TouchUIField.MultifieldNested:
        return this.createNestedFields(field);
      case TouchUIField.FieldSet:
        return this.createNestedFields(field);
      case TouchUIField.Imagefield:
        return template.imagefield;
      case TouchUIField.DatePicker:
        return template.datePicker;
      case TouchUIField.Heading:
        return template.heading;
      case TouchUIField.RadioGroup:
        return template.radioGroup.replace(PlaceHolder.Options, this.getRadios(field));
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


  public getRadios(field: RadioGroupOptions): string {
    return field.options.map((option, index) => `<radio_${index} jcr:primaryType="nt:unstructured" text="${option.text}" value="${option.value}" checked="{Boolean}${!!option.checked}"/>`).join("")
  }

  /**
   * Mapping over the given fields and 
   * execute getField() method for all fields
   * @param {TouchUIDialogFieldOptions[]} fields
   * @returns {string}
   */
  public getFields(fields: TouchUIDialogFieldOptions<T>[]): string {
    return fields
      .map((field, fieldIndex) => this.getField(field, fieldIndex))
      .join('');
  }

  /**
   * getField() calls
   * the right field template string getTemplate() to get the field
   * and replaces the config placeholders Common, MaxLength, Max, Min, Required,
   * isDisabled, Element, Title, Database, Description
   * @param  field TouchUIDialogFieldOptions, i: number
   * @returns {string}
   */
  public getField(field: TouchUIDialogFieldOptions<T>, i: number): string {
    const _field = field as any; // not every interface has every options

    // get additional keys from TouchUIDialogFieldOptions
    const additionalCommonKeys = this.getAdditionalCommonKeys(_field);
    // get additional common key value pairs
    const additionalCommon = this.getAdditionalCommon(_field, additionalCommonKeys);

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
        // DATE PICKER
        .replace(PlaceHolder.MinDate, (_field as DatePickerOptions).minDate ? `minDate="${(_field as DatePickerOptions).minDate}"` : "")
        .replace(PlaceHolder.DateType, (_field as DatePickerOptions).dateType || "")
        .replace(PlaceHolder.DisplayFormat, (_field as DatePickerOptions).displayedFormat || "")
        // Heading
        .replace(PlaceHolder.Level, (_field as HeadingOptions).level?.toString() || "")
        .replace(PlaceHolder.Level, (_field as HeadingOptions).text || "")
        /**
         * not used anymore
         * keep for the case of different requirements
         */
        .replace(
          PlaceHolder.isDisabled,
          _field.isDisabled ? ` disabled="{Boolean}true" ` : ''
        )
        .replace(
          PlaceHolder.CustomAttribute,
          additionalCommon ? (Object.entries(additionalCommon)
            .map(([key, value]) => `${key}="${value}" `)
            .join('')
          ) : ''
        )
    );
  }

  /**
   * createDropdownFields() create
   * the right dropdown option template string for a data source
   * or normal selected items 
   * @param {DropdownOptions} field
   * @returns {string}
   */
  public createDropdownFields(field: DropdownOptions): string {

    if (this.isDataSourceOption(field)) {
      return template.dropdown
        .replace(/(<i([^>]+)>)/g, '')
        .replace(/(<\/i([^>]+)>)/g, '')
        .replace(/^\s*\n/gm, '')
        .replace(
          PlaceHolder.Options,
          field.options
            ? this.getDataSource(field.options as DataSourceOptions)
            : 'OPTIONERROR'
        )
    }

    return template.dropdown.replace(
      PlaceHolder.Options,
      field.options
        ? (field.options as TouchUIFieldOption[])
          .map((option, i) => this.getOption(option, i))
          .join('')
        : 'OPTIONERROR'
    );
  }
  /**  
   * createMultiFieldNested create
   * a nested multi field template string 
   * @param {MultifieldNestedOptions} field
   * @returns {string}
   */
  public createNestedFields(field: MultifieldNestedOptions<T> | FieldSetOptions<T>): string {
    return (field.type === TouchUIField.MultifieldNested ? template.multiFieldNested : template.fieldSet)
      .replace(PlaceHolder.Title, (field as MultifieldNestedOptions<T>).label)
      .replace(PlaceHolder.Options, this.getNestedFields(field));

  }

  public getFieldValue(field: TouchUIDialogFieldOptions<T>): string {
    return typeof (field as CommonOptions).defaultValue === 'undefined'
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
   * getDataSource() returns string element for a data source
   * @param {DataSourceOptions} option
   * @returns {string}
   */
  public getDataSource({ dataSource, attributes }: DataSourceOptions): string {
    const attrs = (attributes) ? (
      Object.entries(attributes).map(([key, value]) => `${key}="${value}" `)
        .join('')
    ) : '';
    return `<datasource jcr:primaryType="nt:unstructured"
              sling:resourceType="${dataSource}"
              ${attrs} />`;
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
  public getNestedFields(field: MultifieldNestedOptions<T> | FieldSetOptions<T>) {
    return ((field as MultifieldNestedOptions<T>).multifieldOptions || field.options || [])
      .map((fieldOption: TouchUIDialogFieldOptions<T>, index: number) => this.getField(fieldOption, index))
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

  public getJQueryHideTabModels(): JQueryHideModel[] {
    return this.dialogConfig.tabs.reduce(
      (prev, curr, index) => (curr.hide) ? [...prev, { index, isTab: true, hide: '' + curr.hide }] : [...prev],
      [] as JQueryHideModel[]);
  }

  public getJQueryHideDialogFieldModels(): JQueryHideModel[] {
    return this.dialogConfig.tabs.map(
      (tab, tabIndex) => tab.fields.reduce(
        (prev, curr, index) => ((curr as CommonOptions).hide) ? [...prev, { index, tabIndex, isTab: false, hide: '' + (curr as CommonOptions).hide }] : [...prev],
        [] as JQueryHideModel[])
    ).reduce((acc, val) => acc.concat(val), []);
  }

  public hasHideImplementation(): boolean {
    return this.dialogConfig.tabs
      .some((tab) => tab.hide !== undefined || (
        tab.fields.some(
          (field) => (field as CommonOptions).hide !== undefined)
      )
      );
  }

  /**
   * buildJQuery creates the jquery files inside a directory
   * and returns the name of the files
   */
  protected buildJQuery(dir: string): string {
    if (this.clientlibs.length === 0) { return ''; }
    return this.clientlibs
      .map(({ filename, content }): string => {
        const file = dir + filename;
        fs.writeFileSync(path.resolve(file,), content);
        return filename;
      })
      .join(' ');
  }

  private parseFieldValue(_field: TouchUIDialogFieldOptions<T>): string {
    const field = _field as CommonOptions;
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

  private isDataSourceOption(field: DropdownOptions): boolean {
    return !Array.isArray(field.options) && field.options.dataSource !== 'undefined';
  }
}
