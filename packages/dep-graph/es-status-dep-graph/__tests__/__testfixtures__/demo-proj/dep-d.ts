import { omit } from 'dep-b';

export const DepD = 'DepD';

export enum ETarget {}

export function Hello(): string {
  return 'Hello';
}

function callOmit() {
  omit({}, '');
}
