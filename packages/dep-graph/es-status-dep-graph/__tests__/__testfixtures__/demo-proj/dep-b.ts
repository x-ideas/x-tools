import _ from 'lodash';
import { TDepC } from './dep-c';

export interface IDepB {
  name: TDepC;
}

export const omit = _.omit;
