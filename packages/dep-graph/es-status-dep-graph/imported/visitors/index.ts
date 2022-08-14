import { ITokenImportedInfo, IImportedVisitorOpt } from './../types';

import { getImportVisitor } from './import-declaration';
import { Node, Visitor } from '@babel/traverse';

export function getImportedVisitors(
  result: ITokenImportedInfo[],
  opt: IImportedVisitorOpt
): Visitor<Node> {
  return {
    ...getImportVisitor(result, opt),
  };
}
