import { Command } from 'commander';

const program = new Command();

program
  .command('clean')
  .description('Clean all dist files')
  .action(async () => {
    const { clean } = await import('./commands/clean.js');
    return clean();
  });

program
  .command('build')
  .description('Compile components in production mode')
  .action(async () => {
    const { build } = await import('./commands/build.js');
    return build();
  });

program.parse();
