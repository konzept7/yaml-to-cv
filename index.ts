import { parse } from "yaml";
import {
  readFileSync,
  readdirSync,
  writeFileSync,
  copyFileSync,
  existsSync,
} from "fs";
import Handlebars from "handlebars";
import marked from "marked";

// read handlebars template
const templateFile = readFileSync("./src/template.hbs", "utf8");
const englishTemplateFile = readFileSync("./src/template.en.hbs", "utf8");
const template = Handlebars.compile(templateFile);
const englishTemplate = Handlebars.compile(englishTemplateFile);
// read all files in data directory
const files = readdirSync("./data");
// loop through each file
files.forEach((file) => {
  // copy jpg file to output directory
  if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    copyFileSync(`./data/${file}`, `./output/${file}`);
    return;
  }

  // make sure we only process yaml files
  if (!file.endsWith(".yaml")) {
    return;
  }
  const isEnglish = file.endsWith(".en.yaml");

  const fileContents = readFileSync(`./data/${file}`, "utf8");
  const yaml = parse(fileContents, {});

  Handlebars.registerHelper("repeat", function (times: number, options) {
    // handlebars safe string to prevent html escaping
    return new Handlebars.SafeString(options.fn(this).repeat(times));
  });
  Handlebars.registerHelper("markdown", function (text: string) {
    return new Handlebars.SafeString(marked.parse(text));
  });
  Handlebars.registerHelper("add", function (a: number, b: number) {
    return a + b;
  });
  Handlebars.registerHelper("subtract", function (a: number, b: number) {
    return a - b;
  });
  Handlebars.registerHelper(
    "toLocaleDate",
    function (locale: Intl.LocalesArgument, text: string) {
      const date = new Date(text);
      return date.toLocaleDateString(locale, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    }
  );
  const photoLocation = file
    .replace(".en.yaml", ".jpg")
    .replace(".yaml", ".jpg");
  const hasPhoto = existsSync(`./data/${photoLocation}`);
  const html = isEnglish
    ? englishTemplate({
        ...yaml,
        file: hasPhoto ? photoLocation : null,
      })
    : template({
        ...yaml,
        file: hasPhoto ? photoLocation : null,
      });

  writeFileSync(`./output/${file.replace(".yaml", ".html")}`, html);
});
