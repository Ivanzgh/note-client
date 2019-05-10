<template>
  <div class="about">
    <el-card class="w1170">
      <!--左手键盘安天下，右手鼠标定乾坤-->
      <div class="header">关于博主</div>
      <div class="web-des">
        <div class="web-des-title">网站简介</div>
        <div class="web-des-content">我的个人技术博客地址，不定期更新有价值的内容</div>
        <img src="@/assets/news_bg.jpg" alt="">
      </div>
      <div class="active-community">
        <div class="active-community-title">活跃社区</div>
        <ul>
          <li>
            <a href="https://github.com/Ivanzgh" target="_blank">github</a>
          </li>
          <li>
            <a href="https://segmentfault.com/u/zhivan" target="_blank">segmentfault</a>
          </li>
          <li>
            <a href="https://juejin.im/user/5b66ec18e51d4535c75652fd" target="_blank">掘金</a>
          </li>
          <li>
            <a href="https://www.cnblogs.com/zghivan" target="_blank">博客园</a>
          </li>
          <li>
            <a href="https://blog.csdn.net/zh1500043930" target="_blank">CSDN</a>
          </li>
        </ul>
      </div>
      <div class="technology-stack">
        <div class="technology-stack-title">技术栈</div>
        <div class="technology-stack-content">
          <ul>
            <li>熟练掌握 DIV+CSS 网页布局，深刻理解 HTML5 标签语义化，可以根据设计稿快速转化为页面。</li>
            <li>熟悉 HTML5、CSS3 新特性及 ES6 语法。</li>
            <li>熟练掌握原生 JavaScript 技术，能够熟练使用 JS 和 jQuery 库实现页面交互效果。</li>
            <li>熟练使用 Vue.js 前端框架以及 Vuex 状态存储，具备丰富的项目开发实战经验。</li>
            <li>熟练运用 Element-UI、Vant 和 Mint-UI 等 UI 库，能迅速使用 UI 组件来构建页面。</li>
            <li>熟悉 react.js，了解 redux 状态管理，熟练运用 Ant Design 等 UI 库。</li>
            <li>熟悉响应式布局和弹性布局，能够有效解决移动端适配问题。</li>
            <li>熟悉 node.js，能够运用 express 框架开发一些简单的后台接口。</li>
            <li>熟悉 MongoDB 数据库，可以熟练使用 mongoose 对数据库进行操作。</li>
            <li>熟悉微信小程序，能独立完成简单的微信小程序的开发工作。</li>
            <li>熟练使用 webpack 前端环境构建工具，熟悉 Git 等源代码管理工具。</li>
            <li>对浏览器兼容性、代码可维护性、前端性能优化和跨域问题有一定的了解。</li>
          </ul>
        </div>
      </div>
      <div class="desc">
        <div class="desc-title">自我评价</div>
        <ul>
          <li>能够尽快熟悉业务，快速融入团队。</li>
          <li>具有良好的代码风格，善于写代码注释和技术文档。</li>
          <li>具有前端工程化、模块化、组件化经验。</li>
          <li>具有良好的业务能力和团队协作精神。</li>
          <li>具备良好的沟通能力，独立并积极主动，责任感强。</li>
          <li>工作认真细致，有责任心，具有一定的抗压能力。</li>
          <li>逻辑思维能力强，积极主动学习新技术，能够阅读英文文档。</li>
        </ul>
      </div>
      <div class="myemail">
        <div class="myemail-title">联系我</div>
        <div>
          <span>邮箱：</span>
          <span>1972571253@qq.com</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .about {
    margin-top: 66px;
  }
  .header {
    font-size: 30px;
    font-weight: 700;
    color: #333;
    text-align: center;
  }

  .web-des {
    margin-bottom: 20px;
    .web-des-title {
      font-size: 22px;
      margin-bottom: 20px;
    }
    .web-des-content {
      margin-bottom: 20px;
    }
    img {
      width: 700px;
      height: 300px;
    }
  }
  .active-community {
    .active-community-title {
      font-size: 22px;
      margin-bottom: 20px;
    }
  }
  .active-community {
    li {
      height: 30px;
      font-size: 18px;
    }
    a {
      text-decoration: none;
      color: #409eff;
    }
  }

  .technology-stack {
    .technology-stack-title {
      font-size: 22px;
      margin-bottom: 20px;
    }
    li {
      height: 30px;
      font-size: 18px;
    }
  }

  .myemail  {
    .myemail-title {
      font-size: 22px;
      margin-bottom: 20px;
    }
    li {
      height: 30px;
      font-size: 18px;
    }
  }
  .desc  {
    .desc-title {
      font-size: 22px;
      margin-bottom: 20px;
    }
    li {
      height: 30px;
      font-size: 18px;
    }
  }
</style>
