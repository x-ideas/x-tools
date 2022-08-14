import path from 'path';
import { findExportedInfoByFile } from '../../exported';
import { ITokenExportedInfo } from '../../exported/types';

describe('test getExportedInfos', () => {
  it('normal ', async () => {
    const filePath = path.resolve(__dirname, '../__testfixtures__/normal.ts');

    // 寻找
    const result: ITokenExportedInfo[] = findExportedInfoByFile(filePath, {
      tsConfig: path.resolve(__dirname, '../__testfixtures__/tsconfig.json'),
    });

    const lodashPath = require.resolve('lodash');

    expect(result.length).toBe(13);
    expect(result).toEqual<ITokenExportedInfo[]>([
      {
        exported: 'a',
        exportKind: 'value',
        express: "export const a = '2';",
        filePath: filePath,
        local: 'a',
        sourcePath: filePath,
        type: 'named',
      },

      {
        exported: 'e1',
        exportKind: 'value',
        express: 'export let e1;',
        filePath: filePath,
        local: 'e1',
        sourcePath: filePath,
        type: 'named',
      },

      {
        exported: 'f1',
        exportKind: 'value',
        express: 'export function f1() {}',
        filePath: filePath,
        local: 'f1',
        sourcePath: filePath,
        type: 'named',
      },
      {
        exported: 'ec',
        exportKind: 'value',
        express: 'export class ec {}',
        filePath: filePath,
        local: 'ec',
        sourcePath: filePath,
        type: 'named',
      },

      {
        exported: 'default',
        exportKind: 'value',
        express: 'export default f2;',
        filePath: filePath,
        local: 'f2',
        sourcePath: filePath,
        type: 'default',
      },
      {
        exported: 'd',
        exportKind: 'value',
        express: 'export { c as d, b };',
        filePath: filePath,
        local: 'c',
        sourcePath: filePath,
        type: 'named',
      },
      {
        exported: 'b',
        exportKind: 'value',
        express: 'export { c as d, b };',
        filePath: filePath,
        local: 'b',
        sourcePath: filePath,
        type: 'named',
      },
      {
        exported: undefined,
        exportKind: 'value',
        express: "export * from './resource';",
        filePath: filePath,
        local: undefined,
        // 相对路径
        sourcePath: path.resolve(path.dirname(filePath), 'resource.ts'),
        type: 'all',
      },

      {
        exported: 'e7',
        exportKind: 'value',
        express: "export * as e7 from 'alias-resource';",
        filePath: filePath,
        local: undefined,
        // 别名
        sourcePath: path.resolve(path.dirname(filePath), 'resource.ts'),
        type: 'named',
      },

      {
        exported: 'omit',
        exportKind: 'value',
        express: "export { omit } from 'lodash';",
        filePath: filePath,
        local: 'omit',
        // package
        sourcePath: lodashPath,
        type: 'named',
      },
      {
        exported: 'E1',
        exportKind: 'type',
        express: 'export interface E1 {}',
        filePath: filePath,
        local: 'E1',
        sourcePath: filePath,
        type: 'named',
      },

      {
        exported: 'E2',
        exportKind: 'type',
        express: "export type E2 = '';",
        filePath: filePath,
        local: 'E2',
        sourcePath: filePath,
        type: 'named',
      },

      {
        exported: 'E3',
        exportKind: 'value',
        express: 'export enum E3 {}',
        filePath: filePath,
        local: 'E3',
        sourcePath: filePath,
        type: 'named',
      },
    ]);
  });
});
