/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-interface */
export const a = '2';
export let e1;

export function f1() {}

export class ec {}

let f2;
export default f2;

const b = '3';
const c = '4';
export { c as d, b };

export * from './resource';
export * as e7 from 'alias-resource';
export { omit } from 'lodash';

export interface E1 {}
export type E2 = '';
export enum E3 {}

import _ from 'lodash';
import * as React from 'react';
import { useState } from 'react';

import { Table as AntTable } from 'antd';
import { Dep } from './dep.ts';
