/**
 * Please use index.ts to import and export the models out of model folder
 */
import {
  AEMTouchUIDialog,
  TouchUIDialogFieldOptions,
} from './AEMTouchUIDialogModels.model';
import { TouchUIField } from './TouchUIFieldEnum.model';
import {
  HideFunction,
  OnChangeFunction,
  OnLoadFunction,
} from './TouchUIFunction.model';

interface JQueryModel {
  index: number;
  tabIndex?: number;
  isTab: boolean;
}

export interface JQueryHideModel extends JQueryModel {
  hide: HideFunction | string;
  multifields?: JQueryHideModel[];
}

export interface JQueryOnLoadModel extends JQueryModel {
  onLoad: OnLoadFunction | string;
  onLoadTarget: string;
  multifields?: JQueryOnLoadModel[];
}

export interface JQueryOnChangeModel extends JQueryModel {
  onChange: OnChangeFunction | string;
  onChangeTarget: string;
  multifields?: JQueryOnChangeModel[];
}

/**
 * Abstract class to generate JQuery models for clientlibs
 *
 * @see `jqueryGenerators/*` for examples
 */
export abstract class JQueryGenerator<T extends JQueryModel> {
  protected dialogConfig: AEMTouchUIDialog;

  /**
   * @param {AEMTouchUIDialog} dialogConfig AEM Touch UI dialog configurationn
   */
  public constructor(dialogConfig: AEMTouchUIDialog) {
    this.dialogConfig = dialogConfig;
  }

  /**
   * Returns the component path which is used for ./sling:resourceType
   *
   * @returns {string} ./sling:resourceType
   */
  public get componentPath(): string {
    const path = this.dialogConfig.componentPath.split('/jcr_root/apps/');

    return path.length > 1 ? path[1] : path[0];
  }

  /**
   * Checks if the dialog has the provided JQuery Implementation
   *
   * @returns {boolean} has implementation in dialog
   */
  public abstract get hasImplementation(): boolean;

  /**
   * Returns the JQueryModel for tabs
   *
   * @returns {JQueryModel[]} JQuery Tab Model
   */
  public abstract get tabs(): T[];

  /**
   * Returns the JQueryModel for fields
   *
   * @returns {JQueryModel[]} JQuery Field Model
   */
  public abstract get dialogFields(): T[];

  /**
   * Checks if the field is MultifieldNested
   *
   * @param {TouchUIDialogFieldOptions} field the field inside a dialog which needs to be checked
   * @returns {boolean} is multifield nested
   */
  protected isMultifield(field: TouchUIDialogFieldOptions): boolean {
    return field.type === TouchUIField.MultifieldNested;
  }
}
