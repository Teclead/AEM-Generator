import { JQueryGenerator, JQueryOnLoadModel } from '../models';
import { CommonOptions } from '../models/TouchUIFieldOptions.model';

export class OnLoadGenerator extends JQueryGenerator<JQueryOnLoadModel> {
  public get tabs(): JQueryOnLoadModel[] {
    return this.dialogConfig.tabs.reduce(
      (previous, current, index) =>
        current.onLoad
          ? [...previous, { index, isTab: true, onLoad: '' + current.onLoad }]
          : [...previous],
      [] as JQueryOnLoadModel[]
    );
  }

  public get dialogFields(): JQueryOnLoadModel[] {
    return this.dialogConfig.tabs.flatMap((tab, tabIndex) =>
      tab.fields.reduce(
        (previous, current, index) =>
          (current as CommonOptions).onLoad
            ? [
                ...previous,
                {
                  index,
                  isTab: false,
                  tabIndex,
                  onLoad: '' + (current as CommonOptions).onLoad,
                },
              ]
            : [...previous],
        [] as JQueryOnLoadModel[]
      )
    );
  }

  public get hasImplementation(): boolean {
    return this.dialogConfig.tabs.some(
      (tab) =>
        tab.onLoad !== undefined ||
        tab.fields.some(
          (field) => (field as CommonOptions).onLoad !== undefined
        )
    );
  }
}
