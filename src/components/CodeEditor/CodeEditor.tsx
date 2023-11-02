/*
 * @Author: lzy-Jerry
 * @Date: 2023-11-02 21:59:30
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-11-02 23:12:22
 * @Description:
 */
import { useEffect, useRef, useState } from "react";
import Editor from "./components/Editor/Editor";
import Preview from "./components/Preview/Preview";
import { WebContainer } from "@webcontainer/api";
import { files } from "./files";
import { ProcessStatus } from "@/constants";
import styles from "./CodeEditor.module.less";

interface Props {}
const editorContent = files["index.js"].file.contents;
function CodeEditor(props: Props) {
  const webcontainerInstance = useRef<InstanceType<typeof WebContainer>>();
  const {} = props;

  const init = async () => {
    webcontainerInstance.current = await WebContainer.boot();
    console.log("init");
  };

  const setFileToEditor = async () => {
    // 加载文件
    await webcontainerInstance.current?.mount(files);
    const packageJson = await webcontainerInstance.current?.fs.readFile("package.json", "utf-8");
    console.log("🚀🚀🚀 ~ file: CodeEditor.tsx:29 ~ setFileToEditor ~ packageJson--->>>", packageJson);
  };

  const installDependence = async () => {
    // NOTE 执行命令 npm install 也可以是pnpm yarn
    const installProcess = await webcontainerInstance.current?.spawn("npm", ["install"]);

    // NOTE 获取命令行输出流进度
    installProcess?.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data);
        },
      }),
    );

    const exitCode = await installProcess?.exit;
    console.log("🚀🚀🚀 ~ file: CodeEditor.tsx:37 ~ installDependence ~ exitCode--->>>", exitCode);
    // NOTE exit 为0时表示执行成功
    if (exitCode !== ProcessStatus.Success) {
      throw new Error("install error!");
    }
  };

  const mainProcess = async () => {
    await init();
    await setFileToEditor();
    await installDependence();
  };

  useEffect(() => {
    window.addEventListener("load", mainProcess);
    return () => {
      window.removeEventListener("load", mainProcess);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles["container"]}>
        <h3>即时coding</h3>
        <div className={styles["content"]}>
          <Editor value={editorContent} />
          <Preview previewUrl={""} />
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
