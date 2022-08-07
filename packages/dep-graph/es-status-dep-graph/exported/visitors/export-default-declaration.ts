import {Node, Visitor} from "@babel/traverse";
import {IExportedInfo} from "../types";

/**
 * export default a;
 */
export function getExportDefaultVisitor(
  result: IExportedInfo[]
): Visitor<Node> {
  return {
    ExportDefaultDeclaration(nodePath) {
      /**
       * export default a;
       */
      if (nodePath.node.declaration.type === "Identifier") {
        result.push({
          identifier: nodePath.node.declaration.name,
          type: "default",
        });
      }

      /**
       * export default {
       *  a: '',
       * }
       */
      if (nodePath.node.declaration.type === "ObjectExpression") {
        result.push({
          identifier: "default",
          type: "default",
        });
      }

      /**
       * export default c = ''
       */
      if (nodePath.node.declaration.type === "AssignmentExpression") {
        nodePath.node.declaration.left.type === "Identifier" &&
          result.push({
            identifier: nodePath.node.declaration.left.name,
            type: "default",
          });
      }
    },
  };
}
