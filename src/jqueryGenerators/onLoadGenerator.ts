import { JQueryGenerator, JQueryOnLoadModel } from '../models';
import { CommonOptions } from '../models/TouchUIFieldOptions.model';

/**
 * Generate JQuery model for hide functions in dialog fields
 *
 * @see `templates/onLoad.js` for usage
 */
export class OnLoadGenerator extends JQueryGenerator<JQueryOnLoadModel> {
  public get tabs(): JQueryOnLoadModel[] {
    return this.dialogConfig.tabs.reduce(
      (previous, current, index) =>
        current.onLoad
          ? [
              ...previous,
              {
                index,
                isTab: true,
                onLoad: '' + current.onLoad,
                onLoadTarget: current.onLoadTarget || '',
              },
            ]
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
                  onLoadTarget: (current as CommonOptions).onLoadTarget || '',
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
