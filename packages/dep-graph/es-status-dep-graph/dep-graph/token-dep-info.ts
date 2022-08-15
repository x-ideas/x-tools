import xmadge from '@x-tools/file-dep-graph';
import { findExportedInfoByFile } from '../exported';
import { findImportedInfoByFile } from '../imported';
import { IFileTokenDepInfo } from './types';

/**
 * 收集token的依赖信息
 * @export
 * @param {xmadge.MadgeInstance} madgeInst
 * @returns {IFileTokenDepInfo}
 */
export function collectTokenDepInfos(
  madgeInst: xmadge.MadgeInstance
): IFileTokenDepInfo {
  const depGraph: xmadge.MadgeModuleDependencyGraph = madgeInst.obj();

  const result: IFileTokenDepInfo = {};

  Object.keys(depGraph).forEach(path => {
    const importedTokens = findImportedInfoByFile(
      path,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      madgeInst.config
    );

    const exportedTokens = findExportedInfoByFile(
      path,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      madgeInst.config
    );

    result[path] = [...importedTokens, ...exportedTokens];
  });

  return result;
}
