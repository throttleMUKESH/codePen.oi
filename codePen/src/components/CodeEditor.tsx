import ReactCodeMirror from "@uiw/react-codemirror";
import React from "react";

import { tags as t } from "@lezer/highlight";
import { darculaInit } from "@uiw/codemirror-theme-darcula";

import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateCodeValue } from "@/redux/slice/compilerSlice";

const CodeEditor = () => {
  const dispatch = useDispatch();
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );

  const onChange = React.useCallback((val: string) => {
    dispatch(updateCodeValue(val));
  }, []);

  return (
    <ReactCodeMirror
      value={fullCode[currentLanguage].toString()}
      height="calc(100vh - 60px - 50px)"
     
      extensions={[loadLanguage(currentLanguage)!]}
      onChange={onChange}
      theme={darculaInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
        styles: [{ tag: t.comment, color: "#6272a4" }],
      })}
    />
  );
};

export default CodeEditor;
