/*
 * @Author: xiaohu
 * @Date: 2023-11-03 16:30:11
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-11-04 01:47:57
 * @FilePath: \im-coding\src\components\CodeEditor\components\Terminal\Terminal.tsx
 * @Description:
 */
import { forwardRef, useRef, useImperativeHandle } from "react";
import type { ForwardedRef } from "react";
import styles from "./Terminal.module.less";
interface Props {}
export interface TerminalHandle {
  terminalDom: HTMLDivElement;
}
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

const Terminal = forwardRef<TerminalHandle, Props>(TerminalComponent);

export default Terminal;
