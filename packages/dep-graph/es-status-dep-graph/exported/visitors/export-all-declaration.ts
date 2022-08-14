import { Node, Visitor } from '@babel/traverse';
import generator from '@babel/generator';
import cabinet from 'filing-cabinet';
import { IExportedInfo, IExportedVisitorOpt } from '../types';

/**
 * export * from 'a';
 */
export function getExportAllVisitor(
  result: IExportedInfo[],
  opt: IExportedVisitorOpt
): Visitor<Node> {
  return {
    ExportAllDeclaration(nodePath) {
      const absFilePath = cabinet({
        // './a.ts'
        partial: nodePath.node.source.value,
        // 包含import a from './a.ts'的文件
        filename: opt.filePath,
        // 对于ts没有用
        directory: '',
        tsConfig: opt.tsConfig,
      });

      result.push({
        type: 'all',
        exportKind: nodePath.node.exportKind,
        local: '',
        exported: '',
        filePath: opt.filePath,

        sourcePath: absFilePath,
        express: generator(nodePath.node, {
          comments: false,
        }).code,
      });
    },
  };
}
