import path from "path";
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx' // 添加这一句

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
}

const config = {
  // publicPath:process.env.NODE_ENV === 'production'?`/admin-plat/`: '/',
  base: 'admin-plat',//在生产中服务时的基本公共路径。@default '/'
  resolve: {
    alias: {
      '/@': pathResolve('./src'),
    },
    // extensions: ['.js', '.vue', '.json', ".scss"],
  },

  plugins: [vue(),vueJsx()],
  outDir: 'dist',//构建输出将放在其中。会在构建之前删除旧目录。@default 'dist'
  minify: 'esbuild',//构建时的压缩方式
  optimizeDeps: { // 引入的第三方配置
    include: [
      'vue',
      'vue-router',
      'element-plus',
      'vuex',
      'axios',
      'echarts'
    ]
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
  },
  server: {
    hostname: 'localhost',//本地启动的服务地址
    port: 8800,//服务端口号
    open: false,//启动服务时是否在浏览器打开
    https: false,//是否开启https
    ssr: false,//是否服务端渲染
    proxy: {//代理配置
      '/api': {
        target: 'http://47.101.59.21:8080/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
  
}
module.exports = config;