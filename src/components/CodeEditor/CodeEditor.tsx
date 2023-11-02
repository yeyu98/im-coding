/*
 * @Author: lzy-Jerry
 * @Date: 2023-11-02 21:59:30
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-11-03 00:31:59
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
  const [serverUrl, setServerUrl] = useState<string>("");
  const [editorText, setEditorText] = useState<string>(editorContent);
  // const [terminalOutput, setTerminalOutput] = useState<string>("");
  const {} = props;

  const init = async () => {
    webcontainerInstance.current = await WebContainer.boot();
    console.log("~~ init ~~");
  };

  const loadFiles = async () => {
    // 加载文件
    await webcontainerInstance.current?.mount(files);
    const packageJson = await webcontainerInstance.current?.fs.readFile("package.json", "utf-8");
    console.log("🚀🚀🚀 ~ file: CodeEditor.tsx:29 ~ loadFiles ~ packageJson--->>>", packageJson);
  };

  const installDependence = async () => {
    // NOTE 执行命令 npm install 也可以是pnpm yarn
    const installProcess = await webcontainerInstance.current?.spawn("npm", ["install"]);

    // NOTE 获取命令行输出流进度
    installProcess?.output.pipeTo(
      new WritableStream({
        write(data) {
          // const terminalOutputStr = `${terminalOutput}${data}`;
          console.log(data);
          // setTerminalOutput(terminalOutputStr);
        },
      }),
    );

    const exitCode = await installProcess?.exit;
    console.log("🚀🚀🚀 ~ file: CodeEditor.tsx:37 ~ installDependence ~ exitCode--->>>", exitCode);
    // NOTE exit 为0时表示执行成功
    if (exitCode !== ProcessStatus.Success) {
      throw new Error("install error!");
    } else {
      console.log("~~ npm install success ~~");
    }
  };

  const startDevServer = async () => {
    // NOTE 启动服务
    // 执行npm run start
    // 监听server-ready
    // 把启动后的地址放到iframe里面
    await webcontainerInstance.current?.spawn("npm", ["run", "start"]);
    webcontainerInstance.current?.on("server-ready", (port: number, url: string) => {
      console.log("~~ 服务启动成功 ~~");
      console.log("✨✨✨ ~ webcontainerInstance.current?.on ~ port--->>>", port);
      setServerUrl(url);
    });
  };

  const editFileContent = async (content: string) => {
    await webcontainerInstance.current?.fs.writeFile("/index.js", content);
  };

  const handleEditorChange = async (value: string) => {
    setEditorText(value);
    await editFileContent(value);
  };

  const mainProcess = async () => {
    await init();
    await loadFiles();
    await installDependence();
    await startDevServer();
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
        {/* <div dangerouslySetInnerHTML={{ __html: terminalOutput }}></div> */}
        <div className={styles["content"]}>
          <Editor value={editorText} onChange={handleEditorChange} />
          <Preview previewUrl={serverUrl} />
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
