import fse from 'fs-extra';
import { transformAsync } from '@babel/core';
import { transform, type Format } from 'esbuild';
import { sep } from 'node:path';
import { isJsx, replaceExt } from '../common/index.js';
import { replaceCSSImportExt } from '../common/css.js';
import { replaceScriptImportExt } from './get-deps.js';

const { readFileSync, removeSync, outputFileSync } = fse;

export const compileScript = async (filePath: string, format: Format): Promise<void> => {
  if (filePath.includes('.d.ts')) {
    return;
  }

  // const extensionMap = getVantConfig().build?.extensions;
  // const extension = extensionMap?.[format] || '';
  const extension = '.js';

  let code = readFileSync(filePath, 'utf-8');

  if (!filePath.includes(`${sep}style${sep}`)) {
    code = replaceCSSImportExt(code);
  }
  code = replaceScriptImportExt(code, filePath, extension);

  if (isJsx(filePath)) {
    const babelResult = await transformAsync(code, {
      filename: filePath,
      babelrc: false,
      presets: ['@babel/preset-typescript'],
      plugins: [
        [
          '@vue/babel-plugin-jsx',
          {
            enableObjectSlots: false,
          },
        ],
      ],
    });
    if (babelResult?.code) {
      ({ code } = babelResult);
    }
  }

  const esbuildResult = await transform(code, {
    loader: 'ts',
    target: 'es2016',
    format,
  });

  ({ code } = esbuildResult);

  const jsFilePath = replaceExt(filePath, extension);

  removeSync(filePath);
  outputFileSync(jsFilePath, code);
};
