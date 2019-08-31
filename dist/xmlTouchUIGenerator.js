"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var models_1 = require("./models");
var uiGenerator_1 = require("./uiGenerator");
var xmlTouchUITemplate_1 = require("./xmlTouchUITemplate");
var TouchUIXMLGenerator = /** @class */ (function (_super) {
    __extends(TouchUIXMLGenerator, _super);
    function TouchUIXMLGenerator(dialogConfig) {
        var _this = _super.call(this, dialogConfig) || this;
        _this.dialogConfig = dialogConfig;
        return _this;
    }
    /**
     * getAnalytics() replaces the variables and event placeholders in the analytics template
     * @returns {string | null}
     * returns null if the analytics property (TouchUIAnalytics) is not set
     * returns tracking xml with events and variables if analytics property (TouchUIAnalytics) is configured
     */
    TouchUIXMLGenerator.prototype.getAnalytics = function () {
        return !this.dialogConfig.analytics
            ? null
            : xmlTouchUITemplate_1.template.tracking
                .replace(models_1.PlaceHolder.Title, this.dialogConfig.componentName)
                .replace(models_1.PlaceHolder.Group, this.dialogConfig.componentGroup)
                .replace(models_1.PlaceHolder.TrackingEvents, this.getAnalyticsElements('events'))
                .replace(models_1.PlaceHolder.TrackingVars, this.getAnalyticsElements('values'))
                .replace(models_1.PlaceHolder.Group, this.dialogConfig.componentGroup);
    };
    /**
     * getAEMConfig() replaces the config placeholders in the aem config template
     * @returns {string}
     * returns the AEM config xml with resourceType, title, group,
     * component description, decoration and container
     */
    TouchUIXMLGenerator.prototype.getAEMConfig = function () {
        xmlTouchUITemplate_1.template.component = !this.dialogConfig.resourceSuperType
            ? xmlTouchUITemplate_1.template.component.replace(models_1.PlaceHolder.ResourceSuperType, '')
            : (xmlTouchUITemplate_1.template.component = xmlTouchUITemplate_1.template.component.replace(models_1.PlaceHolder.ResourceSuperType, 'sling:resourceSuperType="' +
                this.dialogConfig.resourceSuperType +
                '"'));
        return xmlTouchUITemplate_1.template.component
            .replace(models_1.PlaceHolder.Title, this.dialogConfig.componentName)
            .replace(models_1.PlaceHolder.Group, this.dialogConfig.componentGroup)
            .replace(models_1.PlaceHolder.ComponentDescription, this.dialogConfig.componentDescription)
            .replace(models_1.PlaceHolder.NoDecoration, '{Boolean}' +
            String(this.dialogConfig.noDecoration
                ? this.dialogConfig.noDecoration
                : false))
            .replace(models_1.PlaceHolder.IsContainer, String(this.dialogConfig.isContainer ? this.dialogConfig.isContainer : false));
    };
    /**
     * getAnalyticsElements() converts the analytics object to string or returns the string
     * @param {string} type events | values
     * @returns {string}
     * returns the analyic elements as string instead of objects
     */
    TouchUIXMLGenerator.prototype.getAnalyticsElements = function (type) {
        if (!this.dialogConfig.analytics || !this.dialogConfig.analytics[type]) {
            return '';
        }
        switch (typeof this.dialogConfig.analytics[type]) {
            case 'string':
                return this.dialogConfig.analytics[type];
            case 'object':
                return this.dialogConfig.analytics[type].join();
            default:
                return '';
        }
    };
    /**
     * writeFilesToAEM() calls makeFolder() to create the folders
     * /_cq_dialog, /_cq_htmlTagm,/analytics, /_cq_design_dialog
     * and calls the write*-methods to create the AEM files
     */
    TouchUIXMLGenerator.prototype.writeFilesToAEM = function () {
        this.makeFolder(this.dialogConfig.componentPath);
        if (this.dialogConfig.tabs) {
            this.makeFolder(this.dialogConfig.componentPath + '/_cq_dialog');
            this.writeDialog();
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
        this.writeAEMConfig();
        this.writeCqConfig();
        this.writeSightlyTemplate();
        if (!this.dialogConfig.noCqDesignDialog) {
            this.makeFolder(this.dialogConfig.componentPath + '/_cq_design_dialog');
            this.writeCqDesignDialog();
        }
    };
    /**
     * makeFolder() takes the component path and creates the
     * folder in the file system
     * @param {string} folderPath
     */
    TouchUIXMLGenerator.prototype.makeFolder = function (folderPath) {
        // first folder
        var currentFolder = path.resolve(folderPath.split('/')[0]);
        // create folder if it does not exist
        folderPath.split('/').forEach(function (folder) {
            currentFolder += '/' + folder;
            if (!fs.existsSync(path.resolve(currentFolder))) {
                fs.mkdirSync(path.resolve(currentFolder));
            }
        });
    };
    /**
     * writeDialog() create the /_cq_dialog/.content.xml file and
     * calls getDialog() to replace the placeholders in the dialog-template
     */
    TouchUIXMLGenerator.prototype.writeDialog = function () {
        var filePath = path.resolve(this.dialogConfig.componentPath + '/_cq_dialog/.content.xml');
        fs.writeFileSync(path.resolve(filePath), this.getDialog());
        console.info('AEM Touch UI Dialog built: ' + filePath);
    };
    /**
     * writeHtmlTag() creates the /_cq_htmlTag/.content.xml file and
     * calls getHtmlTag() to replace the placeholders in the htmlTag-template
     */
    TouchUIXMLGenerator.prototype.writeHtmlTag = function () {
        var filePath = path.resolve(this.dialogConfig.componentPath + '/_cq_htmlTag/.content.xml');
        fs.writeFileSync(path.resolve(filePath), this.getHtmlTag());
        console.info('AEM Touch UI HTML-Tag built: ' + filePath);
    };
    /**
     *  writeAnalytics() creates the /analytics/.content.xml file and
     *  calls getAnalytics() to replace the placeholders in the analytics-template
     */
    TouchUIXMLGenerator.prototype.writeAnalytics = function () {
        var filePath = path.resolve(this.dialogConfig.componentPath + '/analytics/.content.xml');
        fs.writeFileSync(path.resolve(filePath), this.getAnalytics());
        console.info('AEM Analtics XML built: ' + filePath);
    };
    /**
     * writeAEMConfig creates the /content.xml file
     * and calls getAEMConfig() to replace the placeholders in the AEMConfig-template
     */
    TouchUIXMLGenerator.prototype.writeAEMConfig = function () {
        var filePath = path.resolve(this.dialogConfig.componentPath + '/.content.xml');
        fs.writeFileSync(path.resolve(filePath), this.getAEMConfig());
        console.info('AEM Config XML built: ' + filePath);
    };
    /**
     * writeCqConfig() creates the /_cq_editConfig.xml file
     * and replaces the placesholders in the CqConfig-template
     */
    TouchUIXMLGenerator.prototype.writeCqConfig = function () {
        var filePath = path.resolve(this.dialogConfig.componentPath + '/_cq_editConfig.xml');
        fs.writeFileSync(path.resolve(filePath), this.getCqConfig());
        console.info('AEM Cq Edit Config XML built: ' + filePath);
    };
    /**
     * writeCqDesignDialog() creates the /_cq_design_dialog/.content.xml file and
     * replaces the placeholders in the CqDesignDialog-template
     *  file in the file system
     */
    TouchUIXMLGenerator.prototype.writeCqDesignDialog = function () {
        var filePath = path.resolve(this.dialogConfig.componentPath + '/_cq_design_dialog/.content.xml');
        fs.writeFileSync(path.resolve(filePath), this.getCqDesignDialog());
        console.info('AEM Cq Design Dialog Config XML built: ' + filePath);
    };
    /**
     *  writeSightlyTemplate() creates *.html file and
     * relaces the placeholders in the html-template file
     */
    TouchUIXMLGenerator.prototype.writeSightlyTemplate = function () {
        var file = this.dialogConfig.componentPath.split('/')[this.dialogConfig.componentPath.split('/').length - 1];
        var filePath = path.resolve(this.dialogConfig.componentPath + '/' + file + '.html');
        fs.writeFileSync(path.resolve(filePath), this.getSightlyTemplate());
        console.info('REACT Template built: ' + filePath);
    };
    return TouchUIXMLGenerator;
}(uiGenerator_1.UiGenerator));
exports.TouchUIXMLGenerator = TouchUIXMLGenerator;
//# sourceMappingURL=xmlTouchUIGenerator.js.map