#!/usr/bin/env node

const program = require("commander");
const minimist = require("minimist");

program.version(require("../package").version).usage("<command> [options]");
// 安装 npm 依赖
program
  // .command("i", "install npm dependencies")
  .command("i <pkg> [pkgOptions]")
  .description("install npm package")
  .allowUnknownOption()
  .action((pkg) => {
    require("./xzt-i")(pkg, ...process.argv.slice(2));
  });

// 安装git commit自动化工具相关依赖和环境
program
  // .command("i", "install npm dependencies")
  .command("init commit")
  .description("install npm package")
  .allowUnknownOption()
  .action((cmd) => {
    require("./xzt-git-commit")(cmd);
  });

// 解析命令行参数
program.parse(process.argv);