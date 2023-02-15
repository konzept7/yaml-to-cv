import { parse, stringify } from 'yaml'
import { readFileSync, readdirSync, writeFileSync, copyFileSync } from 'fs'
import Handlebars from 'handlebars';


// read handlebars template
const templateFile = readFileSync('./src/template.hbs', 'utf8')
const template = Handlebars.compile(templateFile)

// read all files in data directory
const files = readdirSync('./data');
// loop through each file
files.forEach(file => {

  // copy jpg file to output directory
  if (file.endsWith('.jpg')) {
    copyFileSync(`./data/${file}`, `./output/${file}`)
    return
  }

  const fileContents = readFileSync(`./data/${file}`, 'utf8')
  const yaml = parse(fileContents)

  const html = template({ ...yaml, file: file.replace('.yaml', '.jpg') })

  writeFileSync(`./output/${file.replace('.yaml', '.html')}`, html)
})

