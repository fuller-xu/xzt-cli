#!/usr/bin/env node

const program = require("commander");
const minimist = require("minimist");

program
  .version(require("../package.json").version)
  .usage("<command> [options]");

// 安装 npm 依赖
program
  .command("install [pkgOptions]")
  .alias('i')
  .description("install npm package")
  .allowUnknownOption()
  .action((pkg) => {
    require("../scripts/xzt-i").install(...process.argv.slice(2));
  });
// 卸载 npm 依赖
program
  .command("uninstall <pkg>")
  .description("uninstall npm package")
  .allowUnknownOption()
  .action((pkg) => {
    require("../scripts/xzt-i").uninstall(...process.argv.slice(2));
  });
// 克隆下载web框架模板
program
  .command("clone")
  .description("clone a template of web framework")
  .action((cmd) => {
    require("../scripts/xzt-template")();
  });
// 安装git commit自动化工具相关依赖和环境
program
  .command("add-git-commit-validation")
  .alias('agcv')
  .description("auto add git commit validation tool environment")
  .action((cmd) => {
    require("../scripts/xzt-git-commit").install();
  });
// 卸载git commit自动化工具相关依赖和环境
program
  .command("remove-git-commit-validation")
  .alias('rgcv')
  .description("auto remove git commit validation tool environment")
  .action((cmd) => {
    require("../scripts/xzt-git-commit").uninstall();
  });

// 安装eslint,prettier依赖和环境
program
  .command("add-vue-eslint")
  .alias('ave')
  .description("auto add vue eslint + prettier environment")
  .action((cmd) => {
    require("../scripts/xzt-vue-prettier-eslint").install();
  });
// 移除eslint,prettier依赖和环境
program
  .command("remove-vue-eslint")
  .alias('rve')
  .description("auto remove vue eslint + prettier environment")
  .action((cmd) => {
    require("../scripts/xzt-vue-prettier-eslint").uninstall();
  });
// 解析命令行参数
program.parse(process.argv);
