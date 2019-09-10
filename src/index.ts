import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

export = ({ opts }: any) => {
  enum LINE_FEED {
    LF = "\n",
    CRLF = "\r\n"
  }

  type Config = {
    LINE_FEED: keyof typeof LINE_FEED;
  }

  const defaultConfig: Config = opts.plugin.pluginInfo.getPreferences();
  const config: Config = Object.assign({}, defaultConfig, opts.cli_variables);

  if (!Object.keys(LINE_FEED).includes(config.LINE_FEED)) {
    console.error(`[cordova-plugin-package-json-guard]: Invalid config: ${JSON.stringify(opts.cli_variables)}`);
    process.exit(1);
  }

  const lineFeed = LINE_FEED[config.LINE_FEED];

  const pkgPath = resolve(process.cwd(), "package.json");

  try {
    const content = readFileSync(pkgPath, { encoding: "utf8" });
    const newContent = content.replace(/(\n|\r\n)*$/, lineFeed);
    writeFileSync(pkgPath, newContent);
  } catch (error) {
    console.error(`[cordova-plugin-package-json-guard]: ${error.message}`);
    process.exit(1);
  }
};
