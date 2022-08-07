import {IImportedInfo} from "./../types";

import {getImportVisitor} from "./import-declaration";
import {Node, Visitor} from "@babel/traverse";

export function getImportedVisitors(result: IImportedInfo[]): Visitor<Node> {
  return {
    ...getImportVisitor(result),
  };
}
