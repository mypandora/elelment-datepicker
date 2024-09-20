import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import vueJsx from "@vitejs/plugin-vue2-jsx";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-preset-jsx
    }),
  ],
  build: {
    lib: {
      // 入口文件路径
      entry: "./lib/index.js", // 你封装的组件入口
      name: "ElementDatePicker", // 库名称
      fileName: "element-datepicker", // 输出的文件名称
    },
    rollupOptions: {
      // 指定外部依赖，防止打包进库中
      external: ["vue", "element-ui"],
      output: {
        // 为 UMD 构建模式下提供全局变量名称
        globals: {
          vue: "Vue",
          "element-ui": "ELEMENT", // element-ui 在 UMD 模式下的全局变量名
        },
      },
    },
  },
  // resolve: {
  //   alias: [
  //     {
  //       find: "vue",
  //       replacement: "vue/dist/vue.runtime.esm.js",
  //     },
  //   ],
  // },
});
