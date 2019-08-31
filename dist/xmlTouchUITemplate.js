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
var path = __importStar(require("path"));
var models_1 = require("./models");
var Template = require('./dialogGeneratorConfig');
Promise.resolve().then(function () { return __importStar(require('./dialogGeneratorConfig')); });
exports.getFile = function (filePath) {
    return fs.readFileSync(filePath).toString();
};
var CommonField = 'name="{{DATABASE}}" fieldLabel="{{TITLE}}" {{REQUIRED}} {{DESC}} {{DISABLED}}';
// here we may get costum template path or we use the defuelt template
exports.template = {
    commonField: CommonField,
    dialog: exports.getFile(Template.dialogTemplate || path.resolve(__dirname, models_1.FilePath.Dialog)),
    tab: exports.getFile(Template.tabTemplate || path.resolve(__dirname, models_1.FilePath.Tab)),
    textfield: exports.getFile(Template.textfieldTemplate || path.resolve(__dirname, models_1.FilePath.Text)),
    richtext: exports.getFile(Template.richtextTemplate || path.resolve(__dirname, models_1.FilePath.RichText)),
    numberfield: exports.getFile(Template.numberfieldTemplate || path.resolve(__dirname, models_1.FilePath.Number)),
    pathfield: exports.getFile(Template.pathfieldTemplate || path.resolve(__dirname, models_1.FilePath.Path)),
    select: exports.getFile(Template.checkboxTemplate || path.resolve(__dirname, models_1.FilePath.Checkbox)),
    dropdown: exports.getFile(Template.dropdownTemplate || path.resolve(__dirname, models_1.FilePath.Dropwdown)),
    multiField: exports.getFile(Template.multifieldTemplate || path.resolve(__dirname, models_1.FilePath.Multifield)),
    multiFieldNested: exports.getFile(Template.multifieldNestedTemplate ||
        path.resolve(__dirname, models_1.FilePath.MultifieldNested)),
    tracking: exports.getFile(Template.trackingTemplate || path.resolve(__dirname, models_1.FilePath.Tracking)),
    component: exports.getFile(Template.componentTemplate || path.resolve(__dirname, models_1.FilePath.Component)),
    cqEditConfig: exports.getFile(Template.cqEditConfigTemplate ||
        path.resolve(__dirname, models_1.FilePath.CqEditConfig)),
    htmlTag: exports.getFile(Template.htmlTagTemplate || path.resolve(__dirname, models_1.FilePath.HtmlTag)),
    tag: exports.getFile(Template.tagTemplate || path.resolve(__dirname, models_1.FilePath.Tag)),
    button: exports.getFile(Template.buttonTemplate || path.resolve(__dirname, models_1.FilePath.Button)),
    imagefield: exports.getFile(Template.imagefieldTemplate || path.resolve(__dirname, models_1.FilePath.Imagefield)),
    cqDesignDialog: exports.getFile(Template.cqDesignDialogTemplate ||
        path.resolve(__dirname, models_1.FilePath.CqDesignDialog))
};
//# sourceMappingURL=xmlTouchUITemplate.js.map