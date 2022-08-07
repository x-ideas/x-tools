import {Node, Visitor} from "@babel/traverse";
import {IExportedInfo} from "../types";
import {getExportAllVisitor} from "./export-all-declaration";
import {getExportDefaultVisitor} from "./export-default-declaration";
import {getExportNamedVisitor} from "./export-named-declaration";

export function getExportedVisitors(result: IExportedInfo[]): Visitor<Node> {
  return {
    ...getExportAllVisitor(result),
    ...getExportDefaultVisitor(result),
    ...getExportNamedVisitor(result),
  };
}
