/**
 * Please use index.ts to import and export the models out of model folder
 */
import {
  HideFunction,
  OnChangeFunction,
  OnLoadFunction,
} from './TouchUIFunction.model';

export interface JQueryHideModel {
  index: number;
  tabIndex?: number;
  isTab: boolean;
  hide: HideFunction | string;
}

export interface JQueryOnLoadModel {
  index: number;
  onLoad: OnLoadFunction | string;
}

export interface JQueryOnChangeModel {
  index: number;
  tabIndex?: number;
  isField: boolean;
  onChange: OnChangeFunction | string;
  targetClassName: string;
}
