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
    api.add(words)
  });

program
  .command('clear')
  .description('clear a task')
  .action((...args) => {
    console.log('this is a clear')
  });

program.parse(process.argv);
