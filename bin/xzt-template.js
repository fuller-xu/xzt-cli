const inquirer = require("inquirer");
inquirer.registerPrompt(
  "autocomplete",
  require("inquirer-autocomplete-prompt")
);
const fs = require("fs-extra");
const path = require("path");
const { resources, resourceNames } = require("../lib/template/resources");
const chalk = require("chalk");
chalk.level = Math.max(chalk.level, 1);
const ora = require("ora");
const download = require("download-git-repo");
const Spinners = require("../lib/spinner/spinners.json");

// 操作流程
const operationFlow = [
  {
    type: "autocomplete",
    name: "template",
    message: "选择一个框架模板",

    source: function (answersSoFar, input) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(resourceNames.filter((o) => !!~o.indexOf(input)));
        }, 300);
      });
    },
  },
  {
    type: "input",
    name: "name",
    message: "请输入创建项目名称",
    transformer: function (content) {
      return chalk.red.underline(content);
    },
    validate(val) {
      if (val === "") {
        return "Name is required!";
      }
      return true;
    },
  },
  {
    type: "confirm",
    name: "confirm",
    message: "确认下载选中的模板吗？",
  },
];
module.exports = async () => {
  const { template, name, confirm } = await inquirer.prompt(operationFlow);
  if (!confirm) return;
  const currentRoot = path.resolve(process.cwd(), name);
  // 如果文件夹已存在，

  if (fs.existsSync(currentRoot)) {
    const { action } = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: `${chalk.cyan(name)}项目目录已存在，请选择操作:`,
        choices: [
          { name: "覆盖", value: "overwrite" },
          { name: "取消", value: false },
        ],
      },
    ]);
    if (!action) return;
    if (action === "overwrite") {
      const spinner = ora(`清理项目目录 ${chalk.cyan(currentRoot)}...`);
      spinner.start();
      // 先删除文件
      await fs.remove(currentRoot);
      spinner.succeed("清理旧目录成功");
    }
  }
  // 下载模板
  const url = resources.find((o) => o.name === template).link;
  // console.log("\n下载地址：" + url);
  // 出现加载图标
  const spinner = ora({
    text: chalk.bold.greenBright(`${template} 正在下载...`),
    spinner: Spinners.shark,
  });
  spinner.start();
  // http https 下载方式
  download("direct:" + url, name, { clone: true }, (err) => {
    if (err) {
      spinner.fail();
      console.log(chalk.red(`下载失败。 ${err}`));
      return;
    }
    // 结束加载图标
    spinner.succeed(chalk.green(`恭喜您！模板下载成功。`));
    console.log(`\n    cd ${name} \n`);
  });
};
