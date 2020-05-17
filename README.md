# fzuvote

> a vote mp based on mpvue

*Tips：编译时需要使用开发者工具v1.02.1910120（或之前）版本，否则创建问卷时会出现无法输入的情况。*  
*Tips2： mpvue基本已经不再维护，后面微信有对常用语法做出改动，使用新版开发者工具应当无法编译。*

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
