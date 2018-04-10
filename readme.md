## 基于 jQuery 的路由加载方案

> v2.0.1

### 引入：

```javascript
// script标签引入
<script type="text/javascript" src="./dist/router.js" />;

// es6引入
import * as JQSPA from "tf-jq-spa";
// 或
import { Router } from "tf-jq-spa";
```

### 使用方式：

```javascript
// 路由配置
var Router = new JQSPA.Router({
    // mode: 'history',
    // pathRoot: "demo",
    componentRoot: "demo",
    // isDebug: true,
    jsRoot: "demo"
    // loading: function() {}
    // loaded: function() {}
    // unload: function() {}
});

Router.routes([
    {
        path: "",
        component: "page1.html",
        js: "page1.js",
        title: "测试标题1"
    },

    {
        path: "page2.html",
        js: "page2.js",
        title: "页面2",
        component: "page2.html",
        loaded: function() {
            console.log("page2-----loaded");
            console.log(Router.getQueryStr());
        },
        unload: function() {
            console.log("unload page2");
            return false; // 不能跳转了
        }
    },
    {
        path: /page3\/(.*)/,
        title: "页面33333",
        js: "./page3.js",
        component: "page3.html",
        loaded: function() {
            console.log("page3---", arguments);
            console.log(Router.getQueryStr());
        }
    },

    {
        path: /.*/,
        title: "404",
        component: "404.html",
        loaded: function() {
            console.log("404");
        }
    }
])

    .start("#js_router_view", "#wrapper")

    .beforeJumpTo(function(config) {
        var path = config.path;

        // 如果是page2页面，离开时不能跳转
        if (path && path.indexOf("page2") > -1) {
            // alert('哈哈哈');
            // return false;
        }
    });

// 跳转
setTimeout(function() {
    // Router.jumpTo('http://www.baidu.com')
}, 2000);
```

### API

```javascript
var Router = new JQSPA.Router({
    mode: "history", // 支持history和hash模式
    pathRoot: "demo", // url地址前缀
    componentRoot: "demo", // 加载的页面前缀
    isDebug: true, // 是否开发模式，开发模式时，JS版本会实时刷新
    jsVersion: "", // js版本控制，防止JS缓存
    jsRoot: "demo", // js路径前缀，如果该参数值不为'/'，js路径为：jsRoot + 每个配置项中的js，否则为：相对于当前页面的路径查找
    loading: function() {}, // 所有页面 加载中 都会触发该函数
    loaded: function() {}, // 所有页面 加载完成 都会触发该函数
    unload: function() {} // 所有页面 离开 都会触发该函数
});

Router.refresh(); // 页面刷新
Router.routes(cfg); // 配置路由
Router.jumpTo(path, isFullPage); //路径跳转, isFullPage适用于你要跳过去的页面不是单页面而是一个完整的页面
Router.getQuery(tag); //获取查询参数, tag为true返回一个对象
Router.loading(fn); // 所有的页面加载中都会触发
Router.loaded(fn); // 所有的页面加载完成后都会触发
Router.unload(fn); // 所有的页面离开都会触发
Router.reset(); //重置
Router.remove(path); // 移除一个路由
Router.add(arg); // 添加一个路由
Router.exist(path); // 路由是否已经存在
Router.getPathConfig(path); // 获取路由的相关配置
Router.getCurPath(); // 取得当前路径
Router.onlyPath(); // 只改变路径显示, 而不需要加载页面
Router.start(selector, wrapperSelector); // 开始
Router.beforeJumpTo(); //跳转之前需要的操作，比如销毁弹出层(因为一般弹出层都是直接挂载在body下面)，还可以整体配置什么情况下不跳转(fn()返回false时)
```

### 注意事项

```html
推荐使用mode: 'hash'的方式,
因为history的方式如果是只一种布局, 没有问题; 在不同的布局下跳转稍微有点问题, 而且也需要配置nginx
```

### 测试查看

```html
项目根目录命令行: http-server
打开浏览器: http://127.0.0.1:8080/demo/
```
