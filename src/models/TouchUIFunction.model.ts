/**
 * Please use index.ts to import and export the models out of model folder
 */
export interface HideFunctionProps {
  contentPath: string;
}

export type HideFunction = (parameters: HideFunctionProps) => boolean;

export interface OnLoadFunctionProps {
  contentPath: string;
  targetElement: HTMLElement[];
  sourceElement: HTMLElement[];
}

export type OnLoadFunction = (parameters: OnLoadFunctionProps) => void;

export interface OnChangeFunctionProps {
  contentPath: string;
  targetElement: HTMLElement[];
  sourceElement: HTMLElement[];
}

export type OnChangeFunction = (parameters: OnChangeFunctionProps) => void;
