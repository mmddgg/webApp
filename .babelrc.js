module.exports = {
    "presets": ["react", "es2015", "stage-0"],
    "plugins": [
        ["transform-runtime"],
        ["import", {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": "css" // `style: true` 会加载 less 文件
        }],
        ["react-intl",{"messagesDir": "./client/i18n-messages"}],
        ["transform-decorators-legacy"]
        
      ]
};