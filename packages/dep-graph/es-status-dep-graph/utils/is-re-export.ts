import { ITokenExportedInfo } from '../exported/types';
// import { ITokenImportedInfo } from '../imported/types';

/**
 * 文件A中的token是否将b中的exportedInfo再次导出
 * 其中A依赖B
 * @export
 * @param {ITokenExportedInfo} bExportedInfo b文件中导出的信息
 * @param {ITokenExportedInfo} aFileExportedInfo a文件中导出的信息
 */
export function isTokenReExport(
  bExportedInfo: ITokenExportedInfo,
  aFileExportedInfo: ITokenExportedInfo
): boolean {
  // 先判断路径
  if (aFileExportedInfo.sourcePath !== bExportedInfo.filePath) {
    return false;
  }

  if (
    aFileExportedInfo.type === 'all' ||
    (aFileExportedInfo.type === 'named' && !aFileExportedInfo.local)
  ) {
    // export * from 'b'
    // export * as React from 'react';
    if (bExportedInfo.exported !== 'default') {
      return true;
    }
  }

  if (aFileExportedInfo.local === bExportedInfo.exported) {
    return true;
  }

  return false;
}
