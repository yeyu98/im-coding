import { useEffect, useRef } from "react";
import Editor from "./components/Editor/Editor";
import Preview from "./components/Preview/Preview";
import { WebContainer } from "@webcontainer/api";
import styles from "./CodeEditor.module.less";

interface Props {}

function CodeEditor(props: Props) {
  const webcontainerInstance = useRef<InstanceType<typeof WebContainer>>();
  const {} = props;

  const init = async () => {
    webcontainerInstance.current = await WebContainer.boot();
  };

  const setFileToEditor = () => {};

  const mainProcess = () => {
    init();
    setFileToEditor();
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
          <Editor />
          <Preview previewUrl={""} />
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
