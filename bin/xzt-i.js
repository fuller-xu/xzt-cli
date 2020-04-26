#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const ora = require("ora");
const execa = require("execa");
const path = require("path");
const rootPath = process.cwd();

module.exports = (pkg, ...args) => {
  console.log(args);
  // 出现加载图标
  const spinner = ora(`Installing ${pkg}`);
  spinner.start();
  execa("npm", args, {
    cwd: rootPath,
  })
    .then((res) => {
      // 结束加载图标
      spinner.succeed(`Installing ${pkg} successfully`);
      console.log(chalk.green(`${res.stdout}`));
    })
    .catch((err) => {
      console.log(err);
    });
};
