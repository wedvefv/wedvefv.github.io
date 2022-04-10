(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{488:function(s,t,a){"use strict";a.r(t);var r=a(56),e=Object(r.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"_1-起步"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-起步"}},[s._v("#")]),s._v(" 1. 起步")]),s._v(" "),a("h4",{attrs:{id:"vue路由是为了什么"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue路由是为了什么"}},[s._v("#")]),s._v(" vue路由是为了什么")]),s._v(" "),a("ul",[a("li",[s._v("为了单页面应用，切换不同的组件进行渲染展示")]),s._v(" "),a("li",[s._v("前后端没有分离的时候，比如thinkphp，django这些后端框架做的web，切换功能时基本都是， 每个url请求一次后端服务器数据，然后浏览器渲染页面")]),s._v(" "),a("li",[s._v("vue 既然是单页面，每个功能切换都只变动需要渲染的组件，这样避免一些相同的模块重新渲染。")]),s._v(" "),a("li",[s._v("vue的多页面，实际就是写多个vue单页面应用，来回切换入口，就是不同的应用。")])]),s._v(" "),a("h4",{attrs:{id:"vue路由器怎么访问"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue路由器怎么访问"}},[s._v("#")]),s._v(" vue路由器怎么访问")]),s._v(" "),a("ul",[a("li",[s._v("在每个组件都可以用this.$router 访问整个路由器对象")]),s._v(" "),a("li",[s._v("在每个组件内可以用this.$route 访问当前路由对象")])]),s._v(" "),a("h2",{attrs:{id:"_2-动态路由匹配"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-动态路由匹配"}},[s._v("#")]),s._v(" 2. 动态路由匹配")]),s._v(" "),a("ul",[a("li",[s._v("this.$route.params 参数是动态路由的参数，比如 /user/:username/post/:post_id")])]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("username"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("'xxxxx'"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" post_id"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("'bbbb'"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ul",[a("li",[s._v("this.$route.query 是url问号后面的k=v, 也是json对象")]),s._v(" "),a("li",[s._v("可以用watch监视$route对象的变化，比如变化了执行某个方法，刷新数据； 因为是同一个组件，只是参数变化，vue不会重新渲染")]),s._v(" "),a("li",[s._v("也可以用路由守卫 beforeRouteUpdate监视路由变化")]),s._v(" "),a("li",[s._v("其他高级操作.....")])]),s._v(" "),a("h2",{attrs:{id:"_3-嵌套路由"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-嵌套路由"}},[s._v("#")]),s._v(" 3. 嵌套路由")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" router "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("VueRouter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("routes")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("path")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/user/:id'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("component")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" User"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("children")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 当 /user/:id/profile 匹配成功，")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// UserProfile 会被渲染在 User 的 <router-view> 中")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("path")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'profile'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("component")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" UserProfile\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 当 /user/:id/posts 匹配成功")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// UserPosts 会被渲染在 User 的 <router-view> 中")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("path")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'posts'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("component")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" UserPosts\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br")])]),a("ul",[a("li",[s._v("同一个user下面的profile组件和post组件， 需要children字段，里面类似路由（path和component）")])]),s._v(" "),a("h2",{attrs:{id:"_4-编程式的导航-a标签"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-编程式的导航-a标签"}},[s._v("#")]),s._v(" 4. 编程式的导航（a标签）")]),s._v(" "),a("ul",[a("li",[a("ol",[a("li",[s._v("一般我们都用route-link :to 的 方式定义a标签跳转")])])]),s._v(" "),a("li",[a("ol",{attrs:{start:"2"}},[a("li",[s._v('也可以用定义一个click事件, 事件触发时 执行this.$router.push("/login") 这就是向histrory栈加入一条链接记录，push相当于点击a标签链接。')])])]),s._v(" "),a("li",[s._v("2.2.0+ 以后才有this.$router.push方法。")]),s._v(" "),a("li",[s._v("this.$router.replace 类似push方法，是替换当前history记录，不是追加")]),s._v(" "),a("li",[s._v("router.go(1) 前进一步")]),s._v(" "),a("li",[s._v("router.go(-1) 后退一步")]),s._v(" "),a("li",[s._v("router.go(3) 前进三步")]),s._v(" "),a("li",[s._v("router.go(100) 记录不够，就默默失败")])]),s._v(" "),a("h2",{attrs:{id:"_5-命名路由"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-命名路由"}},[s._v("#")]),s._v(" 5. 命名路由")]),s._v(" "),a("ul",[a("li")])])}),[],!1,null,null,null);t.default=e.exports}}]);