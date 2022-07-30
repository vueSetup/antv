# x6-vue-components

> Vue3 components for building x6 editors

[![Language](https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square)](https://www.typescriptlang.org)
[![Vue Support](https://img.shields.io/badge/support-Vue3-green?style=flat)](./package.json) 
[![Vue Grammar Level](https://img.shields.io/badge/full-Composition%20API-blue?style=flat)](https://v3.vuejs.org/guide/composition-api-introduction.html)
[![MIT License](https://img.shields.io/github/license/antvis/x6?style=flat-square)](/LICENSE) 
[![NPM Package](https://img.shields.io/npm/v/@antv/x6-vue-components.svg?style=flat-square)](https://www.npmjs.com/package/@antv/x6-react-components) 
[![NPM Downloads](http://img.shields.io/npm/dm/@antv/x6-vue-components.svg?style=flat-square)](https://www.npmjs.com/package/@antv/x6-react-components) 

## Components

- Menu
- Dropdown
- ContextMenu
- Menubar
- Toolbar

## Installation

```shell
# npm
$ npm install @antv/x6-vue-components --save

# yarn
$ yarn add @antv/x6-vue-components
```

# pnpm
$ pnpm add @antv/x6-vue-components
```

## Usage

Import component and style:

```ts
import { Menu } from '@antv/x6-vue-components/es/menu'
// less
import '@antv/x6-vue-components/es/menu/style'
// or css
import '@antv/x6-vue-components/es/menu/style/index.css'
```

We strongly recommend using [babel-plugin-import](https://github.com/ant-design/babel-plugin-import), which can convert the following code to the '@antv/x6-vue-components/es/xxx' way:

```ts
import { Menu } from '@antv/x6-vue-components'
```

And this plugin will also load corresponding styles too. Via `.babelrc` or babel-loader:

```js
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "@antv/x6-vue-components",
        "libraryDirectory": "es", // es or lib
        "style": true,
        "transformToDefaultImport": true
      }
    ]
  ]
}
```

## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/antvis/x6/issues/new).
