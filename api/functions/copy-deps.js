/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const copyfiles = require('copyfiles');

copyfiles(
  ['./src/graphql/schema.graphql', './lib/graphql'],
  { flatten: true, up: true },
  () => {
    console.log('copied');
  }
);
