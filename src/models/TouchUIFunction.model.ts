/**
 * Please use index.ts to import and export the models out of model folder
 */
export interface HideFunctionProperties {
  contentPath: string;
}

export type HideFunction = (parameters: HideFunctionProperties) => boolean;

export interface OnLoadFunctionProperties {
  contentPath: string;
}

export type OnLoadFunction = (parameters: OnLoadFunctionProperties) => void;

export interface OnChangeFunctionProperties {
  contentPath: string;
  targetElement: HTMLElement[];
}

export type OnChangeFunction = (parameters: OnChangeFunctionProperties) => void;

export interface TouchUIFunction {
  hide: HideFunction;
}
