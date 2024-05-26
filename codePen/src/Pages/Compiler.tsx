import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/RenderCode";


import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { updateFullCode, updateIsOwner } from "@/redux/slice/compilerSlice";
import { HandleError } from "@/utils/HandleError";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import { useLoadCodeMutation } from "@/redux/slice/api";
import Loader from "@/components/Loader/Loading";

const Compiler = () => {
  const [loadExistingCode, { isLoading }] = useLoadCodeMutation();
  const dispatch = useDispatch();
  const { urlId } = useParams();
  const loadCode = async () => {
    try {
      if (urlId) {
        const response = await loadExistingCode({ urlId }).unwrap();

        dispatch(updateFullCode(response.fullCode));
        dispatch(updateIsOwner(response.isOwner));
      }
    } catch (error) {
      HandleError(error);
    }
  };

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId]);

  if(isLoading) {
    return (
      <div className="w-full  mt-96 flex justify-center items-center">
        <Loader/>
      </div>
    )
  }
  return (
    <ResizablePanelGroup direction="horizontal" >
      <ResizablePanel className="h-[calc(100dvh-60px)] sm:full md:min-w-[150px]">
        <HelperHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="h-[calc(100dvh-60px)] sm:full  md:min-w-[150px]">
        <RenderCode/>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Compiler;
