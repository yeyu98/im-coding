/*
 * @Author: xiaohu
 * @Date: 2023-11-02 17:18:31
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-11-02 17:21:31
 * @FilePath: \im-coding\src\components\CodeEditor\components\Editor\Editor.tsx
 * @Description:
 */
import React from "react";
import styles from "./Editor.module.less";

interface Props {}

function Editor(props: Props) {
  const {} = props;

  return (
    <>
      <div className={styles["wrapper"]}>
        <textarea value={"I'm a editor."}></textarea>
      </div>
    </>
  );
}

export default Editor;
