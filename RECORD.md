<!--
 * @Author: lzy-Jerry
 * @Date: 2023-11-02 00:29:53
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-11-02 22:07:37
 * @Description:
-->

# 问题记录

- 通过additionalData导入的less和main.tsx引入的index.less谁的优先级更高呢？
- 使用import 导入 path模块中的东西ts找不到对应模块？

  - pnpm install @types/node --save-dev

- 什么是shareArray，为什么使用它需要开启跨域隔离？
- 配置跨域隔离之后打开浏览器出现 net::ERR_CACHE_READ_FAILURE，但开启无痕模式之后有可以正常访问？？

  - 猜测是某些文件的缓存有关系
  - 看了一些<a href="https://github.com/MicrosoftEdge/WebView2Feedback/issues/2457">issue</a>，里面有提到通常会发生在chrome&edge浏览器里面，可能是因为杀毒软件在不知情的情况下清除了缓存导致的；
  - 目前不太确定是联想电脑管家清除的还是微软电脑管家；
  - 时好时坏 需要重启一下命令开发的时候 暂时依然无法定位到问题

- WritableStream

# web container

- 安装webcontainer
- 创建webcontainer实例（实例在项目中有且仅有一个）
- 配置跨域隔离（因为webcontainer使用了shareArray需要启动跨域隔离才能使用）
  - 在vite中配置server的响应头 COOP跨源开放者政策/COEP跨源嵌入程序策略；
    - Cross-Origin-Embedder-Policy: require-corp
    - Cross-Origin-Opener-Policy: same-origin
  - 为了安全考虑webcontainer只能运行在localhost & https之下；
- 在webcontainer中通过mount加载文件 TODO 关于文件系统的后续补充
- 设置命令以及运行一些进程启动devServer（这里需要基于上一步的文件系统）
  - 这里主要实现的是npm install & npm run dev
