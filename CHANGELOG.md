# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 2.2.0 (2022-03-22)


### Features

* add {{CLASSNAME}} to missing templates ([b53a0ea](https://github.com/Teclead/AEM-Generator/commit/b53a0ea89396ede5c440982ca0df279b1f07d243))
* add github action for project testing ([8bb3ac9](https://github.com/Teclead/AEM-Generator/commit/8bb3ac9593cd70ca725fa97df0bfba47942a91a9))
* add pre-commit hook ([52c7359](https://github.com/Teclead/AEM-Generator/commit/52c735961a9e9b6b1f50af005e77118a9d4610d2))
* adjust jquery generators ([c198c47](https://github.com/Teclead/AEM-Generator/commit/c198c47d6c4599edca9daeff68f84595ae56e691))
* adjust onChange for multifield ([27ff5bb](https://github.com/Teclead/AEM-Generator/commit/27ff5bb7fddc421ccdfcd86f3f8742cd222d7d6f))
* adjust onChange target class name & heading template ([21ef73d](https://github.com/Teclead/AEM-Generator/commit/21ef73dc350d33d273f265d75ab75da7d0922b26))
* always rebuild clientlibs ([c7a0f1e](https://github.com/Teclead/AEM-Generator/commit/c7a0f1ef20b0431574c2a09ffe8e708d6aebc313))
* handle nested onChange methods ([74ba6e8](https://github.com/Teclead/AEM-Generator/commit/74ba6e89d050baed184b45186775152d2e0b01ea))
* onChange function ([b0624b2](https://github.com/Teclead/AEM-Generator/commit/b0624b27d59afc53d083f433e72cda221f13e2f0))
* onChange on Multifield nested ([d7d2bce](https://github.com/Teclead/AEM-Generator/commit/d7d2bcef9c8a5d400277da13e5dbf28b20c92320))
* onLoad function ([28fbcfb](https://github.com/Teclead/AEM-Generator/commit/28fbcfb15b942f07c37d46f26f8107285f4f24c2))
* tslint to eslint ([48ac540](https://github.com/Teclead/AEM-Generator/commit/48ac540e553dc08b566049e2b7e44f55af297092))


### Bug Fixes

* tsnode compiler options ([93f1329](https://github.com/Teclead/AEM-Generator/commit/93f13297e73cfe256468d90d4bce255be9346123))

## 2.2.0
- Changed onChange Model from `targetClassName` to `onChangeTarget`
- Added `{{CLASSNAME}}` to heading template

## 2.1.4
- Updated XML template properties & order
- Handle onChange function in nested multifields

## 2.1.0
- Added onChange handler for fields
- Added onLoad handler for fields
- Added targetClassName to handle onChange targets
- Added className property to set custom class names for fields
- Adjusted clientlib generation

## 1.0.0
- first version of the public aem generator by Teclead