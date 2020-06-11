import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

export = ({ opts }: any) => {
  enum LINE_FEED {
    LF = "\n",
    CRLF = "\r\n"
  }

  let lineFeed = LINE_FEED.LF;

  try {
    const pkgPath = resolve(process.cwd(), "package.json");
    const content = readFileSync(pkgPath, { encoding: "utf8" });
    const eolIndex = content.indexOf("\n");

    if (content[eolIndex - 1] === "\r") {
      lineFeed = LINE_FEED.CRLF;
    }

    const newContent = content.replace(/(\n|\r\n)*$/, lineFeed);
    writeFileSync(pkgPath, newContent);
  } catch (error) {
    console.error(`[${opts.plugin.id}]: ${error.message}`);
    process.exit(1);
  }
};
