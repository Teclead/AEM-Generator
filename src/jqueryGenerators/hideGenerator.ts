import { JQueryGenerator, JQueryHideModel } from '../models';
import { CommonOptions } from '../models/TouchUIFieldOptions.model';

/**
 * Generate JQuery model for hide functions in dialog fields
 *
 * @see `templates/hide.js` for usage
 */
export class HideGenerator extends JQueryGenerator<JQueryHideModel> {
  public get tabs(): JQueryHideModel[] {
    return this.dialogConfig.tabs.reduce(
      (previous, current, index) =>
        current.hide
          ? [...previous, { index, isTab: true, hide: '' + current.hide }]
          : [...previous],
      [] as JQueryHideModel[]
    );
  }

  public get dialogFields(): JQueryHideModel[] {
    return this.dialogConfig.tabs.flatMap((tab, tabIndex) =>
      tab.fields.reduce(
        (previous, current, index) =>
          (current as CommonOptions).hide
            ? [
                ...previous,
                {
                  index,
                  tabIndex,
                  isTab: false,
                  hide: '' + (current as CommonOptions).hide,
                },
              ]
            : [...previous],
        [] as JQueryHideModel[]
      )
    );
  }

  public get hasImplementation(): boolean {
    return this.dialogConfig.tabs.some(
      (tab) =>
        tab.hide !== undefined ||
        tab.fields.some((field) => (field as CommonOptions).hide !== undefined)
    );
  }
}
