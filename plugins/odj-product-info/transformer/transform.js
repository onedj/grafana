#!/usr/bin/env node
const fs = require('fs');
const Handlebars = require("handlebars");


const ORG_NAME = 'ce';
const PRODUCT_NAME = 'ratings';
const ENV_NAME = 'live';

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

maskerade = function (key, val) {
  if (['password', 'key', 'tlsapikey'].includes(key)) {

    const maskChar = '*';
    const unmaskedLength = 5;
    const maskFromStart = true;

    const maskStart = maskFromStart ? 0 : Math.max(0, unmaskedLength);
    const maskEnd = maskFromStart ? Math.max(0, val.length - unmaskedLength) : val.length;
    let h = val
      .split("")
      .map((char, index) => {
        if (index >= maskStart && index < maskEnd) {
          return maskChar;
        } else {
          return char;
        }
      })
      .join("");
    return h.substr(-12,12);
  } else {
    return val;
  }
};
Handlebars.registerHelper("maskerade", maskerade);


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

//var data = JSON.parse(fs.readFileSync("./data/product.json", 'utf8'));
const product = require(`${BASE_DIR}/${PRODUCT_NAME}.json`);

// Loop over infras
const infraNames = getFilenames(`${BASE_DIR}/infras`);
const infras = infraNames
  .map(name => require(`${BASE_DIR}/infras/${name}.json`))
  .filter(infra => infra.environment === ENV_NAME);

// Loop over stages
const stageNames = getFilenames(`${BASE_DIR}/stages`);
const stages = stageNames
  .map(name => require(`${BASE_DIR}/stages/${name}.json`))
  .filter(stage => stage.environment === ENV_NAME);


let result = render('./templates/product.html.hbs',
  {organization: ORG_NAME, product: product, infras: infras, stages: stages});

console.log(result);
