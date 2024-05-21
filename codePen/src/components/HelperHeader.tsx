import { Code, CodeXml, Copy, LoaderCircle, Save, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
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
import { HanldeError } from "@/utils/HandleError";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const HelperHeader = () => {
  
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );
  const handleSaveCode = async () => {
    setSaveLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/compiler/save", {
        fullCode: fullCode,
      });
      console.log(response.data);
      navigate(`/compiler/${response.data.url}`, { replace: true });
    } catch (error) {
      HanldeError(error);
    } finally {
      setSaveLoading(false);
    }
  };
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  const [shareBtn, setShareBtn ] =  useState<boolean>(false);

  const { urlId } = useParams();

  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [urlId]);

  return (
    <div className="__helper_header h-[50px] flex justify-between items-center  bg-black text-white p-2">
      <div className="__btn_container flex gap-1">
        <Button
          onClick={handleSaveCode}
          variant="success"
          className="flex gap-1"
          disabled={saveLoading}
        >
          {saveLoading ? <LoaderCircle className="animate-spin" /> : "save"}
          <Save size={17} />
        </Button>
        {shareBtn && (
          <Dialog>
          <DialogTrigger className="flex gap-1 text-xs font-bold px-3 text-center  rounded-md justify-center items-center hover:bg-zinc-800">
            Share
            <Share2 size={17} />
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
                  <Input type="text" disabled value={window.location.href} />
                  <Copy
                  className="cursor-pointer hover:scale-110 transition-transform "
                  size={25} 
                    onClick={() => {
                      window.navigator.clipboard.writeText(
                        window.location.href
                      );
                      toast("URL Copied to your clipboard!");
                    }}
                  />
                </div>
                <p className="font-medium">
                  Share this URL with your friends to collaborate.
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
