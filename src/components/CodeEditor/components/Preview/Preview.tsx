/*
 * @Author: xiaohu
 * @Date: 2023-11-02 17:18:49
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-11-03 10:17:43
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
  console.log("更新了", previewUrl);

  return (
    <>
      <div className={styles["wrapper"]}>
        <iframe src={previewUrl}></iframe>
      </div>
    </>
  );
}

export default Preview;
