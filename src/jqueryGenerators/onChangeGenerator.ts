import { JQueryGenerator, JQueryOnChangeModel } from '../models';
import { CommonOptions } from '../models/TouchUIFieldOptions.model';

export class OnChangeGenerator extends JQueryGenerator<JQueryOnChangeModel> {
  public get tabs(): JQueryOnChangeModel[] {
    return this.dialogConfig.tabs.reduce(
      (previous, current, index) =>
        current.onChange
          ? [
              ...previous,
              {
                index,
                isTab: true,
                onChange: '' + current.onChange,
                targetClassName: '',
              },
            ]
          : [...previous],
      [] as JQueryOnChangeModel[]
    );
  }

  public get dialogFields(): JQueryOnChangeModel[] {
    return this.dialogConfig.tabs.flatMap((tab, tabIndex) =>
      tab.fields.reduce(
        (previous, current, index) =>
          (current as CommonOptions).onChange
            ? [
                ...previous,
                {
                  index,
                  tabIndex,
                  isTab: false,
                  targetClassName: '' + current.targetClassName,
                  onChange: '' + (current as CommonOptions).onChange,
                },
              ]
            : [...previous],
        [] as JQueryOnChangeModel[]
      )
    );
  }

  public get hasImplementation(): boolean {
    return this.dialogConfig.tabs.some(
      (tab) =>
        tab.onChange !== undefined ||
        tab.fields.some(
          (field) => (field as CommonOptions).onChange !== undefined
        )
    );
  }
}
