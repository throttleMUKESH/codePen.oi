import {
  Code,
  CodeXml,
  Copy,
  Download,
  LoaderCircle,
  Pencil,
  Save,
  Share2,
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useDispatch, useSelector } from "react-redux";
import {
  compilerSliceStateType,
  updateCurrentLanguage,
} from "@/redux/slice/compilerSlice";
import { RootState } from "@/redux/store";
import { HandleError } from "@/utils/HandleError";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEditCodeMutation, useSaveCodeMutation } from "@/redux/slice/api";

const HelperHeader = () => {
  const isOwner = useSelector(
    (state: RootState) => state.compilerSlice.isOwner
  );
  const [postTitle, setPostTitle] = useState<string>("My Code");
  const dispatch = useDispatch();

  const [shareBtn, setShareBtn] = useState<boolean>(false);

  const { urlId } = useParams();

  const navigate = useNavigate();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const [saveCode, { isLoading }] = useSaveCodeMutation();
  const [editCode, {isLoading: codeEditLoading}] = useEditCodeMutation() 
  const handleSaveCode = async () => {
    const body = { fullCode: fullCode, title: postTitle };
    try {
      const response = await saveCode(body).unwrap();
      console.log(response);
      navigate(`/compiler/${response.url}`, { replace: true });
    } catch (error) {
      HandleError(error);
    }
  };

  const handleEditCode = async () => {
    try {
      if (urlId) {
      const response = await editCode({ fullCode, id: urlId! }).unwrap();
      console.log(response)
        toast("Code updated successfully");
      }
    } catch (error) {
      HandleError(error);
    }
  };

  const handleDownloadCode = () => {
    if (
      fullCode.html === "" &&
      fullCode.css === "" &&
      fullCode.javascript === ""
    ) {
      toast("Error: Code is Empty");
    } else {
      const htmlCode = new Blob([String(fullCode.html)], { type: "text/html" });
      const cssCode = new Blob([String(fullCode.css)], { type: "text/css" });
      const javascriptCode = new Blob([String(fullCode.javascript)], {
        type: "text/javascript",
      });

      const htmlLink = document.createElement("a");
      const cssLink = document.createElement("a");
      const javascriptLink = document.createElement("a");

      htmlLink.href = URL.createObjectURL(htmlCode);
      htmlLink.download = "index.html";
      document.body.appendChild(htmlLink);

      cssLink.href = URL.createObjectURL(cssCode);
      cssLink.download = "style.css";
      document.body.appendChild(cssLink);

      javascriptLink.href = URL.createObjectURL(javascriptCode);
      javascriptLink.download = "script.js";
      document.body.appendChild(javascriptLink);

      if (fullCode.html !== "") {
        htmlLink.click();
      }
      if (fullCode.css !== "") {
        cssLink.click();
      }
      if (fullCode.javascript !== "") {
        javascriptLink.click();
      }

      document.body.removeChild(htmlLink);
      document.body.removeChild(cssLink);
      document.body.removeChild(javascriptLink);

      toast("Code Downloaded Successfully!");
    }
  };

  useEffect(() => {
    setShareBtn(!!urlId);
  }, [urlId]);

  return (
    <div className="__helper_header h-[50px] flex justify-between items-center bg-black text-white p-2">
      <div className="__btn_container flex gap-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="success"
              className="flex gap-1"
              disabled={isLoading}
            >
              {isLoading && <LoaderCircle className="animate-spin" />}
              <Save size={17} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex gap-2 justify-center items-center tracking-normal">
                <Code />
                Share your code!
                <CodeXml />
              </DialogTitle>
              <DialogDescription className="flex flex-col gap-2 justify-center items-center tracking-normal">
                <div className="flex gap-1 justify-between items-center">
                  <Input
                    type="text"
                    placeholder="Type your Post Title"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                  />
                  <Button
                    variant={"success"}
                    className="h-full text-white"
                    onClick={handleSaveCode}
                  >
                    Save
                  </Button>
                </div>
                <p className="font-medium">
                  Share this URL with your friends to collaborate.
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button onClick={handleDownloadCode} size="icon" variant="secondary">
          <Download size={16} />
        </Button>
      

        {shareBtn && (
          <>
            {isOwner && (
              <>
                <Button
                  size={"icon"}
                  loading={codeEditLoading}
                  onClick={handleEditCode}
                  variant={"secondary"}
                >
                  <Pencil size={15} />
                  
                </Button>
              </>
            )}
             <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="secondary">
                  <Share2 size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex gap-1 justify-center items-center">
                    <Code />
                    Share your Code!
                  </DialogTitle>
                  <div className="__url flex justify-center items-center gap-1">
                    <Input
                      type="text"
                      disabled
                      className="w-full p-2 rounded bg-slate-800 text-slate-400 select-none"
                      value={window.location.href}
                    />
                    <Button
                      variant="outline"
                      className="h-full"
                      onClick={() => {
                        window.navigator.clipboard.writeText(
                          window.location.href
                        );
                        toast("URL Copied to your clipboard!");
                      }}
                    >
                      <Copy size={14} />
                    </Button>
                  </div>
                  <p className="text-center text-slate-400 text-xs">
                    Share this URL with your friends to collaborate.
                  </p>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
      <div className="__tab_switcher flex justify-center items-center gap-1">
        Language:
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(
              updateCurrentLanguage(
                value as compilerSliceStateType["currentLanguage"]
              )
            )
          }
        >
          <SelectTrigger className="w-[80px] bg-gray-700 outline-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">Javascript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HelperHeader;
