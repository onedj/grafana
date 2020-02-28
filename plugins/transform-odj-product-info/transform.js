#!/usr/bin/env node
const fs = require('fs');
const Handlebars = require("handlebars");


const ORG_NAME = 'ce';
const PRODUCT_NAME = 'ratings';
const BASE_DIR = `./data/snapshot/products/${ORG_NAME}/${PRODUCT_NAME}`;


function isString(val) {
  return typeof val === 'string' && val !== '';
}

join = function (array, separator) {
  if (typeof array === 'string') return array;
  if (!Array.isArray(array)) return '';
  separator = isString(separator) ? separator : ', ';
  return array.join(separator);
};

Handlebars.registerHelper("join", join);


function render(filename, data) {
  let source = fs.readFileSync(filename, 'utf8').toString();
  let template = Handlebars.compile(source);
  return template(data);
}

function getFilenames(basedir) {
  return fs.readdirSync(basedir)
    .filter(filename => filename.endsWith('.json'))
    .map(filename => {
      return filename.split('.')[0]
    });
}


const product = require(`${BASE_DIR}/${PRODUCT_NAME}.json`);

// Loop over infras
const infraNames = getFilenames(`${BASE_DIR}/infras`);
const infras = infraNames.map(name => require(`${BASE_DIR}/infras/${name}.json`));

// Loop over stages
const stageNames = getFilenames(`${BASE_DIR}/stages`);
const stages = stageNames.map(name => require(`${BASE_DIR}/stages/${name}.json`));

//var data = JSON.parse(fs.readFileSync("./data/strings.json", 'utf8'));

let result = render('./templates/product.html.hbs',
  {organization: ORG_NAME, product: product, infras: infras, stages: stages});

console.log(result);
