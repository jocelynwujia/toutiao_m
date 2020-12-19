module.exports = {
    // 配置要使用的postcss插件
    plugins: {
      // 配置要使用的postcss插件，作用：自动添加浏览器相关的声明前缀
      //但是vue-cli内部已经配置了autoprefixer，再配置就冲突了
      // 'autoprefixer': {
      //   browsers: ['Android >= 4.0', 'iOS >= 8']
      // },
      // 配置postcss-pxtorem插件：把px转换成rem
      'postcss-pxtorem': {
        rootValue ({ file }) {
          // file要编译样式的路径
          // lib-flexible的REM适配方案：把一行分为10分，每份就是十分之一，但是vant是基于375写的，通常设计稿是750，量的尺寸就需要/2,以下配置方便量多少写多少
          // 查阅文档，rootValue支持两种类型: 
          // 数字：固定的数值
          // 函数：可以动态处理返回
          // postcss-pxtorem处理每个CSS文件的时候都会来调用，
          // 它会处理css相关信息通过参数传递给该函数
          return file.indexOf('vant') !== -1 ? 37.5 : 75
        },
        // 配置要转换的css属性
        // *表示所有
        propList: ['*'],

        // 配置不要转换的样式资源
        exclude:'github-markdown'
      }
    }
  }