import xmadge from '@x-tools/file-dep-graph';

export type ITokenImportedInfo = {
  /**
   * 导入的类型
   */
  type: 'Named' | 'Default' | 'Namespaces';
  /**
   * 引入后使用的名字
   */
  local: string;
  /**
   * 原始文件导入的名字
   * @example
   * 如果是import * as A from './a'，则imported为undefined
   */
  imported?: string;

  /**
   * 来源的文件，可以是相对路径，也可以是绝对路径，或者是package name，也可以是别名
   */
  // from: string;

  /**
   * 当前处理的文件路径
   */
  filePath: string;

  /**
   * 导入的文件的路径
   */
  sourcePath: string;
  /**
   * token的原始语句
   */
  express: string;

  /**
   * 导入的类型
   */
  importKind?: 'value' | 'type' | 'typeof';
};

/**
 * 解析export时的opt
 */
export interface IImportedVisitorOpt extends xmadge.MadgeConfig {
  /**
   * 当前解析的文件路径
   */
  filePath: string;
}
