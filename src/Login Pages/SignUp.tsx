import { useState, ChangeEvent, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { redirectTo } from "../main";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface SignupInfo {
  username: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password } = signupInfo;

    if (!username || !email || !password) {
      toast.error("UserName, email, and password are required");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.gradeup01.in/api/signup",
        { username, email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { success, message, error } = response.data;

      if (success) {
        toast.success(message || "Signup successful!");
        redirectTo("/");
      } else if (error) {
        const details = error?.details?.[0]?.message || "Signup failed";
        toast.error(details);
      } else {
        toast.error(message || "Something went wrong");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Network error");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 md:p-10 rounded-lg w-full max-w-md shadow-lg">
        <div className="w-full px-2 my-6">
          <img className="w-full h-20  object-cover" src="img/logo.svg" />
        </div>
        {/* <h1 className="text-2xl font-bold mb-5 text-center">Signup</h1> */}
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-lg">
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              autoFocus
              placeholder="Enter your name..."
              value={signupInfo.username}
              className="text-lg py-2 border-b border-black outline-none placeholder:text-sm placeholder:italic"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
              className="text-lg py-2 border-b border-black outline-none placeholder:text-sm placeholder:italic"
            />
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password..."
              value={signupInfo.password}
              className="text-lg py-2 border-b border-black outline-none placeholder:text-sm placeholder:italic pr-10"
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
            className="bg-blue-600 text-white text-lg py-2 px-4 rounded-md hover:bg-blue-800 transition-all"
          >
            Signup
          </button>
          <span className="text-sm text-center">
            Already have an account?{" "}
            <a href="/" className="text-blue-600 hover:underline">
              Login
            </a>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
