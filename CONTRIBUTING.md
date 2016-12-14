# Contributing to Leonardo UI

Follow these guidelines if you want to contribute to Leonardo UI:

 - [Code of conduct](#code-of-conduct)
 - [Bugs](#bugs)
 - [Features](#features)
 - [Documentation](#documentation)
 - [Git guidelines](#git)
 - [Signing the CLA](#cla)
 - [Coding guidelines](#coding)
 - [Developing](#developing)

## <a name="code-of-conduct"></a> Code of conduct

Please read and follow the [Code of conduct](https://github.com/qlik-oss/open-source/blob/master/CODE_OF_CONDUCT.md) guide.

## <a name="bugs"></a> Bugs

Report bugs by adding issues in the repository. Submit bug fixes by creating a Pull Request, according to the [GIT guidelines](#git).

## <a name="features"></a> Features

Request features by adding issues in the repository. If the feature includes new designs or bigger changes,
please discuss the changes with us so we can cooperate on how to best include them.

Submit your feature by creating a Pull Request, according to the [GIT guidelines](#git). Include related documentation changes, if any.


## <a name="documentation"></a> Documentation changes

Request documentation changes by adding issues in the repository.

Submit your documentation changes by creating a Pull Request, according to the [GIT guidelines](#git).
If the change is minor, you can submit a Pull Request directly without creating an issue first. 

## <a name="coding"></a> Coding guidelines

### JavaScript

We are using a slightly modified AirBnb ESLint config for JavaScript files.

The JS should be unit-tested where applicable. For unit tests we are using Mocha and Chai, provided
by the testing framework `after-work.js`.

### CSS

We are using the [Two Dashes style](https://en.bem.info/methodology/naming-convention/#two-dashes-style) of the [BEM](https://en.bem.info/method) naming convention for CSS classes.

In short, the syntax is as follows:

```
.component             { /* Block styling */ }
.component--modifier   { /* Block modifier styling */ }
.component__elem       { /* Block element (child element) styling */ }
.component__elem--modifier { /* Block element modifier styling */ }
```

There are some common modifiers that are used across components, such as `.lui-active` and `.lui-disabled`.
These are exceptions from BEM, generally modifiers should be per component, for example `.component-name_modifier-name`. We often call modifiers for variants, especially at the block level.

Additional considerations:

- Don't use id or element selectors. Use CSS classes following BEM.
- Don't use hardcoded colors in components. Use the color variables provided by the palette in `colors.less`.


## Developing

Start by installing all dependencies:

```sh
$ npm install
```

Building the project with docs:

```sh
$ npm run build
$ npm run docs
```

Running unit tests and linting:

```sh
$ npm run test
$ npm run lint
```

Start the dev server:

```shell
$ npm start
```

Go to `localhost:8080` in your browser. The dev server will watch for file changes in the `src` and `docs/src` directories.


### Adding / updating a component / variant

Make sure the following requirements are met when working with components / variants:

- Document variants and states of the component. Documentation is located in the `docs/src` folder.
- Rendering tests for variants and states of the component. Rendering tests are located in the `src` folder while the artifacts are located in the `test/component` folder. See more below.
- Unit test JavaScript (if the component has JavaScript). Unit tests are located in the `test/unit` folder.
- RTL is supported (right-to-left).
- Accessibility is supported. Many times documenting which ARIA attributes to use is sufficient.


### Adding / updating rendering test baselines

If your Pull Request includes a new component, or updates the UI of an existing one, your build will likely fail.

You need to manually download new artifacts for the Pull Request from CircleCI and replace existing ones by doing the following:

1. Navigate to the build of your Pull Request. For example, `master` branch artifacts can be found here: https://circleci.com/gh/qlik-oss/leonardo-ui/466#artifacts/containers/0.
2. Go to the folder `/home/ubuntu/leonardo-ui/test/component/artifacts`. 
3. Open the test report file in your browser. For example `chrome-report-2016-11-02_08-28-34.html`.
4. Click on the image icon to the right of the failing test(s).
5. Download the "Regression" image.
6. Replace the baseling image with the downloaded image. For example `/home/ubuntu/leonardo-ui/test/component/baseline/checkbox/checkbox-linux-chrome.png`. 


## <a name="git"></a> Git Guidelines

Generally, development should be done directly towards the `master` branch.

### Workflow

1\. Fork the repository

```sh
git clone git@github.com:YOUR-USERNAME/leonardo-ui.git
```

2\. Create a branch in the fork

The branch should be based on the `master` branch in the master repository.

```sh
git checkout -b my-feature-or-bugfix master
```

3\. Commit changes on your branch

Commit changes to your branch, following the commit message format.

```sh
git commit -m "Bugfix: Fix lines not wrapping in dialogs."
```

4\. Push the changes to your fork

```sh
git push -u myfork my-feature-or-bugfix
```

5\. Create a Pull Request

Before creating a Pull Request, make sure the following items are fulfilled:

- CircleCI is green
- Commit message format is followed
- [CLA](#cla) is signed

In the Github UI of your fork, create a Pull Request to the `master` branch of the master repository. Make sure you have signed the [CLA](https://github.com/qlik-oss/open-source/blob/master/sign-cla.md).

If the branch has merge conflicts, or has been outdated, please do a rebase against the `master` branch.

_WARNING: Squashing or reverting commits and force-pushing thereafter may remove GitHub comments on code that were previously made by you or others in your commits. Avoid any form of rebasing unless necessary._ 


### Commit message format

There are currently no conventions on how to format commit messages. However, we would like you to follow some rules on the content:

- Use the present form, e.g. _Set border radius to 3px in button components._
- Be descriptive and avoid messages like `Minor fix`.
- If the change is breaking an API, add a _[breaking]_ tag in the message.

Some examples of good commit messages:

- _Add inverse variant for checkbox_
- _Refactor dialog animations_
- _Update get-started documentation_
- _Fix border-styling issue with buttons in Firefox_


## <a name="cla"></a> Signing the CLA

You must sign our Contributor License Agreement (CLA) before your Pull Request can be accepted. For more information, see: https://github.com/qlik-oss/open-source/blob/master/sign-cla.md.
