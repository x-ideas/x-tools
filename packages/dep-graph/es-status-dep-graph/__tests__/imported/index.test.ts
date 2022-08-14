import { parse } from '@babel/parser';
import path from 'path';
import fs from 'fs';
import { findImportedInfoByFile } from '../../imported';
import { IImportedInfo } from '../../imported/types';

describe('test getImportedInfos', () => {
  it('normal', () => {
    const filePath = path.resolve(__dirname, '../__testfixtures__/normal.ts');

    const reourcePath = path.resolve(path.dirname(filePath), './resource.ts');

    const result: IImportedInfo[] = findImportedInfoByFile(filePath, {
      tsConfig: path.resolve(__dirname, '../__testfixtures__/tsconfig.json'),
    });

    expect(result.length).toBe(7);

    expect(result).toEqual<IImportedInfo[]>([
      {
        express: "import i1 from './resource';",
        filePath: filePath,
        imported: 'default',
        importKind: 'value',
        local: 'i1',
        sourcePath: reourcePath,
        type: 'Default',
      },
      {
        express: "import * as i2 from './resource';",
        filePath: filePath,
        imported: undefined,
        importKind: 'value',
        local: 'i2',
        sourcePath: reourcePath,
        type: 'Namespaces',
      },
      {
        express: "import _ from 'lodash';",
        filePath: filePath,
        imported: 'default',
        importKind: 'value',
        local: '_',
        sourcePath: require.resolve('lodash'),
        type: 'Default',
      },
      {
        express: "import i3 from 'alias-resource';",
        filePath: filePath,
        imported: 'default',
        importKind: 'value',
        local: 'i3',
        sourcePath: reourcePath,
        type: 'Default',
      },
      {
        express: "import { pick as _pick } from 'lodash';",
        filePath: filePath,
        imported: 'pick',
        importKind: 'value',
        local: '_pick',
        sourcePath: require.resolve('lodash'),
        type: 'Named',
      },
      {
        express: "import type { IRes } from 'alias-resource';",
        filePath: filePath,
        imported: 'IRes',
        importKind: 'type',
        local: 'IRes',
        sourcePath: reourcePath,
        type: 'Named',
      },
      {
        express: "import { IRes as _IRes } from 'alias-resource';",
        filePath: filePath,
        imported: 'IRes',
        importKind: 'value',
        local: '_IRes',
        sourcePath: reourcePath,
        type: 'Named',
      },
    ]);
  });
});
