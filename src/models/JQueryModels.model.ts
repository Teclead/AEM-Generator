/**
 * Please use index.ts to import and export the models out of model folder
 */
import { HideFunction, OnLoadFunction } from './TouchUIFunction.model';

export interface JQueryHideModel {
  index: number;
  tabIndex?: number;
  isTab: boolean;
  hide: HideFunction | string;
}

export interface JQueryOnLoadModel {
  index: number;
  tabIndex?: number;
  onLoad: OnLoadFunction | string;
}
