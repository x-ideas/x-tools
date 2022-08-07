import {ParseResult} from "@babel/parser";
import traverse from "@babel/traverse";
import {getImportedVisitors} from "./visitors";
import {IImportedInfo} from "./types";

/**
 * 获得所有import的信息
 * @export
 * @param {ParseResult<babel.types.File>} ast
 * @returns {IImportedInfo[]}
 */
export function findImportedInfos(
  ast: ParseResult<babel.types.File>
): IImportedInfo[] {
  const result: IImportedInfo[] = [];

  traverse(ast, {
    ...getImportedVisitors(result),
  });

  return result;
}
