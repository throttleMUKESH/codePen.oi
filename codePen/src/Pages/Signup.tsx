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
import { useSignupMutation } from "@/redux/slice/api";
import { HandleError } from "@/utils/HandleError";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateisLoggedIn } from "@/redux/slice/appSlice";
const formSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

 const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

const [signup, {isLoading}] = useSignupMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
 async function handleSignup(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
       const response = await signup(values).unwrap();
       
       dispatch(updateCurrentUser(response));
       dispatch(updateisLoggedIn(true));
       navigate("/login")
    } catch (error) {
      HandleError(error)
    }
  }
  return (
    <div className="__login grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-3">
      <h1 className="text-4xl font-bold tracking-wide">Signup</h1>
      <div className="__form_container bg-black border-[1px] py-6 px-4 flex flex-col gap-2 min-w-64 rounded-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignup)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Username" {...field}/>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isLoading} type="email" placeholder="Email" {...field}  className="my-2" />
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
                    <Input type="password" placeholder="Password" {...field} className="my-2" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button disabled={isLoading} className="w-full" type="submit">
              Signup
            </Button>
            <small className="text-xs font-mono flex justify-center font-normal my-2">
                Already have an account? <Link to="/login" className="hover:text-sky-400">Login</Link>
              </small>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signup;