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
