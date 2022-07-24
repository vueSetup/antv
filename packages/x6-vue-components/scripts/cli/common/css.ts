type CSS_LANG = 'css' | 'less' | 'scss';

const getCssLang = (): CSS_LANG => {
  return 'less';
};

export const CSS_LANG = getCssLang();

const IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

// "import 'a.less';" => "import 'a.css';"
export const replaceCSSImportExt = (code: string) => {
  return code.replace(IMPORT_STYLE_RE, (str) => str.replace(`.${CSS_LANG}`, '.css'));
};
