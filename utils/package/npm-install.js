const execa = require("execa");
const ora = require("ora");
const chalk = require("chalk");
const path = require("path");
const Spinners = require("../../lib/spinner/spinners.json");

/**
 * 转换中文描述
 * @param operation i | install | uninstall
 * @param title 相关依赖包名称
 * @returns {string}
 */
const transformChinese = (operation, title = "") => {
  let installDesc = "";
  switch (operation) {
    case "i":
    case "install":
      installDesc = "安装";
      break;
    case "uninstall":
      installDesc = "卸载";
      break;
  }
  return {
    startDesc: `正在${installDesc + title}，请耐心等待...`,
    endDesc:
      chalk.bgGreen.white(`Successfully! `) +
      `\n\n  ${title + installDesc}成功！\n`,
  };
};

/**
 * 安装所需依赖
 * @param {Object} config 安装、卸载基础配置
 * @param {Array} config.pkg 依赖包
 * @param {String} config.title 相关依赖的title
 * @param {String} operation 操作类型install/uninstall
 * @param {Object} options npm/yarn 参数
 * @param {String} options.name npm 默认使用npm安装
 * @param {String} options.env -D  默认安装到开发环境
 *
 */
const installOrUninstallPkg = async (config, operation, options = null) => {
  const { pkg: pkgArr, title } = config || {};
  const { name, env } = options || { name: "npm", env: "-D" };
  const pkgNames = pkgArr.join(", ");
  console.log(options, operation, pkgNames);
  // 出现加载图标
  // ：${pkgNames}
  const { startDesc, endDesc } = transformChinese(operation, title);
  const spinner = ora({
    text: startDesc,
    spinner: Spinners.bouncingBall,
  });
  spinner.start();
  await execa(name, [operation, ...pkgArr, env], {
    cwd: process.cwd(),
  })
    .then((res) => {
      // 结束加载图标
      spinner.succeed(endDesc);
      console.log(chalk.green(`${res.stdout}`));
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  installOrUninstallPkg,
  transformChinese,
};
