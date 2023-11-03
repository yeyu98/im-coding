/*
 * @Author: lzy-Jerry
 * @Date: 2023-11-02 21:59:30
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-11-04 02:04:42
 * @Description:
 */
import { useEffect, useRef, useState } from "react";
import Editor from "./components/Editor/Editor";
import Preview from "./components/Preview/Preview";
import Terminal from "./components/Terminal/Terminal";
import { WebContainer } from "@webcontainer/api";
import type { WebContainerProcess } from "@webcontainer/api";
import { Terminal as TerminalClass } from "xterm";
import { files } from "./files";
import { ProcessStatus } from "@/constants";
import type { TerminalHandle } from "./components/Terminal/Terminal";
import styles from "./CodeEditor.module.less";

interface Props {}
type TerminalType = InstanceType<typeof TerminalClass>;
const editorContent = files["index.js"].file.contents;
function CodeEditor(props: Props) {
  const webcontainerInstance = useRef<InstanceType<typeof WebContainer>>();
  const [serverUrl, setServerUrl] = useState<string>("");
  const [editorText, setEditorText] = useState<string>(editorContent);
  const terminalRef = useRef<TerminalHandle>(null);
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

  const installDependence = async (terminal: TerminalType) => {
    // NOTE 执行命令 npm install 也可以是pnpm yarn
    const installProcess = await webcontainerInstance.current?.spawn("npm", ["install"]);

    // NOTE 获取命令行输出流进度
    installProcess?.output.pipeTo(
      new WritableStream({
        write(data) {
          // const terminalOutputStr = `${terminalOutput}${data}`;
          terminal.write(data);
          // console.log(data);
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

  const listenServer = () => {
    webcontainerInstance.current?.on("server-ready", (port: number, url: string) => {
      console.log("~~ 服务启动成功 ~~");
      console.log("✨✨✨ ~ webcontainerInstance.current?.on ~ port--->>>", port);
      // NOTE iframe 有缓存策略当加载的src不变即使内容改变了依然会走缓存
      setServerUrl(`${url}?timestamp=${Date.now()}`);
    });
  };

  const startDevServer = async (terminal: TerminalType) => {
    // NOTE 启动服务
    // 执行npm run start
    // 监听server-ready
    // 把启动后的地址放到iframe里面
    const devServerProcess = await webcontainerInstance.current?.spawn("npm", ["run", "start"]);
    devServerProcess?.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      }),
    );
  };

  const editFileContent = async (content: string) => {
    await webcontainerInstance.current?.fs.writeFile("/index.js", content);
  };

  const handleEditorChange = async (value: string) => {
    setEditorText(value);
    await editFileContent(value);
  };

  const createTerminal = () => {
    const terminal = new TerminalClass({
      convertEol: true,
    });
    terminal.open(terminalRef.current!.terminalDom!);
    return terminal;
  };

  const startShell = async (terminal: TerminalType) => {
    // jsh：一个带有 WebContainer API 的开箱即用的自定义 shell 命令集合
    const shellProcess = await webcontainerInstance.current?.spawn("jsh");
    shellProcess?.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      }),
    );

    // TODO 这一段略微有点不太理解啥意思
    const input = shellProcess?.input.getWriter();
    terminal.onData((data) => {
      input?.write(data);
    });
  };

  const mainProcess = async () => {
    const terminal = createTerminal();
    await init();
    await loadFiles();
    listenServer();
    await startShell(terminal);
    // await installDependence(terminal);
    // await startDevServer(terminal);
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
          <Terminal ref={terminalRef} />
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
