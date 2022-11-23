import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  head: [
    [
      'script', {type: 'text/javascript', src: '/js/jquery.js?v1.0.0', async: true}
    ],
    [
        'script', {type: 'text/javascript', src: '/service.js?v1.0.3', defer: true}
    ]
],
  theme: hopeTheme({
    lang: "en-US",
    title: "EnxMail",
    description: "Lightweight end-to-end encrypted email system for geeks.",
    iconAssets: "iconfont",
    displayFooter: true,
    footer: "Copyright (C) 2022 FANGTANG Network Technology.",
    navbar: ["/guide/README.md"]
  }),
});