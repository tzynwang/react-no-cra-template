/* Packages */
const fs = require('fs');
const path = require('path');

/* Data */
const APP_ROOT = fs.realpathSync(process.cwd());

/* Functions */
/** 回傳 'file' 相對於專案目錄的絕對路徑 */
function resolvePath(file) {
  return path.resolve(APP_ROOT, file);
}

module.exports = { resolvePath };
