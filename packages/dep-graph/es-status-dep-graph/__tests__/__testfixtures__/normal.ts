// @ts-noCheck

export const a = "2";

const b = "3";
export {b};

export function f1() {
  // nothing
}

export default f1;

const c = "4";
export {c as d};

import _ from "lodash";
import * as React from "react";
import {useState} from "react";

import {Table as AntTable} from "antd";
import {Dep} from "./dep.ts";
