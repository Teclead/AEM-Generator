/**
 * Please use index.ts to import and export the models out of model folder
 */
import { HideFunction } from './TouchUIFunction.model';

export interface JQueryHideModel {
    index: number;
    tabIndex?: number;
    isTab: boolean;
    hide: HideFunction | string;
}