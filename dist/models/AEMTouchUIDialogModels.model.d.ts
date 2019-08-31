/**
 * Please use index.ts to import and export the models out of model folder
 */
import * as options from './TouchUIFieldOptions.model';
export declare type TouchUIDialogFieldOptions = options.TextOptions | options.PathOptions | options.RichTextOptions | options.TextAreaOptions | options.CheckboxOptions | options.DropwdownOptions | options.NumberOptions | options.MultifieldOptions | options.ImagefieldOptions | options.ButtonOptions | options.MultifieldNestedOptions;
export interface AEMTouchUIDialog {
    sightlyTemplate?: string;
    componentName: string;
    componentGroup: string;
    componentDescription: string;
    componentPath: string;
    /**
     * The value of the sling:resourceSuperType of
     * the Resource node or resource super type of
     * the resource pointed to by the resource type.
     */
    resourceSuperType?: string;
    tabs: TouchUIDialogTab[];
    analytics?: TouchUIAnalytics;
    noDecoration?: boolean;
    isContainer?: boolean;
    /**
     * Sets the Tag that should be used to wrap the component,
     * the wrapper element should be added to the current component that are editable.
     * For non-editable component,  the wrapper element can be avoided if it serves no particular function,
     * so that the resulting markup is not unnecessarily bloated.
     */
    tag?: string;
    css?: string;
    noCqDesignDialog?: boolean;
}
export interface TouchUIDialogTab {
    title: string;
    fields: TouchUIDialogFieldOptions[];
}
export interface TouchUIAnalytics {
    events?: string[] | string;
    values?: string[] | string;
}
export interface Templates {
    buttonTemplate: string;
    componentTemplate: string;
    cqDesignDialogTemplate: string;
    cqEditConfigTemplate: string;
    dialogTemplate: string;
    dropdownTemplate: string;
    htmlTagTemplate: string;
    imagefieldTemplate: string;
    multifieldTemplate: string;
    multifieldNestedTemplate: string;
    numberfieldTemplate: string;
    pathfieldTemplate: string;
    richtextTemplate: string;
    checkboxTemplate: string;
    tabTemplate: string;
    textfieldTemplate: string;
    trackingTemplate: string;
}
//# sourceMappingURL=AEMTouchUIDialogModels.model.d.ts.map