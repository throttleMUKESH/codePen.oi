import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/RenderCode";

import { toast } from "sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { updateFullCode } from "@/redux/slice/compilerSlice";
import { HanldeError } from "@/utils/HandleError";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";


const Compiler = () => {
  const dispatch = useDispatch()
const {urlId} = useParams();
const loadCode = async () => {
  try {
       const response = await axios.post("http://localhost:4000/compiler/load", {
        urlId: urlId
       })
      
     dispatch(updateFullCode(response.data.fullCode))
  } catch(error) {
    if(axios.isAxiosError(error)) {
      if(error?.response?.status === 500) {
        toast("Invalid URL, Default Code Loaded")
      }
    }
    HanldeError(error)
  }
}

useEffect(() => {
  if(urlId) {
   loadCode();
  }
}, [urlId])
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="h-[calc(100vh-60px)] min-w-[350px]">
        <HelperHeader/>
        <CodeEditor/>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="h-[calc(100vh-60px)]  min-w-[350px]">
        <RenderCode/>
      </ResizablePanel>
    </ResizablePanelGroup>
     
  );
};

export default Compiler;
