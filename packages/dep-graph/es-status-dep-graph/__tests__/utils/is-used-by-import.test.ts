import { ITokenExportedInfo } from '../../exported/types';
import { ITokenImportedInfo } from '../../imported/types';
import { isTokenUsedByImport } from '../../utils';

describe('isTokenUsedByImport', () => {
  describe('import i1 from "i"(default)--文件路径对的上', () => {
    const aImportInfo: ITokenImportedInfo = {
      type: 'Default',
      local: 'i1',
      imported: 'default',
      filePath: '',
      sourcePath: '',
      express: 'import i1 from "i"',
      importKind: 'value',
    };

    it('export const e1', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e1',
        local: 'e1',
        filePath: '',
        sourcePath: '',
        express: 'export const e1',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export let e2', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e2',
        local: 'e2',
        filePath: '',
        sourcePath: '',
        express: 'export let e2',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export { a as e3 }', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e3',
        local: 'a',
        filePath: '',
        sourcePath: '',
        express: 'export { a as e3 }',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export {e4}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e4',
        local: 'e4',
        filePath: '',
        sourcePath: '',
        express: 'export {e4}',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export default e5', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'default',
        exported: 'default',
        local: 'e5',
        filePath: '',
        sourcePath: '',
        express: 'export default e5',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(true);
    });

    it('export {e6 as e6_1}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e6_1',
        local: 'e6',
        filePath: '',
        sourcePath: '',
        express: 'export {e6 as e6_1}',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export {a as default}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'default',
        local: 'a',
        filePath: '',
        sourcePath: '',
        express: 'export {a as default}',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(true);
    });

    it('export * from "a"', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'all',
        exported: undefined,
        local: undefined,
        filePath: '',
        sourcePath: '',
        express: 'export * from "a"',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export * as e7 from "a"', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'all',
        exported: 'e7',
        local: undefined,
        filePath: '',
        sourcePath: '',
        express: 'export * as e7 from "a"',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export interface E1 {}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'E1',
        local: 'E1',
        filePath: '',
        sourcePath: '',
        express: 'export interface E1 {}',
        exportKind: 'type',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export type E2 = ""', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'E2',
        local: 'E2',
        filePath: '',
        sourcePath: '',
        express: 'export type E2 = ""',
        exportKind: 'type',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export enum E3 {}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'E3',
        local: 'E3',
        filePath: '',
        sourcePath: '',
        express: 'export enum E3 {}',
        exportKind: 'type',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });
  });

  describe('import i1 from "i"(default)--文件路径对不上', () => {
    const aImportInfo: ITokenImportedInfo = {
      type: 'Default',
      local: 'i1',
      imported: 'default',
      filePath: '',
      //  NOTE: 故意写成其他的路径
      sourcePath: './another-file.ts',
      express: 'import i1 from "i"',
      importKind: 'value',
    };

    it('export const e1', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e1',
        local: 'e1',
        filePath: '',
        sourcePath: '',
        express: 'export const e1',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export let e2', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e2',
        local: 'e2',
        filePath: '',
        sourcePath: '',
        express: 'export let e2',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export { a as e3 }', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e3',
        local: 'a',
        filePath: '',
        sourcePath: '',
        express: 'export { a as e3 }',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export {e4}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e4',
        local: 'e4',
        filePath: '',
        sourcePath: '',
        express: 'export {e4}',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export default e5', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'default',
        exported: 'default',
        local: 'e5',
        filePath: '',
        sourcePath: '',
        express: 'export default e5',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export {e6 as e6_1}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e6_1',
        local: 'e6',
        filePath: '',
        sourcePath: '',
        express: 'export {e6 as e6_1}',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export {a as default}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'default',
        local: 'a',
        filePath: '',
        sourcePath: '',
        express: 'export {a as default}',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export * from "a"', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'all',
        exported: undefined,
        local: undefined,
        filePath: '',
        sourcePath: '',
        express: 'export * from "a"',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export * as e7 from "a"', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'all',
        exported: 'e7',
        local: undefined,
        filePath: '',
        sourcePath: '',
        express: 'export * as e7 from "a"',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export interface E1 {}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'E1',
        local: 'E1',
        filePath: '',
        sourcePath: '',
        express: 'export interface E1 {}',
        exportKind: 'type',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export type E2 = ""', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'E2',
        local: 'E2',
        filePath: '',
        sourcePath: '',
        express: 'export type E2 = ""',
        exportKind: 'type',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export enum E3 {}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'E3',
        local: 'E3',
        filePath: '',
        sourcePath: '',
        express: 'export enum E3 {}',
        exportKind: 'type',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });
  });

  describe('import * as i2 from "i"', () => {
    const aImportInfo: ITokenImportedInfo = {
      type: 'Namespaces',
      local: 'i2',
      imported: undefined,
      filePath: '',
      sourcePath: '',
      express: 'import * as i2 from "i"',
      importKind: 'value',
    };

    it('export const e1', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e1',
        local: 'e1',
        filePath: '',
        sourcePath: '',
        express: 'export const e1',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(true);
    });

    it('export let e2', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e2',
        local: 'e2',
        filePath: '',
        sourcePath: '',
        express: 'export let e2',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(true);
    });

    it('export { a as e3 }', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e3',
        local: 'a',
        filePath: '',
        sourcePath: '',
        express: 'export { a as e3 }',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(true);
    });

    it('export {e4}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e4',
        local: 'e4',
        filePath: '',
        sourcePath: '',
        express: 'export {e4}',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(true);
    });

    it('export default e5', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'default',
        exported: 'default',
        local: 'e5',
        filePath: '',
        sourcePath: '',
        express: 'export default e5',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export {e6 as e6_1}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e6_1',
        local: 'e6',
        filePath: '',
        sourcePath: '',
        express: 'export {e6 as e6_1}',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(true);
    });

    it('export {a as default}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'default',
        local: 'a',
        filePath: '',
        sourcePath: '',
        express: 'export {a as default}',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export * from "a"', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'all',
        exported: undefined,
        local: undefined,
        filePath: '',
        sourcePath: '',
        express: 'export * from "a"',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(true);
    });

    it('export * as e7 from "a"', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'all',
        exported: 'e7',
        local: undefined,
        filePath: '',
        sourcePath: '',
        express: 'export * as e7 from "a"',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(true);
    });

    it('export interface E1 {}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'E1',
        local: 'E1',
        filePath: '',
        sourcePath: '',
        express: 'export interface E1 {}',
        exportKind: 'type',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(true);
    });

    it('export type E2 = ""', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'E2',
        local: 'E2',
        filePath: '',
        sourcePath: '',
        express: 'export type E2 = ""',
        exportKind: 'type',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(true);
    });

    it('export enum E3 {}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'E3',
        local: 'E3',
        filePath: '',
        sourcePath: '',
        express: 'export enum E3 {}',
        exportKind: 'type',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(true);
    });
  });

  describe('import {i4} from "i"', () => {
    const aImportInfo: ITokenImportedInfo = {
      type: 'Named',
      local: 'i4',
      imported: 'i4',
      filePath: '',
      sourcePath: '',
      express: 'import {i4} from "i"',
      importKind: 'value',
    };

    it('export const e1', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e1',
        local: 'e1',
        filePath: '',
        sourcePath: '',
        express: 'export const e1',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export let e2', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e2',
        local: 'e2',
        filePath: '',
        sourcePath: '',
        express: 'export let e2',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export { a as e3 }', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e3',
        local: 'a',
        filePath: '',
        sourcePath: '',
        express: 'export { a as e3 }',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export {e4}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e4',
        local: 'e4',
        filePath: '',
        sourcePath: '',
        express: 'export {e4}',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export {i4}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'i4',
        local: 'i4',
        filePath: '',
        sourcePath: '',
        express: 'export {i4}',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(true);
    });

    it('export default e5', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'default',
        exported: 'default',
        local: 'e5',
        filePath: '',
        sourcePath: '',
        express: 'export default e5',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export {e6 as e6_1}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'e6_1',
        local: 'e6',
        filePath: '',
        sourcePath: '',
        express: 'export {e6 as e6_1}',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export {a as default}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'default',
        local: 'a',
        filePath: '',
        sourcePath: '',
        express: 'export {a as default}',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export * from "a"', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'all',
        exported: undefined,
        local: undefined,
        filePath: '',
        sourcePath: '',
        express: 'export * from "a"',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export * as e7 from "a"', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'all',
        exported: 'e7',
        local: undefined,
        filePath: '',
        sourcePath: '',
        express: 'export * as e7 from "a"',
        exportKind: 'value',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export interface E1 {}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'E1',
        local: 'E1',
        filePath: '',
        sourcePath: '',
        express: 'export interface E1 {}',
        exportKind: 'type',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export type E2 = ""', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'E2',
        local: 'E2',
        filePath: '',
        sourcePath: '',
        express: 'export type E2 = ""',
        exportKind: 'type',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });

    it('export enum E3 {}', () => {
      const exportInfo: ITokenExportedInfo = {
        type: 'named',
        exported: 'E3',
        local: 'E3',
        filePath: '',
        sourcePath: '',
        express: 'export enum E3 {}',
        exportKind: 'type',
      };

      expect(isTokenUsedByImport(aImportInfo, exportInfo)).toBe(false);
    });
  });
});
