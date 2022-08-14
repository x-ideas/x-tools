import { Visitor } from '@babel/traverse';
import generator from '@babel/generator';
import cabinet from 'filing-cabinet';
import { ITokenImportedInfo, IImportedVisitorOpt } from '../types';

/**
 * import * as a from './foo';
 * import a from './foo';
 * import {a} from './foo';
 * import {a as b} from './foo';
 */
export function getImportVisitor(
  result: ITokenImportedInfo[],
  opt: IImportedVisitorOpt
): Visitor<babel.types.Node> {
  return {
    ImportDeclaration(nodePath) {
      // source信息
      const absSourcePath = cabinet({
        partial: nodePath.node.source.value,
        // 包含import a from './a.ts'的文件
        filename: opt.filePath,
        // 对于ts没有用
        directory: '',
        tsConfig: opt.tsConfig,
      });
      nodePath.node.source.value;

      nodePath.node.specifiers.forEach(specifier => {
        /**
         * import a from 'a'
         */
        if (specifier.type === 'ImportDefaultSpecifier') {
          result.push({
            local: specifier.local.name,
            // 默认为default
            imported: 'default',
            type: 'Default',
            filePath: opt.filePath,
            sourcePath: absSourcePath,
            express: generator(nodePath.node, {
              comments: false,
            }).code,
            importKind: nodePath.node.importKind,
          });
        }

        /** import * as d from 'a' */
        if (specifier.type === 'ImportNamespaceSpecifier') {
          result.push({
            local: specifier.local.name,
            // 默认为default
            imported: undefined,
            type: 'Namespaces',
            filePath: opt.filePath,
            sourcePath: absSourcePath,
            express: generator(nodePath.node, {
              comments: false,
            }).code,
            importKind: nodePath.node.importKind,
          });
        }
        if (specifier.type === 'ImportSpecifier') {
          /**
           * import {a as a1} from 'a'
           */
          result.push({
            local: specifier.local.name,
            imported:
              specifier.imported.type === 'Identifier'
                ? specifier.imported.name
                : specifier.imported.value,
            type: 'Named',
            filePath: opt.filePath,
            sourcePath: absSourcePath,
            express: generator(nodePath.node, {
              comments: false,
            }).code,
            importKind: nodePath.node.importKind,
          });
        }
      });
    },
  };
}
