import { useState, ChangeEvent, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import { redirectTo } from "../main";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface LoginInfo {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return toast.error("Email and password are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      const response = await axios.post(
        "https://api.gradeup01.in/api/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            name: response.data.username,
            email: response.data.email,
          })
        );

        toast.success("Login successful!");
        window.dispatchEvent(new Event("tokenUpdate"));
        redirectTo("/dashboard");
      } else {
        toast.error(response.data.message || "Login failed.");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
        <div className="w-full px-2 my-6">
          <img className="w-full h-20  object-cover" src="img/logo.svg" />
        </div>
        {/* <h1 className="text-3xl font-bold mb-6 text-center">Login</h1> */}
        <form onSubmit={handleLogin}  className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
              onChange={handleChange}
              className="border-b border-black p-2 text-base outline-none placeholder:text-sm placeholder:italic"
            />
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-lg font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password..."
              value={loginInfo.password}
              onChange={handleChange}
              className="border-b border-black p-2 text-base outline-none placeholder:text-sm placeholder:italic"
            />
            
            <div
              className="absolute right-2 bottom-2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="flex justify-center bg-blue-600 text-white font-medium text-lg py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
          <span className="text-sm text-center block">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Signup
            </a>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
