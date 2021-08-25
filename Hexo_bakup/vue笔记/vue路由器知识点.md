## 1. 起步
#### vue路由是为了什么
   - 为了单页面应用，切换不同的组件进行渲染展示
   - 前后端没有分离的时候，比如thinkphp，django这些后端框架做的web，切换功能时基本都是， 每个url请求一次后端服务器数据，然后浏览器渲染页面
   - vue 既然是单页面，每个功能切换都只变动需要渲染的组件，这样避免一些相同的模块重新渲染。
   - vue的多页面，实际就是写多个vue单页面应用，来回切换入口，就是不同的应用。
   
   
#### vue路由器怎么访问
   - 在每个组件都可以用this.$router 访问整个路由器对象
   - 在每个组件内可以用this.$route 访问当前路由对象

## 2. 动态路由匹配
   - this.$route.params 参数是动态路由的参数，比如 /user/:username/post/:post_id 
  ```json
  {username:'xxxxx', post_id:'bbbb'}
  ```
   - this.$route.query 是url问号后面的k=v, 也是json对象
   - 可以用watch监视$route对象的变化，比如变化了执行某个方法，刷新数据； 因为是同一个组件，只是参数变化，vue不会重新渲染
   - 也可以用路由守卫 beforeRouteUpdate监视路由变化
   - 其他高级操作.....
   
## 3. 嵌套路由
```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```
   - 同一个user下面的profile组件和post组件， 需要children字段，里面类似路由（path和component）
  
## 4. 编程式的导航（a标签）
   - 1. 一般我们都用route-link :to 的 方式定义a标签跳转
   - 2. 也可以用定义一个click事件, 事件触发时 执行this.$router.push("/login") 这就是向histrory栈加入一条链接记录，push相当于点击a标签链接。
   - 2.2.0+ 以后才有this.$router.push方法。
   - this.$router.replace 类似push方法，是替换当前history记录，不是追加
   - router.go(1) 前进一步
   - router.go(-1) 后退一步
   - router.go(3) 前进三步
   - router.go(100) 记录不够，就默默失败
  
## 5. 命名路由
   - 
   