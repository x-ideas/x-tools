import { ITokenExportedInfo } from '../exported/types';
import { ITokenImportedInfo } from '../imported/types';

// /**
//  * token的依赖信息
//  */
// export interface ITokenExportedDepInfo {
//   /** 导出的token的信息 */
//   // tokenInfo: ITokenExportedInfo;
//   /**
//    * 依赖这个token的文件路径集合
//    * 只考虑两个文件
//    */
//   // depBy: string[];
// }

/**
 *
 */
export interface IFileTokenDepInfo {
  [filePath: string]: (ITokenExportedInfo | ITokenImportedInfo)[];
}

export class TokenDepInfo {}
