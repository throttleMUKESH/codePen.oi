import "./App.css";

import Header from "./components/Header";

import { ThemeProvider } from "@/components/theme-provider";

import { Toaster } from "sonner";
import { useGetUserDetailsQuery } from "./redux/slice/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateisLoggedIn } from "./redux/slice/appSlice";
import { AllRoutes } from "./AllRoutes";

function App() {
  const { data, error } = useGetUserDetailsQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(updateCurrentUser(data));
      dispatch(updateisLoggedIn(true));
    } else if (error) {
      dispatch(updateCurrentUser({}));
      dispatch(updateisLoggedIn(false));
    }
  }, [data, error]);
  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <AllRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
