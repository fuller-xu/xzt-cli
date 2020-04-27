#!/usr/bin/env node

const program = require("commander");
const minimist = require("minimist");

program
  .version(require("../package.json").version)
  .usage("<command> [options]");
// 安装 npm 依赖
program
  .command("i <pkg> [pkgOptions]")
  .description("install npm package")
  .allowUnknownOption()
  .action((pkg) => {
    require("./xzt-i").install(...process.argv.slice(2));
  });
// 卸载 npm 依赖
program
  .command("uninstall <pkg>")
  .description("uninstall npm package")
  .allowUnknownOption()
  .action((pkg) => {
    require("./xzt-i").uninstall(...process.argv.slice(2));
  });

// 安装git commit自动化工具相关依赖和环境
program
  .command("install-git-commit-tool")
  .description("auto install git-commit-tool")
  .action((cmd) => {
    require("./xzt-git-commit").install();
  });
// 卸载git commit自动化工具相关依赖和环境
program
  .command("uninstall-git-commit-tool")
  .description("auto uninstall git-commit-tool")
  .action((cmd) => {
    require("./xzt-git-commit").uninstall();
  });

// 解析命令行参数
program.parse(process.argv);
