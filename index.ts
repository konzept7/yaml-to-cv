import { parse } from 'yaml'
import { readFileSync, readdirSync, writeFileSync, copyFileSync } from 'fs'
import Handlebars from 'handlebars';
import marked from 'marked';


// read handlebars template
const templateFile = readFileSync('./src/template.hbs', 'utf8')
const template = Handlebars.compile(templateFile)

// read all files in data directory
const files = readdirSync('./data');
// loop through each file
files.forEach(file => {

  // copy jpg file to output directory
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    copyFileSync(`./data/${file}`, `./output/${file}`)
    return
  }

  const fileContents = readFileSync(`./data/${file}`, 'utf8')
  const yaml = parse(fileContents, {})

  Handlebars.registerHelper('repeat', function (times: number, options) {
    return new Handlebars.SafeString(options.fn(this).repeat(times))
  })
  Handlebars.registerHelper('add', function (a: number, b: number) {
    return a + b
  })
  Handlebars.registerHelper('subtract', function (a: number, b: number) {
    return a - b
  })

  Handlebars.registerHelper('markdown', function (text: string) {
    return new Handlebars.SafeString(marked.parse(text))
  })
  const html = template({ ...yaml, file: file.replace('.yaml', '.jpg') })

  writeFileSync(`./output/${file.replace('.yaml', '.html')}`, html)
})