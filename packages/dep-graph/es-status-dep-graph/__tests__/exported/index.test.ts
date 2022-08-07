import {parse} from "@babel/parser";
import path from "path";
import fs from "fs";
import {findExportedInfos} from "../../exported";

describe("test getExportedInfos", () => {
  it("normal ", async () => {
    const filePath = path.resolve(__dirname, "../__testfixtures__/normal.ts");

    const content = fs.readFileSync(filePath, {
      encoding: "utf8",
    });
    const ast = parse(content, {
      sourceType: "module",
    });

    // 寻找
    const result = findExportedInfos(ast);

    expect(result.length).toBe(5);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          identifier: "a",
          type: "named",
        },
        {
          identifier: "b",
          type: "named",
        },
        {
          identifier: "d",
          type: "named",
        },
        {
          identifier: "f1",
          type: "named",
        },
        {
          identifier: "f1",
          type: "default",
        },
      ])
    );
  });
});
