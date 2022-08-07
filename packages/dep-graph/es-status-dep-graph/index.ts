import fs from 'fs';
import path from 'path';
import madge from 'madge';
import { parse, ParseResult } from '@babel/parser';
import traverse from '@babel/traverse';

/**
 * 找到文件的依赖图信息
 * @param {string} entryPath 入口文件路径
 * @throw
 */
async function findFileDependencyGraph(entryPath: string): Promise<madge.MadgeModuleDependencyGraph> {
  return madge(entryPath, {
    fileExtensions: ['js', 'ts', 'tsx', 'jsx'],
    tsConfig: '../../../tsconfig.json',
  }).then(res => res.obj());
}

// function analysisVariableDependencyGraph() {}

interface IExportedTokenInfo {
  /** 变量名字 */
  identifier: string;
  /** 命名/默认导出 */
  type: 'default' | 'named';
}

/**
 * 找到所有导出的接口的
 * 不同于typscript的interface的定义，这里把es语法中export导出的都看成是对外的接口
 * @example
 * ['a', 'o']
 * @export
 * @param {string} filePath
 * @returns
 */
export async function findAllExportedESInterfaces(filePath: string): Promise<IExportedTokenInfo[]> {
  const content = fs.readFileSync(filePath, {
    encoding: 'utf8',
  });
  const ast = parse(content, {
    sourceType: 'module',
  });
  const tokens: IExportedTokenInfo[] = [];
  tokens.push(...findExportNamedESInterfaces(ast));
  tokens.push(...findExportDefaultESInterfaces(ast));

  return tokens;
}

/**
 * 找到命名导出的变量
 * @param ast
 */
function findExportNamedESInterfaces(ast: ParseResult<babel.types.File>): IExportedTokenInfo[] {
  const tokens: IExportedTokenInfo[] = [];

  traverse(ast, {
    ExportNamedDeclaration(nodePath) {
      if (nodePath.node.declaration) {
        const { declaration } = nodePath.node;
        /**
         * export const a = '';
         */
        if (declaration.type === 'VariableDeclaration') {
          const { declarations } = declaration;
          declarations.forEach(declarator => {
            if (declarator.id.type === 'Identifier') {
              if (declarator)
                tokens.push({
                  identifier: declarator.id.name,
                  type: 'named',
                });
            }
          });
        }

        /**
         * export function f1 () {}
         */
        if (declaration.type === 'FunctionDeclaration') {
          if (declaration.id?.type === 'Identifier') {
            tokens.push({
              identifier: declaration.id.name,
              type: 'named',
            });
          }
        }
      }

      /**
       * export {
       *  c [as d]
       * }
       */
      nodePath.node.specifiers.forEach(specifier => {
        specifier.exported.type === 'Identifier' &&
          tokens.push({
            identifier: specifier.exported.name,
            type: 'named',
          });
      });
    },
  });

  return tokens;
}

/**
 * 找到默认导出的变量
 * @param ast
 */
function findExportDefaultESInterfaces(ast: ParseResult<babel.types.File>): IExportedTokenInfo[] {
  const tokens: IExportedTokenInfo[] = [];

  traverse(ast, {
    ExportDefaultDeclaration(nodePath) {
      /**
       * export default a;
       */
      if (nodePath.node.declaration.type === 'Identifier') {
        tokens.push({
          identifier: nodePath.node.declaration.name,
          type: 'default',
        });
      }

      /**
       * export default {
       *  a: '',
       * }
       */
      if (nodePath.node.declaration.type === 'ObjectExpression') {
        tokens.push({
          identifier: 'default',
          type: 'default',
        });
      }

      /**
       * export default c = ''
       */
      if (nodePath.node.declaration.type === 'AssignmentExpression') {
        nodePath.node.declaration.left.type === 'Identifier' &&
          tokens.push({
            identifier: nodePath.node.declaration.left.name,
            type: 'default',
          });
      }
    },
  });

  return tokens;
}

// export async function run(entryPath: string) {
//   const moduleDepGraph = await findFileDependencyGraph(entryPath);

//   Object.entries(moduleDepGraph).forEach(([moduleFile, moduleDepFiles]) => {});
// }
