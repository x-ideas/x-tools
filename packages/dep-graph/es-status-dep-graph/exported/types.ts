import xmadge from '@x-tools/file-dep-graph';

/**
 * export的信息
 * @example
 *  export const e1 = '';
    export let e2;

    let e4;
    export {
      a as e3,
      e4
    }
    export default e5;

    export {e5, default} from 'a';
    export {e6 as e6_1} from 'a';
    export * from 'a';
    export * as e7 from 'a'

    export interface E1 {};
    export type E2 = ''
    export enum E3 {}
 */
export interface ITokenExportedInfo {
  /**
   * name为： export const a = ''
   * default为： export default A
   * all为： export * from './foo'
   */
  type: 'named' | 'default' | 'all';
  /**1
   * 本地的名字
   * 如果是export const a = ''，则为a
   * undefined表示*
   */
  local?: string;
  /**
   * 导出的名字
   * 如果是export {a as b}，则为b
   */
  exported: string | 'default';

  /**
   * 处理token时的文件，不一定是token最终的来源文件
   */
  filePath: string;
  /**
   * 如果是从其他文件导出的，则sourceFile为其他文件的路径
   * 如果是从本文件导出的，则sourceFile为filePath
   */
  sourcePath: string;
  /**
   * token所在的语句
   */
  express: string;

  /**
   * 导出的类型
   */
  exportKind?: 'type' | 'value' | null;
}

/**
 * 解析export时的opt
 */
export interface IExportedVisitorOpt extends xmadge.MadgeConfig {
  /**
   * 当前解析的文件路径
   */
  filePath: string;
}
