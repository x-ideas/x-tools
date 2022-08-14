import { Node, Visitor } from '@babel/traverse';
import { IExportedInfo, IExportedVisitorOpt } from '../types';
import { getExportAllVisitor } from './export-all-declaration';
import { getExportDefaultVisitor } from './export-default-declaration';
import { getExportNamedVisitor } from './export-named-declaration';

export function getExportedVisitors(
  result: IExportedInfo[],
  opt: IExportedVisitorOpt
): Visitor<Node> {
  return {
    ...getExportAllVisitor(result, opt),
    ...getExportDefaultVisitor(result, opt),
    ...getExportNamedVisitor(result, opt),
  };
}
