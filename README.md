# leonardo-ui

![Logo](docs/src/img/logo.png?raw=true)

A UI component framework with a slim and modern look & feel. Use it to enhance the UI of your web app! Works well with popular frameworks such as Bootstrap and Foundation. View it in action https://qlik-oss.github.io/leonardo-ui

[![CircleCI](https://circleci.com/gh/qlik-oss/leonardo-ui/tree/master.svg?style=shield)](https://circleci.com/gh/qlik-oss/leonardo-ui/tree/master)
[![npm](https://badge.fury.io/js/leonardo-ui.svg?branch=master)](http://badge.fury.io/js/leonardo-ui)

## Get started

Run the following command:

```shell
npm install --save leonardo-ui
```

Add the following to your html:

```html
<head>
  <link rel="stylesheet" href="node_modules/leonardo-ui/dist/leonardo-ui.css" type="text/css"/>
</head>
<body>
  <!-- Page content -->
  <script src="node_modules/leonardo-ui/dist/leonardo-ui.js" type="text/javascript"></script>
</body>
```

To use the icon font (optional), add this to your CSS:

```css
@font-face {
  font-family: "LUI icons";
  src: url(node_modules/leonardo-ui/dist/lui-icons.woff) format('woff'),
       url(node_modules/leonardo-ui/dist/lui-icons.ttf) format('truetype');
}
```

Example using a button

```html
<button class="lui-button">Default</button>
```

## Contributing

Please follow the instructions in [CONTRIBUTING.md](.github/CONTRIBUTING.md).
