/*
 * @Author: xiaohu
 * @Date: 2023-11-02 17:18:49
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-11-02 17:25:40
 * @FilePath: \im-coding\src\components\CodeEditor\components\Preview\Preview.tsx
 * @Description:
 */
import React from "react";
import styles from "./Preview.module.less";

interface Props {
  previewUrl: string;
}

function Preview(props: Props) {
  const { previewUrl = "" } = props;

  return (
    <>
      <div className={styles["wrapper"]}>
        <iframe src={previewUrl}></iframe>
      </div>
    </>
  );
}

export default Preview;
