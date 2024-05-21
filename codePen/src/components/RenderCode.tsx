import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function RenderCode() {
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );
  console.log(fullCode, "its a fullCode here");
  const combinedCode = `<html><style>${fullCode.css}</style><body>${fullCode.html}</body><script>${fullCode.javascript}</script></html>`;

  const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
    combinedCode
  )}`;

  return (
    <div className="bg-white h-[calc(100vh-60px)] rounded-md">
      <iframe title="myframe" className="w-full h-full" src={iframeCode} />
    </div>
  );
}
