# cordova-plugin-package-json-guard

Fix line feed issue for package.json after cordova build, just install it.

## Installation

```bash
# use Unix-style line feed: "LF" => "\n", (this is default)
cordova plugin add cordova-plugin-package-json-guard

# use Windows-style line feed: "CRLF" => "\r\n"
cordova plugin add cordova-plugin-package-json-guard --variable LINE_FEED="CRLF"
```
