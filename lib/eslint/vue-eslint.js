module.exports = {
  plugins: ["vue", "prettier"],
  // eslint 基础配置
  // extends: [
  //   "eslint/recommended",
  //   "plugin:vue/essential",
  //   "plugin:prettier/recommended",
  // ],
  // 腾讯前端团队Alloy推荐配置
  extends: [
    "alloy",
    "alloy/vue",
    "plugin:vue/essential",
    "plugin:prettier/recommended",
  ],
  rules: {
    "vue/component-tags-order": 0,
    "vue/no-duplicate-attributes": [
      "error",
      {
        allowCoexistClass: true,
        allowCoexistStyle: true,
      },
    ],
  },
};
