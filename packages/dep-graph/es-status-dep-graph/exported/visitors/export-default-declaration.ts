import { Node, Visitor } from '@babel/traverse';
import generator from '@babel/generator';
import { ITokenExportedInfo, IExportedVisitorOpt } from '../types';

/**
 * export default a;
 */
export function getExportDefaultVisitor(
  result: ITokenExportedInfo[],
  opt: IExportedVisitorOpt
): Visitor<Node> {
  return {
    ExportDefaultDeclaration(nodePath) {
      /**
       * export default a;
       */
      if (nodePath.node.declaration.type === 'Identifier') {
        result.push({
          local: nodePath.node.declaration.name,
          filePath: opt.filePath,
          sourcePath: opt.filePath,
          exported: 'default',
          express: generator(nodePath.node, {
            comments: false,
          }).code,
          type: 'default',
          exportKind: nodePath.node.exportKind,
        });
      }

      /**
       * export default {
       *  a: '',
       * }
       */
      if (nodePath.node.declaration.type === 'ObjectExpression') {
        result.push({
          local: 'default',
          type: 'default',
          exported: 'default',
          filePath: opt.filePath,
          sourcePath: opt.filePath,
          express: generator(nodePath.node, {
            comments: false,
          }).code,
        });
      }

      /**
       * export default c = ''
       */
      if (nodePath.node.declaration.type === 'AssignmentExpression') {
        nodePath.node.declaration.left.type === 'Identifier' &&
          result.push({
            local: nodePath.node.declaration.left.name,
            type: 'default',
            exported: 'default',
            filePath: opt.filePath,
            sourcePath: opt.filePath,
            express: generator(nodePath.node, {
              comments: false,
            }).code,
          });
      }
    },
  };
}
