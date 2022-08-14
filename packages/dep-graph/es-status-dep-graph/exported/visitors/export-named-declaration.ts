import { Node, Visitor } from '@babel/traverse';
import generator from '@babel/generator';
import cabinet from 'filing-cabinet';
import { IExportedInfo, IExportedVisitorOpt } from '../types';

/**
 * export const a = 1;
 */
export function getExportNamedVisitor(
  result: IExportedInfo[],
  opt: IExportedVisitorOpt
): Visitor<Node> {
  return {
    ExportNamedDeclaration(nodePath) {
      if (nodePath.node.declaration) {
        const { declaration } = nodePath.node;
        /**
         * export const a = '';
         * export let a;
         */
        if (declaration.type === 'VariableDeclaration') {
          const { declarations } = declaration;
          declarations.forEach(declarator => {
            if (declarator.id.type === 'Identifier') {
              if (declarator)
                result.push({
                  local: declarator.id.name,
                  type: 'named',
                  exported: declarator.id.name,
                  exportKind: 'value',
                  express: generator(nodePath.node, {
                    comments: false,
                  }).code,
                  filePath: opt.filePath,
                  sourcePath: opt.filePath,
                });
            }
          });
        }

        /**
         * export function f1 () {}
         * export class a {}
         * export interface E1 {};
         * export type E2 = ''
         * export enum E3 {}
         */
        if (
          declaration.type === 'FunctionDeclaration' ||
          declaration.type === 'ClassDeclaration' ||
          declaration.type === 'TSInterfaceDeclaration' ||
          declaration.type === 'TSTypeAliasDeclaration' ||
          declaration.type === 'TSEnumDeclaration'
        ) {
          if (declaration.id?.type === 'Identifier') {
            result.push({
              local: declaration.id.name,
              type: 'named',
              exported: declaration.id.name,
              express: generator(nodePath.node, {
                comments: false,
              }).code,
              filePath: opt.filePath,
              sourcePath: opt.filePath,
              exportKind: nodePath.node.exportKind,
            });
          }
        }
      }

      /**
       * export {
       *  c [as d]
       * }
       * export {e5, default} from 'a';
       * export {e6 as e6_1} from 'a';
       * export * as e7 from 'a'
       */
      nodePath.node.specifiers.forEach(specifier => {
        const absFilePath = nodePath.node.source?.value
          ? cabinet({
              // './a.ts'
              partial: nodePath.node.source.value,
              // 包含import a from './a.ts'的文件
              filename: opt.filePath,
              // 对于ts没有用
              directory: '',
              tsConfig: opt.tsConfig,
            })
          : opt.filePath;

        if (specifier.type === 'ExportSpecifier') {
          result.push({
            local: specifier.local?.name,
            type: 'named',
            exported:
              specifier.exported.type === 'StringLiteral'
                ? specifier.exported.value
                : specifier.exported.name,
            express: generator(nodePath.node, {
              comments: false,
            }).code,
            filePath: opt.filePath,
            exportKind: nodePath.node.exportKind,
            sourcePath: absFilePath,
          });
        }

        /** 还没有找到对应的例子 */
        if (specifier.type === 'ExportDefaultSpecifier') {
          // TODO: 待验证
          result.push({
            local: undefined,
            type: 'named',
            exported: specifier.exported.name,
            express: generator(nodePath.node, {
              comments: false,
            }).code,
            filePath: opt.filePath,
            exportKind: nodePath.node.exportKind,
            sourcePath: absFilePath,
          });
        }

        /** export * as e7 from 'a' */
        if (specifier.type === 'ExportNamespaceSpecifier') {
          result.push({
            local: undefined,
            type: 'named',
            exported: specifier.exported.name,
            express: generator(nodePath.node, {
              comments: false,
            }).code,
            filePath: opt.filePath,
            exportKind: nodePath.node.exportKind,
            sourcePath: absFilePath,
          });
        }
      });
    },
  };
}
