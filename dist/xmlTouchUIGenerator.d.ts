import { AEMTouchUIDialog } from './models';
import { UiGenerator } from './uiGenerator';
export declare class TouchUIXMLGenerator extends UiGenerator {
    dialogConfig: AEMTouchUIDialog;
    constructor(dialogConfig: AEMTouchUIDialog);
    /**
     * getAnalytics() replaces the variables and event placeholders in the analytics template
     * @returns {string | null}
     * returns null if the analytics property (TouchUIAnalytics) is not set
     * returns tracking xml with events and variables if analytics property (TouchUIAnalytics) is configured
     */
    getAnalytics(): string | null;
    /**
     * getAEMConfig() replaces the config placeholders in the aem config template
     * @returns {string}
     * returns the AEM config xml with resourceType, title, group,
     * component description, decoration and container
     */
    getAEMConfig(): string;
    /**
     * getAnalyticsElements() converts the analytics object to string or returns the string
     * @param {string} type events | values
     * @returns {string}
     * returns the analyic elements as string instead of objects
     */
    getAnalyticsElements(type: 'events' | 'values'): string;
    /**
     * writeFilesToAEM() calls makeFolder() to create the folders
     * /_cq_dialog, /_cq_htmlTagm,/analytics, /_cq_design_dialog
     * and calls the write*-methods to create the AEM files
     */
    writeFilesToAEM(): void;
    /**
     * makeFolder() takes the component path and creates the
     * folder in the file system
     * @param {string} folderPath
     */
    makeFolder(folderPath: string): void;
    /**
     * writeDialog() create the /_cq_dialog/.content.xml file and
     * calls getDialog() to replace the placeholders in the dialog-template
     */
    writeDialog(): void;
    /**
     * writeHtmlTag() creates the /_cq_htmlTag/.content.xml file and
     * calls getHtmlTag() to replace the placeholders in the htmlTag-template
     */
    writeHtmlTag(): void;
    /**
     *  writeAnalytics() creates the /analytics/.content.xml file and
     *  calls getAnalytics() to replace the placeholders in the analytics-template
     */
    writeAnalytics(): void;
    /**
     * writeAEMConfig creates the /content.xml file
     * and calls getAEMConfig() to replace the placeholders in the AEMConfig-template
     */
    writeAEMConfig(): void;
    /**
     * writeCqConfig() creates the /_cq_editConfig.xml file
     * and replaces the placesholders in the CqConfig-template
     */
    writeCqConfig(): void;
    /**
     * writeCqDesignDialog() creates the /_cq_design_dialog/.content.xml file and
     * replaces the placeholders in the CqDesignDialog-template
     *  file in the file system
     */
    writeCqDesignDialog(): void;
    /**
     *  writeSightlyTemplate() creates *.html file and
     * relaces the placeholders in the html-template file
     */
    writeSightlyTemplate(): void;
}
//# sourceMappingURL=xmlTouchUIGenerator.d.ts.map