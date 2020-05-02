<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [XZT-CLI](#xzt-cli)
  - [安装](#%e5%ae%89%e8%a3%85)
  - [使用](#%e4%bd%bf%e7%94%a8)
    - [HELP 命令](#help-%e5%91%bd%e4%bb%a4)
    - [下载模板](#%e4%b8%8b%e8%bd%bd%e6%a8%a1%e6%9d%bf)
    - [安装 `vue` 框架中 `prettier` + `eslint` 环境](#%e5%ae%89%e8%a3%85-vue-%e6%a1%86%e6%9e%b6%e4%b8%ad-prettier--eslint-%e7%8e%af%e5%a2%83)
    - [安装 `git commit` 验证工具和自动生成 `changelog.md`](#%e5%ae%89%e8%a3%85-git-commit-%e9%aa%8c%e8%af%81%e5%b7%a5%e5%85%b7%e5%92%8c%e8%87%aa%e5%8a%a8%e7%94%9f%e6%88%90-changelogmd)
    - [替代 `npm` 命令](#%e6%9b%bf%e4%bb%a3-npm-%e5%91%bd%e4%bb%a4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# XZT-CLI

## 安装

全局安装

```bash
npm i -g xzt-cli
```

## 使用

### HELP 命令

```bash
xzt -h
Usage: xzt <command> [options]

Options:
  -V, --version                      output the version number
  -h, --help                         display help for command

Commands:
  install|i [pkgOptions]             install npm package
  uninstall <pkg>                    uninstall npm package
  clone                              clone a template of web framework
  add-git-commit-validation|agcv     auto add git commit validation tool environment
  remove-git-commit-validation|rgcv  auto remove git commit validation tool environment
  add-vue-eslint|ave                 auto add vue eslint + prettier environment
  remove-vue-eslint|rve              auto remove vue eslint + prettier environment
```

### 下载模板

```bash
xzt clone
```

### 安装 `vue` 框架中 `prettier` + `eslint` 环境

```bash
xzt add-vue-eslint
```

或者

```bash
xzt ave
```

也可以使用卸载命令，注意依赖是否冲突，否则会被卸载

```bash
xzt remove-vue-eslint
```

或者

```bash
xzt rve
```

### 安装 `git commit` 验证工具和自动生成 `changelog.md`

```bash
xzt add-git-commit-validation
```

或者

```bash
xzt agcv
```

也可以使用卸载命令，注意依赖是否冲突，否则会被卸载

```bash
xzt remove-git-commit-validation
```

或者

```bash
xzt rgcv
```

### 替代 `npm` 命令

> 彩蛋，自制命令，你也可以用来替代 `npm`

```bash
xzt i axios -S
```
