import {Node, Visitor} from "@babel/traverse";
import {IExportedInfo} from "../types";

/**
 * 处理 export * from './foo' 的情况
 */
export function getExportAllVisitor(result: IExportedInfo[]): Visitor<Node> {
  return {
    ExportAllDeclaration(nodePath) {
      result.push({
        type: "all",
        path: nodePath.node.source.value,
      });
    },
  };
}
