/**
 * Please use index.ts to import and export the models out of model folder
 */
export interface HideFunctionProps {
    contentPath: string;
}

export type HideFunction = (params: HideFunctionProps) => boolean;

export interface TouchUIFunction {
        hide: HideFunction;
}