import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  resolve: {
    alias: {
      fs: require.resolve('rollup-pligin-node-builtins'),
      // http: require.resolve('rollup-plugin-node-builtins'),
      // util: require.resolve('rollup-plugin-node-builtins'),
      // stream: require.resolve('rollup-plugin-node-builtins'),
      // buffer: require.resolve('rollup-plugin-node-builtins'),
      // process: require.resolve('rollup-plugin-node-builtins'),
      // url: require.resolve('rollup-plugin-node-builtins'),
      // querystring: require.resolve('rollup-plugin-node-builtins'),
    },
  },
  plugins: [react()],
  css: {
   postcss: {
    plugins: [tailwindcss()],
   },
  },
});