import traverse from '@babel/traverse';
import { parse } from '@babel/parser';

import fs from 'fs';

import { getImportedVisitors } from './visitors';
import { ITokenImportedInfo } from './types';
import xmadge from '@x-tools/file-dep-graph';

/**
 * 获得文件的import的信息
 * import i1 from 'i';
 * import * as i2 from 'i'
 * import {i3 as i31} from 'i';
 * import {i4} from 'i';
 * import type {i5} from 'i'
 * @export
 * @param {string} filePath
 * @returns {ITokenImportedInfo[]}
 */
export function findImportedInfoByFile(
  filePath: string,
  config: xmadge.MadgeConfig
): ITokenImportedInfo[] {
  const content = fs.readFileSync(filePath, {
    encoding: 'utf8',
  });
  const ast = parse(content, {
    sourceType: 'module',
    plugins: ['typescript'],
  });

  const result: ITokenImportedInfo[] = [];
  traverse(ast, {
    ...getImportedVisitors(result, {
      filePath: filePath,
      ...config,
    }),
  });

  return result;
}
