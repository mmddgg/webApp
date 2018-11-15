// 官方规则库 https://cn.eslint.org/docs/rules/
// 其它用户配置说明：
// https://blog.csdn.net/wangongda/article/details/79100010
// https://segmentfault.com/a/1190000004468428
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "jasmine": true,
        "es6": true,
        //"node": true
    },
    "extends": "eslint:recommended", //开启默认规则
    // EsLint默认使用esprima做脚本解析，也可以切换成其它，比如babel-eslint解析
    //"parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true,
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": ["react","promise"],
    //定义全局变量 ,true代表允许重写、false代表不允许重写
    "globals": {
        "document": true,
        "navigator": true,
        "window": true
    },
    "rules": {
        "indent": ["error","tab"],
        "linebreak-style": ["error","unix"],
        "quotes": ["error","double"],
        "semi": ["error","always"],
        "semi-spacing": ["error", {"before": false, "after": true}]
    }
};