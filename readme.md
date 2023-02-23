# YAML-TO-CV

Quick hack to convert cv data stored in yaml files to printable html files.

## Setup

```shell
npm i -g typescript
npm i -g nodemon
npm i -g http-server
npm i
```

## Convert yaml to CV

Store two files in ./data folder:
  - <name>.yaml -> YAML file containing all data
  - <name>.jpg -> profile picture

Both files should have the same prefix!

## Start developing

Execute these commands in separate terminals from workspace root:
- `npx tailwindcss -i ./src/template.css -o ./output/style.css --watch` (Tailwind CSS directives)
- `nodemon dist/index.js` (monitor changes in template files and execute recompilation of template file)

Then, open the .html in in the output directory and start a live server with this extension: ritwickdey.LiveServer (added to workspace recommendations).