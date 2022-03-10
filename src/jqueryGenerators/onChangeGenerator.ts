import {
  JQueryGenerator,
  JQueryOnChangeModel,
  TouchUIDialogFieldOptions,
} from '../models';
import { CommonOptions } from '../models/TouchUIFieldOptions.model';

/**
 * Generate JQuery model for onChange functions in dialog fields
 *
 * @see `templates/onChange.js` for usage
 */
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
                onChange: `${current.onChange || ''}`,
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
          (current as CommonOptions).onChange ||
          this.getMultifields(current)?.length
            ? [
                ...previous,
                {
                  index,
                  tabIndex,
                  isTab: false,
                  targetClassName: current.targetClassName,
                  multifields: this.getMultifields(current),
                  onChange: `${(current as CommonOptions).onChange || ''}`,
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
        !!tab.onChange ||
        tab.fields.some(
          (field) => (field as CommonOptions).onChange !== undefined
        ) ||
        tab.fields.some(
          (field) =>
            field.multifieldOptions?.length &&
            field.multifieldOptions.some(
              (option: TouchUIDialogFieldOptions) => !!option.onChange
            )
        )
    );
  }

  protected getMultifields(
    field: TouchUIDialogFieldOptions
  ): JQueryOnChangeModel[] | undefined {
    if (!this.isMultifield(field) || !field.multifieldOptions?.length) {
      return undefined;
    }

    const options = field.multifieldOptions as TouchUIDialogFieldOptions[];
    const model: JQueryOnChangeModel[] = options
      .map((option, index) => ({
        index,
        isTab: false,
        onChange: `${option.onChange || ''}`,
        targetClassName: option.targetClassName,
      }))
      .filter(({ onChange }) => !!onChange);

    return model.length ? model : undefined;
  }
}
