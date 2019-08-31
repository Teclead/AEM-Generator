import { AEMTouchUIDialog, MultifieldNestedOptions, MultifieldOptions, TouchUIDialogFieldOptions, TouchUIField, TouchUIFieldOption } from './models';
export declare class UiGenerator {
    dialogConfig: AEMTouchUIDialog;
    constructor(dialogConfig: AEMTouchUIDialog);
    /**
     * getCqConfig() returns cqEditConfig template string
     */
    getCqConfig(): string;
    /**
     * getCqDesignDialog() returns getCqDesignDialog template string
     */
    getCqDesignDialog(): string;
    /**
     * getDialog() replaces the config placeholders Title and Tab
     * in the dialog template and returns dialog template string
     */
    getDialog(): string;
    /**
     * getHtmlTag() replaces the config placeholders Tag and Class
     * in the getHtmlTag template and returns getHtmlTag template string
     */
    getHtmlTag(): string;
    /**
     * buildTabs() replaces the config placeholders Element, Title and Fields
     * in the buildTabs template and returns buildTabs template string
     */
    buildTabs(): string;
    /**
     * getTemplate() check the field type and return
     * the right field template string
     * @param  field TouchUIDialogFieldOptions
     * @returns {string}
     */
    getTemplate(field: TouchUIDialogFieldOptions): string;
    /**
     * getField() calls
     * the right field template string getTemplate() to get the field
     * and replaces the config placeholders Common, MaxLength, Max, Min, Required,
     * isDisabled, Element, Title, Database, Description
     * @param  field TouchUIDialogFieldOptions, i: number
     * @returns {string}
     */
    getField(field: TouchUIDialogFieldOptions, i: number): string;
    /**
     * getOption() returns string element
     * @param  option: TouchUIFieldOption, i: number
     * @returns {string}
     */
    getOption(option: TouchUIFieldOption, i: number): string;
    /**
     * getMultiField() returns the multifieldtype or FIELD-TYPE-ERROR
     * @param  field: TouchUIDialogFieldOptions
     * @returns {string}
     */
    getMultiField(field: MultifieldOptions): TouchUIField | "FIELD-TYPE-ERROR";
    /**
     * getMultiFieldNested() calls  getField and returns the field string template
     * @param  field: TouchUIDialogFieldOptions
     * @returns {string}
     */
    getMultiFieldNested(field: MultifieldNestedOptions): string;
    /**
     * getSightlyTemplate() creates the sightly Template file if we have sightlyTemplate
     * in config
     * @returns {string}
     */
    getSightlyTemplate(): string | undefined;
}
//# sourceMappingURL=uiGenerator.d.ts.map