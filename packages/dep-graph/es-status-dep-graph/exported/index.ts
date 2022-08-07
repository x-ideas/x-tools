import {ParseResult} from "@babel/parser";
import traverse from "@babel/traverse";
import {IExportedInfo} from "./types";
import {getExportedVisitors} from "./visitors";

/**
 * 找到所有导出的信息
 * @export
 * @param {ParseResult<babel.types.File>} ast
 * @returns {IExportedInfo[]}
 */
export function findExportedInfos(
  ast: ParseResult<babel.types.File>
): IExportedInfo[] {
  const result: IExportedInfo[] = [];
  traverse(ast, {
    ...getExportedVisitors(result),
  });

  return result;
}
