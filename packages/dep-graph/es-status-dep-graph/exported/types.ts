/**
 * export default a;
 */
export interface IExportedDefaultInfo {
  type: "default";
  identifier: string;
}

/**
 * export const a = ''
 */
export interface IExportedNamedInfo {
  type: "named";
  identifier: string;
}

/**
 * export * from './'
 */
export interface IExportedAllInfo {
  type: "all";
  path: string;
}

export type IExportedInfo =
  | IExportedDefaultInfo
  | IExportedNamedInfo
  | IExportedAllInfo;
