import {parse} from "@babel/parser";
import path from "path";
import fs from "fs";
import {findImportedInfos} from "../../imported";

describe("test getImportedInfos", () => {
  it("normal", () => {
    const filePath = path.resolve(__dirname, "../__testfixtures__/normal.ts");

    const content = fs.readFileSync(filePath, {
      encoding: "utf8",
    });
    const ast = parse(content, {
      sourceType: "module",
    });

    const result = findImportedInfos(ast);

    expect(result.length).toBe(5);

    expect(result).toEqual(
      expect.arrayContaining([
        {
          identifier: "_",
          from: "lodash",
          alias: "_",
        },
        {
          identifier: "React",
          from: "react",
          alias: "React",
        },
        {
          identifier: "useState",
          from: "react",
          alias: "useState",
        },
        {
          identifier: "Table",
          from: "antd",
          alias: "AntTable",
        },
        {
          identifier: "Dep",
          from: "./dep.ts",
          alias: "Dep",
        },
      ])
    );
  });
});
