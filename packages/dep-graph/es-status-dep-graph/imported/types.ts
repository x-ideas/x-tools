export type IImportedInfo = {
  /**
   * 原始文件导出的名字
   */
  identifier: string;
  /**
   * 来源的文件，可以是相对路径，也可以是绝对路径，或者是package name
   */
  from: string;
  /**
   * 引入后使用的名字
   */
  alias: string;
};
