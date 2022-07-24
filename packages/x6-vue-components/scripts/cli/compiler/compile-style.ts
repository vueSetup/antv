// import fse from 'fs-extra';
// import consola from 'consola';
// import { parse } from 'path';
// import { replaceExt } from '../common/index';
// import { compileCss } from './compile-css';
// import { compileLess } from './compile-less';
// import { compileSass } from './compile-sass';

// const { readFileSync, writeFileSync, removeSync } = fse;

// const compileFile = async (filePath: string) => {
//   const parsedPath = parse(filePath);

//   try {
//     if (parsedPath.ext === '.less') {
//       const source = await compileLess(filePath);
//       return await compileCss(source);
//     }

//     if (parsedPath.ext === '.scss') {
//       const source = await compileSass(filePath);
//       return await compileCss(source);
//     }

//     const source = readFileSync(filePath, 'utf-8');
//     return await compileCss(source);
//   } catch (err) {
//     consola.error('Compile style failed: ' + filePath);
//     throw err;
//   }
// };

// export const compileStyle = async (filePath: string) => {
//   const css = await compileFile(filePath);
//   writeFileSync(replaceExt(filePath, '.css'), css);
// };
