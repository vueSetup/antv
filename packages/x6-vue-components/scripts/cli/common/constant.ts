import fse from 'fs-extra';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
// import consola from 'consola';
const { existsSync, readFileSync } = fse;

const findRootDir = (dir: string): string => {
  if (existsSync(join(dir, 'tsconfig.json'))) {
    return dir;
  }

  const parentDir = dirname(dir);
  if (dir === parentDir) {
    return dir;
  }

  return findRootDir(parentDir);
};

// Root paths
export const CWD = process.cwd();
export const ROOT = findRootDir(CWD);
export const ES_DIR = join(ROOT, 'es');
export const LIB_DIR = join(ROOT, 'lib');
export const DOCS_DIR = join(ROOT, 'docs');
export const VETUR_DIR = join(ROOT, 'vetur');
export const PACKAGE_JSON_FILE = join(ROOT, 'packageon');

// Relative paths
const __dirname = dirname(fileURLToPath(import.meta.url));
export const CJS_DIR = join(__dirname, '..', '..', 'cjs');
export const DIST_DIR = join(__dirname, '..', '..', 'dist');

// Dist files
export const PACKAGE_ENTRY_FILE = join(DIST_DIR, 'package-entry');
export const PACKAGE_STYLE_FILE = join(DIST_DIR, 'package-style.css');

export const STYLE_DEPS_JSON_FILE = join(DIST_DIR, 'style-depson');

export const SCRIPT_EXTS = ['', 'x', '.vue', '.ts', '.tsx', '.mjs', '.cjs'];
export const STYLE_EXTS = ['.css', '.less', '.scss'];

export const getPackageJson = () => {
  const rawJson = readFileSync(PACKAGE_JSON_FILE, 'utf-8');
  return JSON.parse(rawJson);
};

const getSrcDir = () => {
  const srcDir = 'src';
  // if (isAbsolute(srcDir)) {
  //   return srcDir;
  // }
  return join(ROOT, srcDir);
};

export const SRC_DIR = getSrcDir();
export const STYLE_DIR = join(SRC_DIR, 'style');
