import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import {  useLoginMutation } from "@/redux/slice/api";
import { HandleError } from "@/utils/HandleError";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateisLoggedIn } from "@/redux/slice/appSlice";
const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

 const Login = () => {
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
 async function handleLogin(values: z.infer<typeof formSchema>) {
   try{
   
   const response = await login(values).unwrap();
   console.log(response);
   dispatch(updateisLoggedIn(true));
   dispatch(updateCurrentUser(response));
   navigate("/compiler");
   } catch(error){
    HandleError(error)
   }
  }
  return (
    <div className="__login grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-3">
      <h1 className="text-4xl font-bold tracking-wide">Login</h1>
      <div className="__form_container bg-black border-[1px] py-6 px-4 flex flex-col gap-2 min-w-64rounded-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Email or Username" {...field} 
                    required/>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                    disabled={isLoading}
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="my-2"
                      required
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
           
            <Button loading={isLoading} className="w-full" type="submit">
              Login
            </Button>
            <small className="text-xs font-mono flex justify-center font-normal my-2">
              Not on CodePen yet?{" "}
              <Link to="/signup" className="hover:text-sky-400 ">
                Signup
              </Link>
            </small>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default Login;