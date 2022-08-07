import {Visitor} from "@babel/traverse";
import {IImportedInfo} from "../types";

/**
 * import * as a from './foo';
 * import a from './foo';
 * import {a} from './foo';
 * import {a as b} from './foo';
 */
export function getImportVisitor(
  result: IImportedInfo[]
): Visitor<babel.types.Node> {
  return {
    ImportDeclaration(nodePath) {
      nodePath.node.specifiers.forEach((specifier) => {
        /**
         * import a from 'a'
         */
        if (specifier.type === "ImportDefaultSpecifier") {
          result.push({
            identifier: specifier.local.name,
            from: nodePath.node.source.value,
            alias: specifier.local.name,
          });
        }

        /**
         * import {a as a1} from 'a'
         */
        if (specifier.type === "ImportSpecifier") {
          if (specifier.imported.type === "Identifier") {
            result.push({
              // a
              identifier: specifier.imported.name,
              from: nodePath.node.source.value,
              // a1
              alias: specifier.local.name,
            });
          }
        }

        /**
         * import * as d from 'a'
         */
        if (specifier.type === "ImportNamespaceSpecifier") {
          result.push({
            identifier: specifier.local.name,
            from: nodePath.node.source.value,
            alias: specifier.local.name,
          });
        }
      });
    },
  };
}
