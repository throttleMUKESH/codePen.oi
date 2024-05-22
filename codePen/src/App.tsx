import "./App.css";

import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Compiler from "./Pages/Compiler";
import NotFound from "./Pages/NotFound";
import { ThemeProvider } from "@/components/theme-provider";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/compiler/:urlId" element={<Compiler />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
