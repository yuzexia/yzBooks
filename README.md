# mpvue-demo

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 本地开放环境的搭建

- 本地安装mysql
- 指南https://clud.tencent.com/document/product/619/11442
- https://console.cloud.tencent.com/capi
- https://console.cloud.tencent.com/developer 获取密钥和appid


### eslint

```
/* eslint-disable */
```

#### mpvue如何处理bindgetuserinfo？

(mpvue如何处理bindgetuserinfo)[https://segmentfault.com/q/1010000015082874]

#### mpvue配置pages页面下的*.json文件

> 必须起与该目录下的启动js同名的json文件名，才能被`mpvue-loader(1.1.2)`正确的编译

```
├─books
│      Book.vue
│      main.js
│      main.json
│
├─comments
│      Comment.vue
│      main.json
│      main.js
│
└─me
        main.js
        main.json
        Me.vue
```

#### 小程序页面跳转无响应问题

- 你要跳转的是tabBar中的页面，需要用到专属的跳转方法switchtab
- 在app.js中没有配置该页面
- 页面层级是不是超过五层了。可以用销毁的跳转方式

#### 获取openid

[参考地址1](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#wxchecksessionobject)
[参考地址2](https://www.cnblogs.com/cai-rd/p/6816849.html)
