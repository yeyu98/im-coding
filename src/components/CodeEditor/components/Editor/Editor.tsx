/*
 * @Author: xiaohu
 * @Date: 2023-11-02 17:18:31
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-11-02 22:40:06
 * @FilePath: \im-coding\src\components\CodeEditor\components\Editor\Editor.tsx
 * @Description:
 */
import styles from "./Editor.module.less";

interface Props {
  value?: string;
}

function Editor(props: Props) {
  const { value = "I'm a editor." } = props;

  return (
    <>
      <div className={styles["wrapper"]}>
        <textarea value={value} readOnly></textarea>
      </div>
    </>
  );
}

export default Editor;
