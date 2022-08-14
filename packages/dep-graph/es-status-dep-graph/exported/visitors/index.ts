import { Node, Visitor } from '@babel/traverse';
import { ITokenExportedInfo, IExportedVisitorOpt } from '../types';
import { getExportAllVisitor } from './export-all-declaration';
import { getExportDefaultVisitor } from './export-default-declaration';
import { getExportNamedVisitor } from './export-named-declaration';

export function getExportedVisitors(
  result: ITokenExportedInfo[],
  opt: IExportedVisitorOpt
): Visitor<Node> {
  return {
    ...getExportAllVisitor(result, opt),
    ...getExportDefaultVisitor(result, opt),
    ...getExportNamedVisitor(result, opt),
  };
}
