import { ITokenExportedInfo } from '../../exported/types';
import { isTokenReExport } from '../../utils';

describe('is re exported', () => {
  // a依赖b
  describe('export * from "b"', () => {
    // a中导出的信息
    const aExportInfo: ITokenExportedInfo = {
      type: 'all',
      exported: undefined,
      local: undefined,
      express: 'export * from "b"',
      exportKind: 'value',
      filePath: 'a',
      sourcePath: 'b',
    };

    it('export const e1 = ""', () => {
      // b中导出的信息
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'e1',
        exportKind: 'value',
        express: "export const e1 = '';",
        filePath: 'b',
        local: 'e1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export let e1;', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'e1',
        exportKind: 'value',
        express: 'export let e1;',
        filePath: 'b',
        local: 'e1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export function f1() {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'f1',
        exportKind: 'value',
        express: 'export function f1() {}',
        filePath: 'b',
        local: 'f1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export class ec {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'ec',
        exportKind: 'value',
        express: 'export class ec {}',
        filePath: 'b',
        local: 'ec',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export default f2;', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'default',
        exportKind: 'value',
        express: 'export default f2;',
        filePath: 'b',
        local: 'f2',
        sourcePath: 'b',
        type: 'default',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export { c as d };', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'd',
        exportKind: 'value',
        express: 'export { c as d };',
        filePath: 'b',
        local: 'c',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export { c as default };', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'default',
        exportKind: 'value',
        express: 'export { c as default };',
        filePath: 'b',
        local: 'c',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export * from "./resource";', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: undefined,
        exportKind: 'value',
        express: 'export * from "./resource";',
        filePath: 'b',
        local: undefined,
        sourcePath: 'b',
        type: 'all',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it("export * as e7 from 'alias-resource';", () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'e7',
        exportKind: 'value',
        express: "export * as e7 from 'alias-resource';",
        filePath: 'b',
        local: undefined,
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it("export { omit } from 'lodash';", () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'omit',
        exportKind: 'value',
        express: "export { omit } from 'lodash';",
        filePath: 'b',
        local: 'omit',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export interface E1 {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'E1',
        exportKind: 'type',
        express: 'export interface E1 {}',
        filePath: 'b',
        local: 'E1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it("export type E2 = '';", () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'E2',
        exportKind: 'type',
        express: "export type E2 = '';",
        filePath: 'b',
        local: 'E2',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export enum E3 {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'E3',
        exportKind: 'value',
        express: 'export enum E3 {}',
        filePath: 'b',
        local: 'E3',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });
  });
  describe('export * from "b"(路径不匹配)', () => {
    // a中导出的信息
    const aExportInfo: ITokenExportedInfo = {
      type: 'all',
      exported: undefined,
      local: undefined,
      express: 'export * from "b"',
      exportKind: 'value',
      filePath: 'a',
      sourcePath: 'b1',
    };

    it('export const e1 = ""', () => {
      // b中导出的信息
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'e1',
        exportKind: 'value',
        express: "export const e1 = '';",
        filePath: 'b',
        local: 'e1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export let e1;', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'e1',
        exportKind: 'value',
        express: 'export let e1;',
        filePath: 'b',
        local: 'e1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export function f1() {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'f1',
        exportKind: 'value',
        express: 'export function f1() {}',
        filePath: 'b',
        local: 'f1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export class ec {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'ec',
        exportKind: 'value',
        express: 'export class ec {}',
        filePath: 'b',
        local: 'ec',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export default f2;', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'default',
        exportKind: 'value',
        express: 'export default f2;',
        filePath: 'b',
        local: 'f2',
        sourcePath: 'b',
        type: 'default',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export { c as d };', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'd',
        exportKind: 'value',
        express: 'export { c as d };',
        filePath: 'b',
        local: 'c',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export { c as default };', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'default',
        exportKind: 'value',
        express: 'export { c as default };',
        filePath: 'b',
        local: 'c',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export * from "./resource";', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: undefined,
        exportKind: 'value',
        express: 'export * from "./resource";',
        filePath: 'b',
        local: undefined,
        sourcePath: 'b',
        type: 'all',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it("export * as e7 from 'alias-resource';", () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'e7',
        exportKind: 'value',
        express: "export * as e7 from 'alias-resource';",
        filePath: 'b',
        local: undefined,
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it("export { omit } from 'lodash';", () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'omit',
        exportKind: 'value',
        express: "export { omit } from 'lodash';",
        filePath: 'b',
        local: 'omit',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export interface E1 {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'E1',
        exportKind: 'type',
        express: 'export interface E1 {}',
        filePath: 'b',
        local: 'E1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it("export type E2 = '';", () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'E2',
        exportKind: 'type',
        express: "export type E2 = '';",
        filePath: 'b',
        local: 'E2',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export enum E3 {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'E3',
        exportKind: 'value',
        express: 'export enum E3 {}',
        filePath: 'b',
        local: 'E3',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });
  });

  describe('export * as rb1 from "b"', () => {
    // a中导出的信息
    const aExportInfo: ITokenExportedInfo = {
      type: 'all',
      exported: 'rb1',
      local: undefined,
      express: 'export * as rb1 from "b"',
      exportKind: 'value',
      filePath: 'a',
      sourcePath: 'b',
    };

    it('export const e1 = ""', () => {
      // b中导出的信息
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'e1',
        exportKind: 'value',
        express: "export const e1 = '';",
        filePath: 'b',
        local: 'e1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export let e1;', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'e1',
        exportKind: 'value',
        express: 'export let e1;',
        filePath: 'b',
        local: 'e1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export function f1() {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'f1',
        exportKind: 'value',
        express: 'export function f1() {}',
        filePath: 'b',
        local: 'f1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export class ec {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'ec',
        exportKind: 'value',
        express: 'export class ec {}',
        filePath: 'b',
        local: 'ec',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export default f2;', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'default',
        exportKind: 'value',
        express: 'export default f2;',
        filePath: 'b',
        local: 'f2',
        sourcePath: 'b',
        type: 'default',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export { c as d };', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'd',
        exportKind: 'value',
        express: 'export { c as d };',
        filePath: 'b',
        local: 'c',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export { c as default };', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'default',
        exportKind: 'value',
        express: 'export { c as default };',
        filePath: 'b',
        local: 'c',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export * from "./resource";', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: undefined,
        exportKind: 'value',
        express: 'export * from "./resource";',
        filePath: 'b',
        local: undefined,
        sourcePath: 'b',
        type: 'all',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it("export * as e7 from 'alias-resource';", () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'e7',
        exportKind: 'value',
        express: "export * as e7 from 'alias-resource';",
        filePath: 'b',
        local: undefined,
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it("export { omit } from 'lodash';", () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'omit',
        exportKind: 'value',
        express: "export { omit } from 'lodash';",
        filePath: 'b',
        local: 'omit',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export interface E1 {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'E1',
        exportKind: 'type',
        express: 'export interface E1 {}',
        filePath: 'b',
        local: 'E1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it("export type E2 = '';", () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'E2',
        exportKind: 'type',
        express: "export type E2 = '';",
        filePath: 'b',
        local: 'E2',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export enum E3 {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'E3',
        exportKind: 'value',
        express: 'export enum E3 {}',
        filePath: 'b',
        local: 'E3',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });
  });

  describe('export { e1 } from "b"', () => {
    // a中导出的信息
    const aExportInfo: ITokenExportedInfo = {
      type: 'named',
      exported: 'e1',
      local: 'e1',
      express: 'export {a}',
      exportKind: 'value',
      filePath: 'a',
      sourcePath: 'b',
    };

    it('export const e1 = ""', () => {
      // b中导出的信息
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'e1',
        exportKind: 'value',
        express: "export const e1 = '';",
        filePath: 'b',
        local: 'e1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export let e1;', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'e1',
        exportKind: 'value',
        express: 'export let e1;',
        filePath: 'b',
        local: 'e1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(true);
    });

    it('export function f1() {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'f1',
        exportKind: 'value',
        express: 'export function f1() {}',
        filePath: 'b',
        local: 'f1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export class ec {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'ec',
        exportKind: 'value',
        express: 'export class ec {}',
        filePath: 'b',
        local: 'ec',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export default f2;', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'default',
        exportKind: 'value',
        express: 'export default f2;',
        filePath: 'b',
        local: 'f2',
        sourcePath: 'b',
        type: 'default',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export { c as d };', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'd',
        exportKind: 'value',
        express: 'export { c as d };',
        filePath: 'b',
        local: 'c',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export { c as default };', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'default',
        exportKind: 'value',
        express: 'export { c as default };',
        filePath: 'b',
        local: 'c',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export * from "./resource";', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: undefined,
        exportKind: 'value',
        express: 'export * from "./resource";',
        filePath: 'b',
        local: undefined,
        sourcePath: 'b',
        type: 'all',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it("export * as e7 from 'alias-resource';", () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'e7',
        exportKind: 'value',
        express: "export * as e7 from 'alias-resource';",
        filePath: 'b',
        local: undefined,
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it("export { omit } from 'lodash';", () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'omit',
        exportKind: 'value',
        express: "export { omit } from 'lodash';",
        filePath: 'b',
        local: 'omit',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export interface E1 {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'E1',
        exportKind: 'type',
        express: 'export interface E1 {}',
        filePath: 'b',
        local: 'E1',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it("export type E2 = '';", () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'E2',
        exportKind: 'type',
        express: "export type E2 = '';",
        filePath: 'b',
        local: 'E2',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });

    it('export enum E3 {}', () => {
      const bExportedInfo: ITokenExportedInfo = {
        exported: 'E3',
        exportKind: 'value',
        express: 'export enum E3 {}',
        filePath: 'b',
        local: 'E3',
        sourcePath: 'b',
        type: 'named',
      };

      expect(isTokenReExport(bExportedInfo, aExportInfo)).toBe(false);
    });
  });
});
