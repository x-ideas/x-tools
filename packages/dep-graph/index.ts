import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

function run() {
  const file = path.resolve(__dirname, './demo.ts');
  const content = fs.readFileSync(file, {
    encoding: 'utf8',
  });

  // process.stdout.write(contenxt);
  const result = parse(content, {
    sourceType: 'module',
  });
  traverse(result, {
    enter(node) {
      process.stdout.write(node.node.type);
      process.stdout.write('\n');
    },
  });
}

run();
