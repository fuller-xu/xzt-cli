const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs-extra");
const ora = require("ora");
const execa = require("execa");
const path = require("path");
const rootPath = process.cwd();

/**
 * 安装需要的依赖
 */
const devDependencies = [
  "commitizen",
  "cz-conventional-changelog",
  "cz-customizable",
  "conventional-changelog-cli",
  "husky",
  "chalk",
];

/**
 * 读取package.json,添加配置
 */
const pkgPath = `${rootPath}/package.json`;
/**
 * 安装所需依赖
 * @param {Array} pkgArr
 * @param {String} operation 操作类型install/uninstall
 */
const installOrUninstallPkg = (pkgArr, operation) => {
  const pkgNames = pkgArr.join(" ");
  // 出现加载图标
  const spinner = ora(`${operation}ing ${pkgNames}`);
  spinner.start();
  return execa("npm", [operation, ...pkgArr, "-D"], {
    cwd: rootPath,
  }).then((res) => {
    // 结束加载图标
    spinner.succeed(`${operation}ing ${pkgNames} successfully`);
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
/**
 * 安装
 */
const install = async () => {
  await installOrUninstallPkg(devDependencies, "install");

  const pkg = require(pkgPath);
  // 添加commit脚本
  pkg.scripts.commit = "git-cz";
  // 添加自动生成changelog脚本
  // 只会在头部增加变动
  pkg.scripts.changelog =
    "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md";
  // 生成所有的变动
  pkg.scripts["changelog-all"] =
    "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md";

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

/**
 * 卸载
 */
const uninstall = async () => {
  const pkg = require(pkgPath);
  // 删除相关的脚本
  delete pkg.scripts.commit;
  delete pkg.scripts.changelog;
  delete pkg.scripts["changelog-all"];
  // 删除相关的日志配置
  delete pkg.config.commitizen;
  // 删除hooks配置
  delete pkg.husky;
  // 更新package.json
  outputJsonFile(pkgPath, pkg);
  // 删除依赖
  await installOrUninstallPkg(devDependencies, "uninstall");
};
module.exports = { install, uninstall };
