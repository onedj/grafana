#!/usr/bin/env node
const fs = require('fs');
const Handlebars = require("handlebars");

const args = process.argv.slice(2);  // cut-off node path and program args

const ORG_NAME = args[0];     // ie. ce
const PRODUCT_NAME = args[1]; // ie. ratings
const ENV_NAME = args[2];     // ie. live resp. work

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
Handlebars.registerHelper("helper_join", join);

masquerade = function (key, val) {
  if (['password', 'key', 'token', 'tlsapikey'].includes(key.toLowerCase())) {  // FIXME: extend to cover more key names

    const maskChar = '*';
    const unmaskedLength = 5;
    const maskFromStart = true;
    const maxCharsFromEnd = 12;

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
    return h.substr(-maxCharsFromEnd, maxCharsFromEnd);
  } else {
    return val;
  }
};
Handlebars.registerHelper("helper_mask", masquerade);

now = function () {
  let [date, time] = new Date().toISOString().split('T');
  return `${date} ${time}`
};
Handlebars.registerHelper("helper_now", now);


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
