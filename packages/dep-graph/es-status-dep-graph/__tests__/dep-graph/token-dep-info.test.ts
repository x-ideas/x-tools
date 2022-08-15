import xmadge from '@x-tools/file-dep-graph';
import path from 'path';
import { collectTokenDepInfos } from '../../dep-graph';

describe('token-dep-info', () => {
  it('circular dep', async () => {
    const entryPath = path.resolve(
      __dirname,
      '../__testfixtures__/demo-proj/index.ts'
    );
    const inst = await xmadge(entryPath, {
      tsConfig: path.resolve(__dirname, '../__testfixtures__/tsconfig.json'),
      fileExtensions: ['js', 'ts', 'jsx', 'tsx', 'mjs'],
      // NOTE: 保证返回的是相对当前的路径
      baseDir: './',
    });

    const tokenDepInfos = collectTokenDepInfos(inst);

    expect(tokenDepInfos).toMatchSnapshot();
  });
});
