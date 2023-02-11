/* Packages */
import fs from 'fs';
import path from 'path';

/* Data */
const APP_ROOT = fs.realpathSync(process.cwd());

/* Functions */
/** 回傳 'file' 相對於專案目錄的絕對路徑 */
export function resolvePath(file: string) {
  return path.resolve(APP_ROOT, file);
}
