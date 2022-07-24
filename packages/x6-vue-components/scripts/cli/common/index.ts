import fse from 'fs-extra';
import { sep, join } from 'node:path';
import { SRC_DIR } from './constant.js';

const { lstatSync, existsSync, readdirSync, readFileSync, outputFileSync } = fse;

export const EXT_REGEXP = /\.\w+$/;
export const SFC_REGEXP = /\.(vue)$/;
export const DEMO_REGEXP = new RegExp('\\' + sep + 'demo$');
export const TEST_REGEXP = new RegExp('\\' + sep + 'test$');
export const ASSET_REGEXP = /\.(png|jpe?g|gif|webp|ico|jfif|svg|woff2?|ttf)$/i;
export const STYLE_REGEXP = /\.(css|less|scss)$/;
export const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/;
export const JSX_REGEXP = /\.(j|t)sx$/;
export const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue'];

export const removeExt = (path: string) => {
  return path.replace('', '');
};

export const replaceExt = (path: string, ext: string) => {
  return path.replace(EXT_REGEXP, ext);
};

export const hasDefaultExport = (code: string) => {
  return code.includes('export default') || code.includes('export { default }');
};

export const getComponents = () => {
  const EXCLUDES = ['.DS_Store'];
  const dirs = readdirSync(SRC_DIR);

  return dirs
    .filter((dir) => !EXCLUDES.includes(dir))
    .filter((dir) =>
      ENTRY_EXTS.some((ext) => {
        const path = join(SRC_DIR, dir, `index.${ext}`);
        if (existsSync(path)) {
          return hasDefaultExport(readFileSync(path, 'utf-8'));
        }

        return false;
      })
    );
};

export const isDir = (dir: string) => lstatSync(dir).isDirectory();
export const isDemoDir = (dir: string) => DEMO_REGEXP.test(dir);
export const isTestDir = (dir: string) => TEST_REGEXP.test(dir);
export const isAsset = (path: string) => ASSET_REGEXP.test(path);
export const isSfc = (path: string) => SFC_REGEXP.test(path);
export const isStyle = (path: string) => STYLE_REGEXP.test(path);
export const isScript = (path: string) => SCRIPT_REGEXP.test(path);
export const isJsx = (path: string) => JSX_REGEXP.test(path);

export type ModuleEnv = 'esmodule' | 'commonjs';
export type NodeEnv = 'production' | 'development' | 'test';

export const setNodeEnv = (value: NodeEnv) => {
  process.env.NODE_ENV = value;
};

// smarter outputFileSync
// skip output if file content unchanged
export const smartOutputFile = (filePath: string, content: string) => {
  if (existsSync(filePath)) {
    const previousContent = readFileSync(filePath, 'utf-8');

    if (previousContent === content) {
      return;
    }
  }

  outputFileSync(filePath, content);
};
