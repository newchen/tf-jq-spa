var Router = new JQSPA.Router({
    // mode: "history",
    // pathRoot: "demo",
    componentRoot: "demo",
    // isDebug: true,
    jsRoot: "demo"
});

Router.routes([
    {
        path: "",
        component: "page1.html",
        // js: "page1.js",
        title: "测试标题1"
    },
    {
        path: "page2.html",
        js: "page2.js",
        title: "页面2",
        component: "page2.html",
        loaded: function() {
            console.log("page2-----loaded");
            console.log(Router.getQuery());
        },
        unload: function() {
            console.log("unload page2");
            // return false; // 不能跳转了
        }
    },
    {
        path: /page3\/(.*)/,
        title: "页面33333",
        js: "./page3.js",
        component: "page3.html",
        loaded: function() {
            console.log("page3---loaded", arguments);
            console.log(Router.getQuery());
        },
        unload: function() {
            console.log("unload page3");
        }
    },
    {
        path: "a.html",
        js: "a/a.js",
        title: "a页面",
        component: "a/a.html",
        loaded: function() {
            console.log("a-----loaded");
        },
        unload: function() {
            console.log("unload a");
        }
    }

    // {
    //     path: /.*/,
    //     title: "404",
    //     component: "404.html",
    //     loaded: function() {
    //         console.log("404");
    //     }
    // }
]).start("#js_router_view", "#wrapper");

// .beforeJumpTo(function(config) {
//     // 可能是字符串或者正则, 所以toString
//     var path = config.path.toString();

//     // 如果是page2页面，离开时不能跳转
//     if (path && path.indexOf("page2") > -1) {
//         alert("哈哈哈");
//         return false;
//     }
// });

setTimeout(function() {
    // Router.jumpTo('http://www.baidu.com')
}, 2000);
