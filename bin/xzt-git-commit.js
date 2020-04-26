const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs-extra");
const ora = require("ora");
const execa = require("execa");
const path = require("path");
const rootPath = process.cwd();

/**
 * 安装所需依赖
 * @param {Array} pkgArr
 */
const installPkg = (pkgArr) => {
  const pkgNames = pkgArr.join(" ");
  // 出现加载图标
  const spinner = ora(`Installing ${pkgNames}`);
  spinner.start();
  return execa("npm", ["i", ...pkgArr, "-D"], {
    cwd: rootPath,
  }).then((res) => {
    // 结束加载图标
    spinner.succeed(`Installing ${pkgNames} successfully`);
    console.log(chalk.green(`${res.stdout}`));
  });
};

/**
 * 验证元文件
 */
const validateCommitMsgResource = path.join(
  __dirname,
  `../lib/git/validate-commit-msg.js`
);

console.log(validateCommitMsgResource);
/**
 * 创建的验证文件
 */
const validateCommitMsgPath = `node_modules/git-commit/validate-commit-msg.js`;
/**
 * 创建git commit 验证文件 validate-commit-msg.js
 */
const outputValidateCommitMsgFile = () => {
  fs.outputFileSync(
    `${rootPath}/${validateCommitMsgPath}`,
    fs.readFileSync(validateCommitMsgResource, "utf8"),
    "utf8"
  );
};
/**
 * 输出json文件
 */
const outputJsonFile = (filePath, json) => {
  fs.writeJsonSync(filePath, json, { spaces: 2 });
};
module.exports = async (cmd) => {
  await installPkg([
    "commitizen",
    "cz-conventional-changelog",
    "cz-customizable",
    "husky",
    "chalk",
  ]);

  // 读取package.json,添加配置
  const pkgPath = `${rootPath}/package.json`;
  const pkg = require(pkgPath);
  // 添加commit脚本
  pkg.scripts.commit = "git-cz";
  // changelog 日志配置
  pkg.config || (pkg.config = {});
  pkg.config.commitizen || (pkg.config.commitizen = {});
  pkg.config.commitizen.path = "./node_modules/cz-conventional-changelog";
  // git hooks 配置
  pkg.husky || (pkg.husky = {});
  pkg.husky.hooks || (pkg.husky.hooks = {});
  pkg.husky.hooks["commit-msg"] = `node ${validateCommitMsgPath}`;

  outputValidateCommitMsgFile();
  outputJsonFile(pkgPath, pkg);
};
