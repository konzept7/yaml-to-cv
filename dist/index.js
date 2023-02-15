"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yaml_1 = require("yaml");
const fs_1 = require("fs");
const handlebars_1 = __importDefault(require("handlebars"));
// read handlebars template
const templateFile = (0, fs_1.readFileSync)('./src/template.hbs', 'utf8');
const template = handlebars_1.default.compile(templateFile);
// read all files in data directory
const files = (0, fs_1.readdirSync)('./data');
// loop through each file
files.forEach(file => {
    // copy jpg file to output directory
    if (file.endsWith('.jpg')) {
        (0, fs_1.copyFileSync)(`./data/${file}`, `./output/${file}`);
        return;
    }
    const fileContents = (0, fs_1.readFileSync)(`./data/${file}`, 'utf8');
    const yaml = (0, yaml_1.parse)(fileContents);
    const html = template(Object.assign(Object.assign({}, yaml), { file: file.replace('.yaml', '.jpg') }));
    (0, fs_1.writeFileSync)(`./output/${file.replace('.yaml', '.html')}`, html);
});
//# sourceMappingURL=index.js.map