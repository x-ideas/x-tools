import { ITokenExportedInfo } from '../../exported/types';
import { ITokenImportedInfo } from '../../imported/types';

/**
 * A导入的信息中，是否含有B的exported Info
 * @export
 * @param {ITokenImportedInfo} importInfo
 * @param {ITokenExportedInfo} exportedInfo
 * @returns {boolean}
 */
export function isImportTokenContainExportToken(
  aImportInfo: ITokenImportedInfo,
  bExportedInfo: ITokenExportedInfo
): boolean {
  // 先检查路径是否一致
  if (aImportInfo.sourcePath !== bExportedInfo.filePath) {
    return false;
  }

  if (aImportInfo.type === 'Default') {
    if (bExportedInfo.exported === 'default') {
      return true;
    }
  } else if (aImportInfo.type === 'Named') {
    if (aImportInfo.imported === bExportedInfo.exported) {
      return true;
    }
  } else if (aImportInfo.type === 'Namespaces') {
    // import * as React from 'react';
    if (bExportedInfo.exported !== 'default') {
      return true;
    }
  }

  return false;
}

/**
 * 导入的importedInfo是否再次导出
 * @export
 * @param {ITokenExportedInfo} exportedInfo
 * @param {ITokenImportedInfo} importedInfo
 * @returns {boolean}
 */
export function isImportTokenExportAgain(
  exportedInfo: ITokenExportedInfo,
  importedInfo: ITokenImportedInfo
): boolean {
  return true;
}
