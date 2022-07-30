import fse from 'fs-extra'
import { execa } from 'execa'
import type { Format } from 'esbuild'
import { createSpinner } from 'nanospinner'
import consola from 'consola'
import { join } from 'node:path'
import { clean } from './clean.js'
import { compileScript } from '../compiler/compile-script.js'
// import { compileSfc } from '../compiler/compile-sfc.js';
// import { compileBundles } from '../compiler/compile-bundles.js';
// import { compileStyle } from '../compiler/compile-style.js';
// import { genStyleDepsMap } from '../compiler/gen-style-deps-map.js';
// import { genComponentStyle } from '../compiler/gen-component-style.js';
import { SRC_DIR, LIB_DIR, ES_DIR } from '../common/constant.js'
import {
  isDir,
  // isSfc,
  isAsset,
  isStyle,
  isScript,
  isDemoDir,
  isTestDir,
  setNodeEnv,
} from '../common/index.js'

const { remove, copy, readdir, existsSync } = fse

/**
 * Pre-compile
 * 1. Remove unneeded dirs
 * 2. compile sfc into scripts/styles
 */
async function preCompileDir(dir: string) {
  const files = await readdir(dir)

  await Promise.all(
    files.map((filename) => {
      const filePath = join(dir, filename)

      if (isDemoDir(filePath) || isTestDir(filePath)) {
        return remove(filePath)
      }
      if (isDir(filePath)) {
        return preCompileDir(filePath)
      }
      // if (isSfc(filePath)) {
      //   return compileSfc(filePath);
      // }
      return Promise.resolve()
    }),
  )
}

async function compileDir(dir: string, format: Format) {
  const files = await readdir(dir)
  await Promise.all(
    files.map((filename) => {
      const filePath = join(dir, filename)
      return isDir(filePath)
        ? compileDir(filePath, format)
        : compileFile(filePath, format)
    }),
  )
}

async function compileFile(filePath: string, format: Format) {
  if (isScript(filePath)) {
    return compileScript(filePath, format)
  }
  if (isStyle(filePath)) {
    // return compileStyle(filePath);
  }
  if (isAsset(filePath)) {
    return Promise.resolve()
  }
  return remove(filePath)
}

const copySourceCode = async () => {
  return Promise.all([copy(SRC_DIR, ES_DIR), copy(SRC_DIR, LIB_DIR)])
}

const buildTypeDeclarations = async () => {
  await Promise.all([preCompileDir(ES_DIR), preCompileDir(LIB_DIR)])
  const tsConfig = join(process.cwd(), 'tsconfig.declaration.json')
  if (existsSync(tsConfig)) {
    await execa('vue-tsc', ['-p', tsConfig])
  }
}

const buildESMOutputs = async () => {
  await compileDir(ES_DIR, 'esm')
}

const buildCJSOutputs = async () => {
  await compileDir(LIB_DIR, 'cjs')
}

// async function buildStyleEntry() {
//   await genStyleDepsMap();
//   genComponentStyle();
// }

// const buildBundledOutputs = async () => {
//   await compileBundles();
//   genVeturConfig();
// };

const tasks = [
  {
    text: 'Copy Source Code',
    task: copySourceCode,
  },
  // {
  //   text: 'Build Package Script Entry',
  //   task: buildPackageScriptEntry,
  // },
  // {
  //   text: 'Build Component Style Entry',
  //   task: buildStyleEntry,
  // },
  // {
  //   text: 'Build Package Style Entry',
  //   task: buildPackageStyleEntry,
  // },
  {
    text: 'Build Type Declarations',
    task: buildTypeDeclarations,
  },
  {
    text: 'Build ESModule Outputs',
    task: buildESMOutputs,
  },
  {
    text: 'Build CommonJS Outputs',
    task: buildCJSOutputs,
  },
  // {
  //   text: 'Build Bundled Outputs',
  //   task: buildBundledOutputs,
  // },
]

async function runBuildTasks() {
  for (let i = 0; i < tasks.length; i++) {
    const { task, text } = tasks[i]
    const spinner = createSpinner(text).start()

    try {
      /* eslint-disable no-await-in-loop */
      await task()
      spinner.success({ text })
    } catch (err) {
      spinner.error({ text })
      console.log(err)
      throw err
    }
  }

  consola.success('Compile successfully')
}

export const build = async () => {
  setNodeEnv('production')

  try {
    await clean()
    await runBuildTasks()
  } catch (err) {
    consola.error('Build failed')
    process.exit(1)
  }
}
