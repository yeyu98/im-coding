/*
 * @Author: xiaohu
 * @Date: 2023-11-03 16:30:11
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-11-03 16:50:32
 * @FilePath: \im-coding\src\components\CodeEditor\components\Terminal\Terminal.tsx
 * @Description:
 */
import { forwardRef, useRef, useImperativeHandle } from "react";
import type { ForwardedRef } from "react";
import styles from "./Terminal.module.less";
interface Props {}

function TerminalComponent(props: Props, ref: ForwardedRef<any>) {
  const terminalDomRef = useRef<HTMLDivElement>(null);
  const {} = props;

  useImperativeHandle(ref, () => ({
    terminalDom: terminalDomRef.current,
  }));

  return (
    <>
      <div ref={terminalDomRef} className={styles["terminal-wrapper"]}></div>
    </>
  );
}

const Terminal = forwardRef(TerminalComponent);

export default Terminal;
