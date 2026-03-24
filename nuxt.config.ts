// https://nuxt.com/docs/api/configuration/nuxt-config
import { codeInspectorPlugin } from "code-inspector-plugin";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxtjs/tailwindcss", "shadcn-nuxt"],

  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "Ui",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
  app: {
    head: {
      title: "音乐播放器 - 在线音乐欣赏平台",
      htmlAttrs: {
        lang: "zh-CN",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "一个现代化的在线音乐播放器，支持海量音乐在线播放，提供流畅的音乐体验",
        },
        { name: "keywords", content: "音乐播放器,在线音乐,音乐欣赏,音乐平台" },
        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:title", content: "音乐播放器 - 在线音乐欣赏平台" },
        {
          property: "og:description",
          content: "一个现代化的在线音乐播放器，支持海量音乐在线播放",
        },
        { property: "og:site_name", content: "音乐播放器" },
        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "音乐播放器 - 在线音乐欣赏平台" },
        {
          name: "twitter:description",
          content: "一个现代化的在线音乐播放器，支持海量音乐在线播放",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  vite: {
    plugins: [codeInspectorPlugin({ bundler: "vite" })],
  },
});
