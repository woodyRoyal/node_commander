#!/usr/bin/env node
const program = require('commander');
const api = require('./index');

program
  .option('-x, --xxx', 'output extra debugging')
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    // console.log(args[args.length - 1])
    let words = ''
    if (args[args.length - 1].length) {
      words = args[args.length - 1].join(' ')
    }
    api.add(words).then(() => { console.log('成功') }, () => { console.log('失败') })
  });

program
  .command('clear')
  .description('clear a task')
  .action(() => {
    api.clear().then(() => { console.log('清除成功') }, () => { console.log('清除失败') })
  });

program.parse(process.argv);
console.log(process.argv)

if (process.argv.length === 2) {
  api.showAll()
}