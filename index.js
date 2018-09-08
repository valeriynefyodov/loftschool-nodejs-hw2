const args = require('yargs')
  .usage('$0 [args]')
  .option('i', {
    alias: 'interval',
    default: 500,
    describe: 'Server date console log interval',
    type: 'string'
  })
  .option('t', {
    alias: 'timeout',
    default: 3000,
    describe: 'response timeout',
    type: 'string'
  })
  .help()
  .argv;

const simpleServer = require('./simple-server');
const {interval, timeout} = args;

simpleServer.start(interval, timeout)