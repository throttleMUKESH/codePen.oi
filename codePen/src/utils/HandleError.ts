import { toast } from "sonner";


export const HandleError =async (error:any) => {
    console.log(error.data.message);
    toast("Error" + error.data.message)
}
