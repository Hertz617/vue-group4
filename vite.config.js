import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  mounted(){
    this.job()
  },
  methods:{
    job(){
      post("api/copyright/one",{  //这个里面的写路径的后面一部分，前面记得加上/api
        token:"",           
        page: this.page,
        count: this.count,
        type: this.type,
      })
      .then((res) => {
        console.log(res);
      })
      .catch(function (err) {
        console.log("请求失败");
      });
    },
  },

  plugins: [vue(),
  vueJsx(),
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),
],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:'@import "./src/assets/style/main.scss";'
      }
    }
  }
})
