"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yaml_1 = require("yaml");
const fs_1 = require("fs");
const handlebars_1 = __importDefault(require("handlebars"));
const marked_1 = __importDefault(require("marked"));
// read handlebars template
const templateFile = (0, fs_1.readFileSync)("./src/template.hbs", "utf8");
const englishTemplateFile = (0, fs_1.readFileSync)("./src/template.en.hbs", "utf8");
const template = handlebars_1.default.compile(templateFile);
const englishTemplate = handlebars_1.default.compile(englishTemplateFile);
// read all files in data directory
const files = (0, fs_1.readdirSync)("./data");
// loop through each file
files.forEach((file) => {
    // copy jpg file to output directory
    if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
        (0, fs_1.copyFileSync)(`./data/${file}`, `./output/${file}`);
        return;
    }
    // make sure we only process yaml files
    if (!file.endsWith(".yaml")) {
        return;
    }
    const isEnglish = file.endsWith("en.yaml");
    const fileContents = (0, fs_1.readFileSync)(`./data/${file}`, "utf8");
    const yaml = (0, yaml_1.parse)(fileContents, {});
    handlebars_1.default.registerHelper("repeat", function (times, options) {
        // handlebars safe string to prevent html escaping
        return new handlebars_1.default.SafeString(options.fn(this).repeat(times));
    });
    handlebars_1.default.registerHelper("markdown", function (text) {
        return new handlebars_1.default.SafeString(marked_1.default.parse(text));
    });
    handlebars_1.default.registerHelper("add", function (a, b) {
        return a + b;
    });
    handlebars_1.default.registerHelper("subtract", function (a, b) {
        return a - b;
    });
    handlebars_1.default.registerHelper("toLocaleDate", function (locale, text) {
        const date = new Date(text);
        return date.toLocaleDateString(locale, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
    });
    const photoLocation = file
        .replace(".en.yaml", ".jpg")
        .replace(".yaml", ".jpg");
    const hasPhoto = (0, fs_1.existsSync)(`./data/${photoLocation}`);
    const html = isEnglish
        ? englishTemplate(Object.assign(Object.assign({}, yaml), { file: hasPhoto ? photoLocation : null }))
        : template(Object.assign(Object.assign({}, yaml), { file: hasPhoto ? photoLocation : null }));
    (0, fs_1.writeFileSync)(`./output/${file.replace(".yaml", ".html")}`, html);
});
//# sourceMappingURL=index.js.map