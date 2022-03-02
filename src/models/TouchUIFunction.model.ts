/**
 * Please use index.ts to import and export the models out of model folder
 */
export interface HideFunctionProps {
  contentPath: string;
}

export type HideFunction = (params: HideFunctionProps) => boolean;

export interface OnLoadFunctionProps {
  contentPath: string;
}

export type OnLoadFunction = (params: OnLoadFunctionProps) => void;

export interface OnChangeFunctionProps {
  contentPath: string;
  targetElement: HTMLElement[];
}

export type OnChangeFunction = (params: OnChangeFunctionProps) => void;

export interface TouchUIFunction {
  hide: HideFunction;
}
