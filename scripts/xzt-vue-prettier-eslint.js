const { copyFile } = require("../utils/fs/file");
const { installOrUninstallPkg } = require("../utils/package/npm-install");
const path = require("path");
const fs = require("fs-extra");

const moduleTitle = "prettier + eslint环境";

/**
 * eslint 相关包
 */
const eslintPkgArr = [
  "eslint",
  "babel-eslint",
  "vue-eslint-parser@5.0.0",
  "eslint-plugin-vue",
  "eslint-config-alloy",
];

/**
 * prettier 相关包
 */
const prettierPkgArr = [
  "prettier",
  "prettier-eslint-cli",
  "eslint-plugin-prettier",
  "eslint-config-prettier",
];

/**
 * 其他 相关依赖包
 */
const otherPkgArr = [
  "babel-plugin-import",
  "eslint-loader",
  "eslint-plugin-html",
  "eslint-plugin-import",
];
const eslintName = ".eslintrc.js";

const prettierName = ".prettierrc.js";

const install = async () => {
  // 1. 安装依赖
  await installOrUninstallPkg(
    {
      pkg: [...eslintPkgArr, ...prettierPkgArr, ...otherPkgArr],
      title: moduleTitle,
    },
    "install"
  );
  // 创建 '.eslintrc.js' 文件
  const rootPath = process.cwd();
  copyFile(
    path.resolve(__dirname, "../lib/eslint/vue-eslint.js"),
    path.resolve(rootPath, eslintName)
  );
  // 创建 '.prettierrc.js' 文件
  copyFile(
    path.resolve(__dirname, "../lib/prettier/vue-prettier.js"),
    path.resolve(rootPath, prettierName)
  );
};

const uninstall = async () => {
  const rootPath = process.cwd();
  // 1. 删除依赖
  await installOrUninstallPkg(
    {
      pkg: [...eslintPkgArr, ...prettierPkgArr, ...otherPkgArr],
      title: moduleTitle,
    },
    "uninstall"
  );
  // 删除 .eslintrc.js 文件
  await fs.remove(path.resolve(rootPath, eslintName));
  // 删除 .prettierrc.js 文件
  await fs.remove(path.resolve(rootPath, prettierName));
};

module.exports = {
  install,
  uninstall,
};
