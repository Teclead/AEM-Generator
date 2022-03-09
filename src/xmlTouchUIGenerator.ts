import * as fs from 'fs';
import * as path from 'path';
import { AEMTouchUIDialog, PlaceHolder } from './models';
import { UiGenerator } from './uiGenerator';
import { template } from './xmlTouchUITemplate';

export class TouchUIXMLGenerator<T = object> extends UiGenerator<T> {
  public constructor(dialogConfig: AEMTouchUIDialog<T>) {
    super(dialogConfig);
  }

  /**
   * getAnalytics() replaces the variables and event placeholders in the analytics template
   *
   * @returns {string | null}
   * returns null if the analytics property (TouchUIAnalytics) is not set
   * returns tracking xml with events and variables if analytics property (TouchUIAnalytics) is configured
   */
  public getAnalytics(): string | null {
    return !this.dialogConfig.analytics
      ? null
      : template.tracking
          .replace(PlaceHolder.Title, this.dialogConfig.componentName)
          .replace(PlaceHolder.Group, this.dialogConfig.componentGroup)
          .replace(
            PlaceHolder.TrackingEvents,
            this.getAnalyticsElements('events')
          )
          .replace(
            PlaceHolder.TrackingVariables,
            this.getAnalyticsElements('values')
          )
          .replace(PlaceHolder.Group, this.dialogConfig.componentGroup);
  }

  /**
   * getAEMConfig() replaces the config placeholders in the aem config template
   *
   * @returns {string}
   * returns the AEM config xml with resourceType, title, group,
   * component description, decoration and container
   */
  public getAEMConfig(): string {
    template.component = !this.dialogConfig.resourceSuperType
      ? template.component.replace(PlaceHolder.ResourceSuperType, '')
      : (template.component = template.component.replace(
          PlaceHolder.ResourceSuperType,
          'sling:resourceSuperType="' +
            this.dialogConfig.resourceSuperType +
            '"'
        ));

    return template.component
      .replace(PlaceHolder.Title, this.dialogConfig.componentName)
      .replace(PlaceHolder.Group, this.dialogConfig.componentGroup)
      .replace(
        PlaceHolder.ComponentDescription,
        this.dialogConfig.componentDescription
      )
      .replace(
        PlaceHolder.NoDecoration,
        '{Boolean}' +
          String(
            this.dialogConfig.noDecoration
              ? this.dialogConfig.noDecoration
              : false
          )
      )
      .replace(
        PlaceHolder.IsContainer,
        String(
          this.dialogConfig.isContainer ? this.dialogConfig.isContainer : false
        )
      );
  }

  /**
   * getAnalyticsElements() converts the analytics object to string or returns the string
   *
   * @param {string} type events | values
   * @returns {string}
   * returns the analyic elements as string instead of objects
   */
  public getAnalyticsElements(type: 'events' | 'values'): string {
    if (!this.dialogConfig.analytics || !this.dialogConfig.analytics[type]) {
      return '';
    }

    switch (typeof this.dialogConfig.analytics[type]) {
      case 'string':
        return this.dialogConfig.analytics[type] as string;
      case 'object':
        return (this.dialogConfig.analytics[type] as []).join(',');
      default:
        return '';
    }
  }

  /**
   * writeFilesToAEM() calls makeFolder() to create the folders
   * /_cq_dialog, /_cq_htmlTagm,/analytics, /_cq_design_dialog, /clientlibs
   * and calls the write*-methods to create the AEM files
   */
  public writeFilesToAEM(): void {
    this.makeFolder(this.dialogConfig.componentPath);

    if (this.dialogConfig.tabs) {
      this.makeFolder(this.dialogConfig.componentPath + '/_cq_dialog');

      this.writeDialog();

      // remove clientlibs for every rebuild
      if (this.existFolder(this.dialogConfig.componentPath + '/clientlibs')) {
        this.deleteFolder(this.dialogConfig.componentPath + '/clientlibs');
      }

      // required condition to create clientlibs
      const hasCustomFunctions =
        this.hideGenerator.hasImplementation ||
        this.onLoadGenerator.hasImplementation ||
        this.onChangeGenerator.hasImplementation;

      if (hasCustomFunctions) {
        this.makeFolder(this.dialogConfig.componentPath + '/clientlibs');
        this.writeClientLibs();
      }

      // Optional html-tag values for the component.
      if (this.dialogConfig.tag && this.dialogConfig.css) {
        this.makeFolder(this.dialogConfig.componentPath + '/_cq_htmlTag');
        this.writeHtmlTag();
      }
    }

    if (this.dialogConfig.analytics) {
      this.makeFolder(this.dialogConfig.componentPath + '/analytics');
      this.writeAnalytics();
    }

    if (this.dialogConfig.newPar) {
      this.makeFolder(this.dialogConfig.componentPath + '/new');
      this.writeNewParConfig();
    }

    this.writeAEMConfig();

    this.writeCqConfig();

    this.writeSightlyTemplate();

    if (!this.dialogConfig.noCqDesignDialog) {
      this.makeFolder(this.dialogConfig.componentPath + '/_cq_design_dialog');
      this.writeCqDesignDialog();
    }
  }

  /**
   * makeFolder() takes the component path and creates the
   * folder in the file system
   *
   * @param {string} folderPath path where the folder should be created
   */
  public makeFolder(folderPath: string): void {
    try {
      // handle new node versions
      fs.mkdirSync(path.resolve(folderPath), { recursive: true });

      return;
    } catch (error) {
      console.warn(error);
    }

    // first folder
    let currentFolder = path.resolve(folderPath.split('/')[0]);

    // create folder if it does not exist
    for (const folder of folderPath.split('/')) {
      currentFolder += '/' + folder;

      if (!fs.existsSync(path.resolve(currentFolder))) {
        fs.mkdirSync(path.resolve(currentFolder));
      }
    }
  }

  /**
   * deleteFolder() takes the component path and delete the
   * folder in the file system when is exist
   *
   * @param {string} folderPath path there the folder should be deleted
   */
  public deleteFolder(folderPath: string): void {
    if (!this.existFolder(folderPath)) {
      return;
    }

    try {
      const files = fs.readdirSync(folderPath);

      if (!files) {
        fs.rmdirSync(folderPath);
      } else {
        for (const file of files) {
          fs.unlinkSync(path.resolve(folderPath + '/' + file));
        }

        fs.rmdirSync(folderPath);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  /**
   * existingFolder() takes the component path and check the
   * folder in the file system if exist
   *
   * @param {string} folderPath path where to check if the folder exists
   * @returns {boolean} folder exists
   */
  public existFolder(folderPath: string): boolean {
    return fs.existsSync(path.resolve(folderPath));
  }
  /**
   * writeDialog() create the /_cq_dialog/.content.xml file and
   * calls getDialog() to replace the placeholders in the dialog-template
   */
  public writeDialog(): void {
    const filePath = path.resolve(
      this.dialogConfig.componentPath + '/_cq_dialog/.content.xml'
    );
    fs.writeFileSync(path.resolve(filePath), this.getDialog());
    console.info('AEM Touch UI Dialog built: ' + filePath);
  }
  /**
   * writeHtmlTag() creates the /_cq_htmlTag/.content.xml file and
   * calls getHtmlTag() to replace the placeholders in the htmlTag-template
   */
  public writeHtmlTag(): void {
    if (!this.getHtmlTag() || this.getHtmlTag() === 'undefined') {
      console.info('No HTML for:', this.dialogConfig.componentName);

      return;
    }

    const filePath = path.resolve(
      this.dialogConfig.componentPath + '/_cq_htmlTag/.content.xml'
    );
    fs.writeFileSync(path.resolve(filePath), this.getHtmlTag());
    console.info('AEM Touch UI HTML-Tag built: ' + filePath);
  }

  /**
   * writeAnalytics() creates the /analytics/.content.xml file and
   * calls getAnalytics() to replace the placeholders in the analytics-template
   */
  public writeAnalytics(): void {
    const filePath = path.resolve(
      this.dialogConfig.componentPath + '/analytics/.content.xml'
    );
    const analytics = this.getAnalytics();

    if (!analytics) {
      console.warn('No AEM Analytics found');
    } else {
      fs.writeFileSync(path.resolve(filePath), analytics);
      console.info('AEM Analtics XML built: ' + filePath);
    }
  }

  /**
   * writeAEMConfig creates the /content.xml file
   * and calls getAEMConfig() to replace the placeholders in the AEMConfig-template
   */
  public writeAEMConfig(): void {
    const filePath = path.resolve(
      this.dialogConfig.componentPath + '/.content.xml'
    );
    fs.writeFileSync(path.resolve(filePath), this.getAEMConfig());
    console.info('AEM Config XML built: ' + filePath);
  }

  /**
   * writeCqConfig() creates the /_cq_editConfig.xml file
   * and replaces the placesholders in the CqConfig-template
   */
  public writeCqConfig(): void {
    const filePath = path.resolve(
      this.dialogConfig.componentPath + '/_cq_editConfig.xml'
    );
    fs.writeFileSync(path.resolve(filePath), this.getCqConfig());
    console.info('AEM Cq Edit Config XML built: ' + filePath);
  }

  /**
   * writeNewParConfig() creates the /new/.content.xml file
   */
  public writeNewParConfig(): void {
    const filePath = path.resolve(
      this.dialogConfig.componentPath + '/new/.content.xml'
    );

    fs.writeFileSync(path.resolve(filePath), this.getNewParConfig());
    console.info('AEM New Par Component built: ' + filePath);
  }

  /**
   * writeCqDesignDialog() creates the /_cq_design_dialog/.content.xml file and
   * replaces the placeholders in the CqDesignDialog-template
   * file in the file system
   */
  public writeCqDesignDialog(): void {
    const filePath = path.resolve(
      this.dialogConfig.componentPath + '/_cq_design_dialog/.content.xml'
    );

    try {
      fs.writeFileSync(path.resolve(filePath), this.getCqDesignDialog());
      console.info('AEM Cq Design Dialog Config XML built: ' + filePath);
    } catch (error) {
      console.warn('Design dialog failed:', error);
    }
  }

  /**
   * writeSightlyTemplate() creates *.html file and
   * relaces the placeholders in the html-template file
   */
  public writeSightlyTemplate(): void {
    if (!this.getSightlyTemplate()) {
      console.log('No Sightly Template', this.dialogConfig.componentName);

      return;
    }

    const file =
      this.dialogConfig.componentPath.split('/')[
        this.dialogConfig.componentPath.split('/').length - 1
      ];
    const filePath = path.resolve(
      this.dialogConfig.componentPath + '/' + file + '.html'
    );
    fs.writeFileSync(path.resolve(filePath), this.getSightlyTemplate());
    console.info('REACT Template built: ' + filePath);
  }

  public writeClientLibs(): void {
    const filePath = path.resolve(
      this.dialogConfig.componentPath + '/clientlibs/.content.xml'
    );
    fs.writeFileSync(path.resolve(filePath), this.buildCqClientLibs());

    const txtFile = path.resolve(
      this.dialogConfig.componentPath + '/clientlibs/js.txt'
    );
    fs.writeFileSync(
      path.resolve(txtFile),
      this.buildJQuery(this.dialogConfig.componentPath + '/clientlibs/')
    );

    console.info('Clientlibs built: ' + filePath);
  }
}
