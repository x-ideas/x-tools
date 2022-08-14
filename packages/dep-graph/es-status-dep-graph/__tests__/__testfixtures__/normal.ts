/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-interface */

// export

export const a = '2';
export let e1;

export function f1() {}

export class ec {}

let f2;
export default f2;

const b = '3';
const c = '4';
export { c as d, b };

// 相对路径
export * from './resource';
// 别名
export * as e7 from 'alias-resource';
// package
export { omit } from 'lodash';

// 类型
export interface E1 {}
export type E2 = '';
export enum E3 {}

// Import

import i1 from './resource';
import * as i2 from './resource';
import _ from 'lodash';

import i3 from 'alias-resource';

import { pick as _pick } from 'lodash';
import type { IRes } from 'alias-resource';
import { IRes as _IRes } from 'alias-resource';
