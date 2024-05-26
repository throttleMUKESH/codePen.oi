import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loading";


// import Home from "./Pages/Home";
// import { Signup } from "./Pages/Signup";
// import Compiler from "./Pages/Compiler";
// import NotFound from "./Pages/NotFound";

const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const AllCodes = lazy(() => import("./Pages/AllCodes"));
const MyCode = lazy(() => import("./Pages/MyCode"));
const Compiler = lazy(() => import("./Pages/Compiler"));
const NotFound = lazy(() => import("./Pages/NotFound"));

export const AllRoutes = () => {
  return (
    <Suspense fallback={<div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center"><Loader/></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/all-codes" element={<AllCodes />} />
        <Route path="/my-codes" element={<MyCode />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/compiler/:urlId" element={<Compiler />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
