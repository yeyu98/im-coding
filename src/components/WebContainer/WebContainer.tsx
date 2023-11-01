import { useEffect } from "react";
import { WebContainer as WebContainerClass } from "@webcontainer/api";
import "./WebContainer.less";

interface Props {}

function WebContainer(props: Props) {
  const {} = props;

  const createWebContainerInstance = async () => {
    const webContainerInstance = await WebContainerClass.boot();
    console.log(
      "🚀🚀🚀 ~ file: WebContainer.tsx:12 ~ createWebContainerInstance ~ webContainerInstance--->>>",
      webContainerInstance,
    );
  };

  useEffect(() => {
    createWebContainerInstance();
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
