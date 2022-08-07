import {Node, Visitor} from "@babel/traverse";
import {IExportedInfo} from "../types";

/**
 * export const a = 1;
 */
export function getExportNamedVisitor(result: IExportedInfo[]): Visitor<Node> {
  return {
    ExportNamedDeclaration(nodePath) {
      if (nodePath.node.declaration) {
        const {declaration} = nodePath.node;
        /**
         * export const a = '';
         */
        if (declaration.type === "VariableDeclaration") {
          const {declarations} = declaration;
          declarations.forEach((declarator) => {
            if (declarator.id.type === "Identifier") {
              if (declarator)
                result.push({
                  identifier: declarator.id.name,
                  type: "named",
                });
            }
          });
        }

        /**
         * export function f1 () {}
         */
        if (declaration.type === "FunctionDeclaration") {
          if (declaration.id?.type === "Identifier") {
            result.push({
              identifier: declaration.id.name,
              type: "named",
            });
          }
        }
      }

      /**
       * export {
       *  c [as d]
       * }
       */
      nodePath.node.specifiers.forEach((specifier) => {
        specifier.exported.type === "Identifier" &&
          result.push({
            identifier: specifier.exported.name,
            type: "named",
          });
      });
    },
  };
}
