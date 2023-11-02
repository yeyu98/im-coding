/*
 * @Author: xiaohu
 * @Date: 2023-11-02 10:04:00
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-11-02 16:03:33
 * @FilePath: \im-coding\src\components\WebContainer\WebContainer.tsx
 * @Description:
 */
import { useEffect, useRef } from "react";
import { WebContainer as WebContainerClass } from "@webcontainer/api";
import "./WebContainer.less";

interface Props {}

function WebContainer(props: Props) {
  const {} = props;
  const webcontainerInstance = useRef<InstanceType<typeof WebContainerClass>>();

  const createWebContainerInstance = async () => {
    console.log("createWebContainerInstance");
    webcontainerInstance.current = await WebContainerClass.boot();
  };

  const loadFile = async () => {
    /** @type {import('@webcontainer/api').FileSystemTree} */

    const files = {
      "package.json": {
        file: {
          contents: `
        {
          "name": "vite-starter",
          "private": true,
          "version": "0.0.0",
          "type": "module",
          "scripts": {
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview"
          },
          "devDependencies": {
            "vite": "^4.0.4"
          }
        }`,
        },
      },
    };

    await webcontainerInstance.current?.mount(files);
    const currentFile = await webcontainerInstance.current?.fs.readFile("/package.json", "utf-8");
    console.log("🚀 ~ file: WebContainer.tsx:51 ~ loadFile ~ currentFile--->>>", currentFile);
  };

  const startDevServer = async () => {
    console.log("startDevServer");
    const installProcess = await webcontainerInstance.current?.spawn("npm", ["install"]);
    // 检测进程运行状态是否退出
    const installExitCode = await installProcess?.exit;
    console.log("🚀🚀🚀 ~ file: WebContainer.tsx:20 ~ startDevServer ~ installExitCode--->>>", installExitCode);

    if (installExitCode != 0) {
      throw new Error("Unable to run npm install");
    }
    await webcontainerInstance.current?.spawn("npm", ["run", "dev"]);
  };

  useEffect(() => {
    createWebContainerInstance();
    loadFile();
    startDevServer();
  }, []);

  return (
    <>
      <div className="web-container-wrapper">
        <h3>im-coding</h3>
      </div>
    </>
  );
}

export default WebContainer;
