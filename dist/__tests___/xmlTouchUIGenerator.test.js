"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var xmlTouchUIGenerator_1 = require("./../xmlTouchUIGenerator");
var fs = __importStar(require("fs"));
var xmlTouchUIGenerator_test_data_1 = require("./xmlTouchUIGenerator.test.data");
describe('xml generator for touch ui aem dialogs', function () {
    var UIGenerator = new xmlTouchUIGenerator_1.TouchUIXMLGenerator(xmlTouchUIGenerator_test_data_1.exampleTouchUIDialog);
    var touchUIDialogPath = './src/__tests___/results/touchUI/_cq_dialog/.content.xml';
    var analyticsPath = './src/__tests___/results/touchUI/analytics/.content.xml';
    var configPath = './src/__tests___/results/touchUI/.content.xml';
    var reactPath = './src/__tests___/results/touchUI/touchUI.html';
    var cqConfigPath = './src/__tests___/results/touchUI/_cq_editConfig.xml';
    var cqDesignDialogPath = './src/__tests___/results/touchUI/_cq_design_dialog/.content.xml';
    var htmlTagPath = './src/__tests___/results/touchUI/_cq_htmlTag/.content.xml';
    var externalReactAppTemplate = './src/templates/reactExternal.template.html';
    [touchUIDialogPath, analyticsPath, configPath].forEach(function (file) {
        try {
            fs.unlinkSync(file);
        }
        catch (e) {
            //
        }
    });
    UIGenerator.writeFilesToAEM();
    it('should print the touchUI dialog', function () {
        var renderedFile = fs.readFileSync(touchUIDialogPath).toString();
        expect(renderedFile).toMatchSnapshot();
    });
    it('should print the analytics file', function () {
        var renderedFile = fs.readFileSync(analyticsPath).toString();
        expect(renderedFile).toMatchSnapshot();
    });
    it('should print the component config file', function () {
        var renderedFile = fs.readFileSync(configPath).toString();
        expect(renderedFile).toMatchSnapshot();
    });
    it('should print the react template file', function () {
        var renderedFile = fs.readFileSync(reactPath).toString();
        expect(renderedFile).toMatchSnapshot();
    });
    it('should print the cq config file', function () {
        var renderedFile = fs.readFileSync(cqConfigPath).toString();
        expect(renderedFile).toMatchSnapshot();
    });
    it('should print the cq design dialog file', function () {
        var renderedFile = fs.readFileSync(cqDesignDialogPath).toString();
        expect(renderedFile).toMatchSnapshot();
    });
    it('should print the html-tag file', function () {
        var renderedFile = fs.readFileSync(htmlTagPath).toString();
        expect(renderedFile).toMatchSnapshot();
    });
    it('should print a template for a external react app', function () {
        var externalReactAppPath = './src/__tests___/results/externalReactApp';
        var externalreactPath = './src/__tests___/results/externalReactApp/externalReactApp.html';
        var config = {
            componentName: 'externalApp',
            sightlyTemplate: externalReactAppTemplate,
            componentGroup: 'External Group',
            componentDescription: '...',
            componentPath: externalReactAppPath,
            tabs: []
        };
        var touchUIGenerator = new xmlTouchUIGenerator_1.TouchUIXMLGenerator(config);
        touchUIGenerator.writeFilesToAEM();
        var renderedFile = fs.readFileSync(externalreactPath).toString();
        expect(renderedFile).toMatchSnapshot();
    });
});
//# sourceMappingURL=xmlTouchUIGenerator.test.js.map