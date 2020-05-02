const fs = require("fs-extra");

/**
 * 复制文件内容
 * @param {String} originPath
 * @param {String} targetPath
 */
const copyFile = (originPath, targetPath) => {
  fs.outputFileSync(targetPath, fs.readFileSync(originPath, "utf8"), "utf8");
};

module.exports = {
  copyFile,
};
