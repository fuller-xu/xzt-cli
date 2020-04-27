#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const ora = require("ora");
const execa = require("execa");
const path = require("path");
const rootPath = process.cwd();

/**
 * 安装或者卸载
 * @param {String} operation 操作类型 install/uninstall
 * @param  {...any} args 参数
 */
const installOrUninstall = (operation) => {
  return (...args) => {
    // 出现加载图标
    const spinner = ora(`${operation}ing...`);
    spinner.start();
    execa("npm", args, {
      cwd: rootPath,
    })
      .then((res) => {
        // 结束加载图标
        spinner.succeed(`${operation} successfully`);
        console.log(chalk.green(`${res.stdout}`));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

module.exports = {
  install: installOrUninstall("install"),
  uninstall: installOrUninstall("uninstall"),
};
