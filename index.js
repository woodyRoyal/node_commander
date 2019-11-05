const program = require('commander');

program
  .option('-x, --xxx', 'output extra debugging')
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    // const words = args.slice(0, -1).join(' ')
    const words = args[args.length - 1].join(' ')
    console.log(words)
  });

program
  .command('clear')
  .description('clear a task')
  .action((...args) => {
    console.log('this is a clear')
  });

program.parse(process.argv);
