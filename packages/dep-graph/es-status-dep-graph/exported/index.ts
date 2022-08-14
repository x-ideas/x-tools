import { parse, ParseResult } from '@babel/parser';
import traverse from '@babel/traverse';

import fs from 'fs';
import xmadge from '@x-tools/file-dep-graph';

import { ITokenExportedInfo } from './types';
import { getExportedVisitors } from './visitors';

/**
 * 找到文件的export的信息
 * @export
 * @param {string} filePath
 * @returns {ITokenExportedInfo[]}
 * 
 * 处理的export调用为
 * @example
 *  export const e1 = '';
    export let e2;

    let e4;
    export {
      a as e3,
      e4
    }
    export default e5;

    export {e5, default} from 'a';
    export {e6 as e6_1} from 'a';
    export * from 'a';
    export * as e7 from 'a'

    export interface E1 {};
    export type E2 = ''
    export enum E3 {}
 */
export function findExportedInfoByFile(
  filePath: string,
  config: xmadge.MadgeConfig
): ITokenExportedInfo[] {
  const content = fs.readFileSync(filePath, {
    encoding: 'utf8',
  });
  const ast = parse(content, {
    sourceType: 'module',
    plugins: ['typescript'],
  });

  const result: ITokenExportedInfo[] = [];
  traverse(ast, {
    ...getExportedVisitors(result, {
      filePath: filePath,
      ...config,
    }),
  });

  return result;
}
