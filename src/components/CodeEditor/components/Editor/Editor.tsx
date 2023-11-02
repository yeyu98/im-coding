/*
 * @Author: xiaohu
 * @Date: 2023-11-02 17:18:31
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-11-03 00:22:38
 * @FilePath: \im-coding\src\components\CodeEditor\components\Editor\Editor.tsx
 * @Description:
 */
import { ChangeEvent } from "react";
import styles from "./Editor.module.less";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

function Editor(props: Props) {
  const { value = "I'm a editor.", onChange = () => {} } = props;

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <div className={styles["wrapper"]}>
        <textarea value={value} onChange={handleTextAreaChange}></textarea>
      </div>
    </>
  );
}

export default Editor;
