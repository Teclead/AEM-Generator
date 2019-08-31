"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var templates = {};
var exists = fs.existsSync('dialogGenerator.json');
if (exists) {
    var templatesPaths = fs.readFileSync('dialogGenerator.json');
    templates = JSON.parse(templatesPaths);
}
module.exports = {
    buttonTemplate: templates.buttonTemplate || '',
    componentTemplate: templates.componentTemplate || '',
    cqDesignDialogTemplate: templates.cqDesignDialogTemplate || '',
    cqEditConfigTemplate: templates.cqEditConfigTemplate || '',
    dialogTemplate: templates.dialogTemplate || '',
    dropdownTemplate: templates.dropdownTemplate || '',
    htmlTagTemplate: templates.htmlTagTemplate || '',
    imagefieldTemplate: templates.imagefieldTemplate || '',
    multifieldTemplate: templates.multifieldTemplate || '',
    multifieldNestedTemplate: templates.multifieldNestedTemplate || '',
    numberfieldTemplate: templates.numberfieldTemplate || '',
    pathfieldTemplate: templates.pathfieldTemplate || '',
    richtextTemplate: templates.richtextTemplate || '',
    checkboxTemplate: templates.checkboxTemplate || '',
    tabTemplate: templates.tabTemplate || '',
    textfieldTemplate: templates.textfieldTemplate || '',
    trackingTemplate: templates.trackingTemplate || ''
};
//# sourceMappingURL=dialogGeneratorConfig.js.map