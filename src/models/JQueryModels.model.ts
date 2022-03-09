/**
 * Please use index.ts to import and export the models out of model folder
 */
import { AEMTouchUIDialog } from './AEMTouchUIDialogModels.model';
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
  multifields?: JQueryOnLoadModel[];
}

export interface JQueryOnChangeModel extends JQueryModel {
  onChange: OnChangeFunction | string;
  targetClassName: string;
  multifields?: JQueryOnChangeModel[];
}

export abstract class JQueryGenerator<T> {
  protected dialogConfig: AEMTouchUIDialog;
  public constructor(dialogConfig: AEMTouchUIDialog) {
    this.dialogConfig = dialogConfig;
  }
  public abstract get hasImplementation(): boolean;
  public abstract get tabs(): T[];
  public abstract get dialogFields(): T[];
}
