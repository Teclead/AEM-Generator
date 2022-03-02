import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  AEMTouchUIDialog,
  CustomFilePath,
  CustomOptionAttribute,
  DataSourceOptions,
  DropdownOptions,
  JavaScriptPlaceHolder,
  JQueryHideModel,
  JQueryOnChangeModel,
  JQueryOnLoadModel,
  MultifieldNestedOptions,
  MultifieldOptions,
  OptionKeys,
  PlaceHolder,
  TouchUIDialogFieldOptions,
  TouchUIField,
  TouchUIFieldOption,
} from './models';
import {
  CommonOptions,
  DatePickerOptions,
  FieldSetOptions,
  HeadingOptions,
  RadioGroupOptions,
} from './models/TouchUIFieldOptions.model';
import { getFile, template } from './xmlTouchUITemplate';
export class UiGenerator<T = object> {
  public dialogConfig: AEMTouchUIDialog<T>;

  protected clientlibs: Array<{ filename: string; content: string }> = [];

  public constructor(dialogConfig: AEMTouchUIDialog<T>) {
    this.dialogConfig = dialogConfig;
  }

  /**
   * @returns {string} cqEditConfig template string
   */
  public getCqConfig(): string {
    return template.cqEditConfig;
  }

  /**
   * @returns {string} template string for new par xml config
   */
  public getNewParConfig(): string {
    return template.newPar;
  }

  /**
   * @returns {string} design dialog template string
   */
  public getCqDesignDialog(): string {
    return template.cqDesignDialog;
  }

  /**
   * getDialog() replaces the config placeholders Title and Tab
   * in the dialog template
   *
   * @returns {string} dialog template string
   */
  public getDialog(): string {
    return template.dialog
      .replace(PlaceHolder.Title, this.dialogConfig.componentName)
      .replace(PlaceHolder.Tab, this.buildTabs());
  }
  /**
   * getHtmlTag() replaces the config placeholders Tag and Class
   * in the getHtmlTag template
   *
   * @returns {string} getHtmlTag template string
   */
  public getHtmlTag(): string {
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
   *
   * @param {TouchUIDialogFieldOptions[]} field array of touch ui field options
   * @returns {string[]} keys of additional common keys
   */
  public getAdditionalCommonKeys(
    field: TouchUIDialogFieldOptions<T[]>
  ): string[] {
    return Object.keys(field).filter(
      (x) => !Object.values(OptionKeys).includes(x as any)
    );
  }

  /**
   * Returns key value pairs as object from given touch ui dialog fields and additional common option keys
   *
   * @param {TouchUIDialogFieldOptions[]} field array of touch ui field options
   * @param {string[]} additionalCommonKeys keys of additional common keys
   * @returns {CustomOptionAttribute[]} custom attribute
   */
  public getAdditionalCommon(
    field: TouchUIDialogFieldOptions<T[]>,
    additionalCommonKeys: string[]
  ): CustomOptionAttribute {
    return Object.entries(field).reduce(
      (total, [key, value]) =>
        additionalCommonKeys.includes(key)
          ? { ...total, [key]: value }
          : { ...total },
      {}
    );
  }
  /**
   * Check have a given key inside touch ui dialog fields
   *
   * @param {string} key touch ui key
   * @returns {boolean} has key inside touch ui dialog fields
   */
  public has(key: string): boolean {
    return this.dialogConfig.tabs.some((tab) =>
      tab.fields.some((dialogField) => (dialogField as CommonOptions)[key])
    );
  }

  /**
   * replaceResourceType() replace sling:resourcesType of a field
   * with given type to replace it with the new type
   *
   * @param {string} temporary template string
   * @param {TouchUIField | string} [type=container] container
   * @param {string} replace replace value
   * @returns {string} xml template string
   */
  public replaceResourceType(
    temporary: string,
    type: TouchUIField | string = 'container',
    replace: string
  ): string {
    const regex = '(granite/ui/components/coral/foundation/' + type + ')';

    return temporary.replace(new RegExp(regex), replace);
  }

  /**
   * buildTabs() replaces the config placeholders Element, Title and Fields
   * in the buildTabs template
   *
   * @returns {string} buildTabs template string
   */
  public buildTabs(): string {
    if (this.hasHideImplementation()) {
      this.clientlibs = [
        ...this.clientlibs,
        { filename: 'hide.js', content: this.buildHideScript() },
      ];
    }

    if (this.hasOnLoadImplementation()) {
      this.clientlibs = [
        ...this.clientlibs,
        { filename: 'onLoad.js', content: this.buildOnLoadScript() },
      ];
    }

    if (this.hasOnChangeImplementation()) {
      this.clientlibs = [
        ...this.clientlibs,
        { filename: 'onChange.js', content: this.buildOnChangeScript() },
      ];
    }

    return this.dialogConfig.tabs
      .map((tab, index) =>
        template.tab
          .replace(PlaceHolder.Element, 'tab_' + index)
          .replace('/' + PlaceHolder.Element, '/tab_' + index)
          .replace(PlaceHolder.Title, tab.title)
          .replace(PlaceHolder.Fields, this.getFields(tab.fields))
      )
      .join('');
  }

  /**
   * buildHideScript() replace the placeholder in the hideTab scripts template
   *
   * @returns {string} buildHideScript template string
   */
  public buildHideScript(): string {
    const templateFile = getFile(
      path.resolve(__dirname, CustomFilePath.HideTab)
    );
    const container: JQueryHideModel[] = [
      ...this.getJQueryHideTabModels(),
      ...this.getJQueryHideDialogFieldModels(),
    ];

    return templateFile
      .replace(
        JavaScriptPlaceHolder.HideComponentName,
        this.dialogConfig.componentName.toLowerCase()
      )
      .replace(JavaScriptPlaceHolder.HideContainer, JSON.stringify(container));
  }

  /**
   * replaces the placeholder in the onLoad scripts template
   *
   * @returns {string} buildOnLoadScript template string
   */
  public buildOnLoadScript(): string {
    const templateFile = getFile(
      path.resolve(__dirname, CustomFilePath.OnLoad)
    );
    const container: JQueryOnLoadModel[] = [
      ...this.getJQueryOnLoadTabModels(),
      ...this.getJQueryOnLoadDialogFieldModels(),
    ];

    return templateFile
      .replace(
        JavaScriptPlaceHolder.OnLoadComponentName,
        this.dialogConfig.componentName.toLowerCase()
      )
      .replace(
        JavaScriptPlaceHolder.OnLoadContainer,
        JSON.stringify(container)
      );
  }

  /**
   * replaces the placeholder in the onChange scripts template
   *
   * @returns {string} buildOnChangeScript template string
   */
  public buildOnChangeScript(): string {
    const templateFile = getFile(
      path.resolve(__dirname, CustomFilePath.OnChange)
    );
    const container: JQueryOnChangeModel[] = [
      ...this.getJQueryOnChangeTabModels(),
      ...this.getJQueryOnChangeDialogFieldModels(),
    ];

    return templateFile
      .replace(
        JavaScriptPlaceHolder.OnChangeComponentName,
        this.dialogConfig.componentName.toLowerCase()
      )
      .replace(
        JavaScriptPlaceHolder.OnChangeContainer,
        JSON.stringify(container)
      );
  }

  /**
   * @returns {string} cqClientlibs template string
   */
  public buildCqClientLibs(): string {
    return template.clientlibs;
  }

  /**
   * getTemplate() check the field type and return
   * the right field template string
   *
   * @param {TouchUIDialogFieldOptions} field TouchUIDialogFieldOptions
   * @returns {string} template string
   */
  public getTemplate(field: TouchUIDialogFieldOptions<T>): string {
    switch (field.type) {
      case TouchUIField.Path:
        return template.pathfield;
      case TouchUIField.PathBrowser:
        return template.pathfield.replace(
          'granite/ui/components/coral/foundation/form/pathfield',
          'granite/ui/components/coral/foundation/form/pathbrowser'
        );
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
        return template.radioGroup.replace(
          PlaceHolder.Options,
          this.getRadios(field)
        );
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
    return field.options
      .map(
        (option, index) =>
          `<radio_${index} jcr:primaryType="nt:unstructured" text="${option.text}" value="${option.value}" />`
      )
      .join('');
  }

  /**
   * Mapping over the given fields and
   * execute getField() method for all fields
   *
   * @param {TouchUIDialogFieldOptions[]} fields array of field options
   * @returns {string} xml template string
   */
  public getFields(fields: Array<TouchUIDialogFieldOptions<T>>): string {
    return fields
      .map((field, fieldIndex) => this.getField(field, fieldIndex))
      .join('');
  }

  /**
   * getField() calls
   * the right field template string getTemplate() to get the field
   * and replaces the config placeholders Common, MaxLength, Max, Min, Required,
   * isDisabled, Element, Title, Database, Description
   *
   * @param {TouchUIDialogFieldOptions} field TouchUIDialogFieldOptions, i: number
   * @param {number} index index of field
   * @returns {string} xml template string
   */
  public getField(field: TouchUIDialogFieldOptions<T>, index: number): string {
    // eslint-disable-next-line no-underscore-dangle
    const _field = field as any; // not every interface has every options

    // get additional keys from TouchUIDialogFieldOptions
    const additionalCommonKeys = this.getAdditionalCommonKeys(_field);
    // get additional common key value pairs
    const additionalCommon = this.getAdditionalCommon(
      _field,
      additionalCommonKeys
    );

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
          _field.isRequired ? ' required="{Boolean}true" ' : ''
        )
        .replace(PlaceHolder.Element, 'element_' + index)
        .replace('/' + PlaceHolder.Element, '/element_' + index)
        .replace(PlaceHolder.Title, _field.label)
        .replace(PlaceHolder.Value, this.getFieldValue(field))
        .replace(PlaceHolder.Database, `./${_field.databaseName}`)
        .replace(PlaceHolder.Checked, _field.checked ? 'checked="true"' : '')
        .replace(
          PlaceHolder.Description,
          _field.description ? ` fieldDescription="${_field.description}"` : ''
        )
        .replace(PlaceHolder.Text, _field.text)
        // DATE PICKER
        .replace(
          PlaceHolder.MinDate,
          (_field as DatePickerOptions).minDate
            ? `minDate="${(_field as DatePickerOptions).minDate}"`
            : ''
        )
        .replace(
          PlaceHolder.DateType,
          (_field as DatePickerOptions).dateType || ''
        )
        .replace(
          PlaceHolder.DisplayFormat,
          (_field as DatePickerOptions).displayedFormat || ''
        )
        // Heading
        .replace(
          PlaceHolder.Level,
          (_field as HeadingOptions).level?.toString() || ''
        )
        .replace(PlaceHolder.Level, (_field as HeadingOptions).text || '')
        // RADIO Group
        .replace(PlaceHolder.Vertical, `${!!_field.vertical}`)
        /**
         * not used anymore
         * keep for the case of different requirements
         */
        .replace(
          PlaceHolder.isDisabled,
          _field.isDisabled ? ' disabled="{Boolean}true" ' : ''
        )
        .replace(
          PlaceHolder.ClassName,
          _field.className ? `granite:class="${_field.className}"` : ''
        )
        .replace(
          PlaceHolder.CustomAttribute,
          additionalCommon
            ? Object.entries(additionalCommon)
                .map(([key, value]) => `${key}="${value}" `)
                .join('')
            : ''
        )
    );
  }

  /**
   * createDropdownFields() create
   * the right dropdown option template string for a data source
   * or normal selected items
   *
   * @param {DropdownOptions} field options of the dropdown
   * @returns {string} xml template string
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
        );
    }

    return template.dropdown.replace(
      PlaceHolder.Options,
      field.options
        ? (field.options as TouchUIFieldOption[])
            .map((option, index) => this.getOption(option, index))
            .join('')
        : 'OPTIONERROR'
    );
  }
  /**
   * createMultiFieldNested create
   * a nested multi field template string
   *
   * @param {MultifieldNestedOptions} field options of multifield nested
   * @returns {string} xml template string
   */
  public createNestedFields(
    field: MultifieldNestedOptions<T> | FieldSetOptions<T>
  ): string {
    return (
      field.type === TouchUIField.MultifieldNested
        ? template.multiFieldNested
        : template.fieldSet
    )
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
   *
   * @param {TouchUIFieldOption} option TouchUIFieldOption
   * @param {number} index index of the option
   * @returns {string} xml template string
   */
  public getOption(option: TouchUIFieldOption, index: number): string {
    const selectedAttribute = option.selected ? 'selected="true"' : '';

    return `<option_${index} jcr:primaryType="nt:unstructured" ${selectedAttribute} value="${option.value}" text="${option.name}"/>`;
  }

  /**
   * getDataSource() returns string element for a data source
   *
   * @param {DataSourceOptions} option option of the data source
   * @returns {string} xml template string
   */
  public getDataSource({ dataSource, attributes }: DataSourceOptions): string {
    const sourceAttributes = attributes
      ? Object.entries(attributes)
          .map(([key, value]) => `${key}="${value}" `)
          .join('')
      : '';

    return `<datasource jcr:primaryType="nt:unstructured"
              sling:resourceType="${dataSource}"
              ${sourceAttributes} />`;
  }

  /**
   * getMultiField() returns the multifieldtype or FIELD-TYPE-ERROR
   *
   * @param {MultifieldOptions} field TouchUIDialogFieldOptions
   * @returns {string} type of multifield
   */
  public getMultiField(field: MultifieldOptions): string {
    return field.multifieldtype ? field.multifieldtype : 'FIELD-TYPE-ERROR';
  }

  /**
   * getMultiFieldNested() calls  getField and returns the field string template
   *
   * @param {MultifieldNestedOptions|FieldSetOptions} field TouchUIDialogFieldOptions
   * @returns {string} xml template string
   */
  public getNestedFields(
    field: MultifieldNestedOptions<T> | FieldSetOptions<T>
  ): string {
    return (
      (field as MultifieldNestedOptions<T>).multifieldOptions ||
      field.options ||
      []
    )
      .map((fieldOption: TouchUIDialogFieldOptions<T>, index: number) =>
        this.getField(fieldOption, index)
      )
      .join('');
  }

  /**
   * getSightlyTemplate() creates the sightly Template file if we have sightlyTemplate
   * in config
   *
   * @returns {string} sligtly xml template string
   */
  public getSightlyTemplate(): string {
    return this.dialogConfig.sightlyTemplate || '';
  }

  public getJQueryHideTabModels(): JQueryHideModel[] {
    return this.dialogConfig.tabs.reduce(
      (previous, current, index) =>
        current.hide
          ? [...previous, { index, isTab: true, hide: '' + current.hide }]
          : [...previous],
      [] as JQueryHideModel[]
    );
  }

  public getJQueryHideDialogFieldModels(): JQueryHideModel[] {
    return this.dialogConfig.tabs.flatMap((tab, tabIndex) =>
      tab.fields.reduce(
        (previous, current, index) =>
          (current as CommonOptions).hide
            ? [
                ...previous,
                {
                  index,
                  tabIndex,
                  isTab: false,
                  hide: '' + (current as CommonOptions).hide,
                },
              ]
            : [...previous],
        [] as JQueryHideModel[]
      )
    );
  }

  public hasHideImplementation(): boolean {
    return this.dialogConfig.tabs.some(
      (tab) =>
        tab.hide !== undefined ||
        tab.fields.some((field) => (field as CommonOptions).hide !== undefined)
    );
  }

  public getJQueryOnLoadTabModels(): JQueryOnLoadModel[] {
    return this.dialogConfig.tabs.reduce(
      (previous, current, index) =>
        current.onLoad
          ? [...previous, { index, onLoad: '' + current.onLoad }]
          : [...previous],
      [] as JQueryOnLoadModel[]
    );
  }

  public getJQueryOnLoadDialogFieldModels(): JQueryOnLoadModel[] {
    return this.dialogConfig.tabs.flatMap((tab) =>
      tab.fields.reduce(
        (previous, current, index) =>
          (current as CommonOptions).onLoad
            ? [
                ...previous,
                {
                  index,
                  onLoad: '' + (current as CommonOptions).onLoad,
                },
              ]
            : [...previous],
        [] as JQueryOnLoadModel[]
      )
    );
  }

  public hasOnLoadImplementation(): boolean {
    return this.dialogConfig.tabs.some(
      (tab) =>
        tab.onLoad !== undefined ||
        tab.fields.some(
          (field) => (field as CommonOptions).onLoad !== undefined
        )
    );
  }

  public getJQueryOnChangeTabModels(): JQueryOnChangeModel[] {
    return this.dialogConfig.tabs.reduce(
      (previous, current, index) =>
        current.onChange
          ? [
              ...previous,
              {
                index,
                isField: false,
                onChange: '' + current.onChange,
                targetClassName: '',
              },
            ]
          : [...previous],
      [] as JQueryOnChangeModel[]
    );
  }

  public getJQueryOnChangeDialogFieldModels(): JQueryOnChangeModel[] {
    return this.dialogConfig.tabs.flatMap((tab, tabIndex) =>
      tab.fields.reduce(
        (previous, current, index) =>
          (current as CommonOptions).onChange
            ? [
                ...previous,
                {
                  index,
                  tabIndex,
                  isField: true,
                  targetClassName: '' + current.targetClassName,
                  onChange: '' + (current as CommonOptions).onChange,
                },
              ]
            : [...previous],
        [] as JQueryOnChangeModel[]
      )
    );
  }

  public hasOnChangeImplementation(): boolean {
    return this.dialogConfig.tabs.some(
      (tab) =>
        tab.onChange !== undefined ||
        tab.fields.some(
          (field) => (field as CommonOptions).onChange !== undefined
        )
    );
  }

  /**
   * buildJQuery creates the jquery files inside a directory
   * and returns the name of the files
   *
   * @param {string} dir directory path
   * @returns {string} clientlib javascript files
   */
  protected buildJQuery(dir: string): string {
    if (this.clientlibs.length === 0) {
      return '';
    }

    return this.clientlibs
      .map(({ filename, content }): string => {
        const file = dir + filename;
        fs.writeFileSync(path.resolve(file), content);

        return filename;
      })
      .join('\n');
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
    return (
      !Array.isArray(field.options) && field.options.dataSource !== 'undefined'
    );
  }
}
