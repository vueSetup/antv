# x6-vue-components

> Vue components for building x6 editors

## Components

-   Menu
-   Dropdown
-   ContextMenu
-   Menubar
-   Toolbar
-   SplitBox
-   ScrollBox
-   AutoScrollBox
-   ColorPicker

## Installation

```shell
# npm
$ npm install @antv/x6-vue-components --save

# yarn
$ yarn add @antv/x6-vue-components
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

We strongly recommend using [babel-plugin-import](https://github.com/ant-design/babel-plugin-import), which can convert the following code to the '@antv/x6-react-components/es/xxx' way:

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
