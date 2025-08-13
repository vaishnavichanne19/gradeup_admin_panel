// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import "swiper/swiper-bundle.css";
// import "flatpickr/dist/flatpickr.css";
// import App from "./App.tsx";
// import { AppWrapper } from "./components/common/PageMeta.tsx";
// import { ThemeProvider } from "./context/ThemeContext.tsx";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <ThemeProvider>
//       <AppWrapper>
//         <App />
//       </AppWrapper>
//     </ThemeProvider>
//   </StrictMode>,
// );



import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

import "./index.css";
import Login from "./Login Pages/Login";
import Signup from "./Login Pages/SignUp";

// Custom hook to track current pathname
function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return pathname;
}

// Helper function for redirect
export function redirectTo(path: string) {
   setTimeout(() => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, 10);
}

// Main wrapper for routing control
function AppWrapper() {
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("tokenUpdate", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("tokenUpdate", handleStorageChange);
    };
  }, []);


 const publicPaths = ["/", "/signup"];
  const privatePaths = [
    "/dashboard", "/banner", "/banner-add", "/banner-edit",
    "/calendar", "/blog", "/contact-table", "/blank",
    "/form-elements", "/line-chart", "/bar-chart"
  ];

  // ✅ If not logged in and accessing private route, redirect to login
  if (!token && privatePaths.includes(pathname)) {
     if (!redirecting) {
      setRedirecting(true);
      redirectTo("/");
    }
    return null;
  }

  // ✅ If logged in and accessing login or signup, redirect to home
  if (token && publicPaths.includes(pathname)) {
    if (!redirecting) {
      setRedirecting(true);
      redirectTo("/dashboard");
    }
    return null;
  }

   if (redirecting) {
    setRedirecting(false);
    return null;
  }

  if (pathname === "/") return <Login />;
  if (pathname === "/signup") return <Signup />;
  return token ? <App /> : <Login />;
}

// Mounting
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <HelmetProvider>
        <ThemeProvider>
          <AppWrapper />
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>
  );
}




