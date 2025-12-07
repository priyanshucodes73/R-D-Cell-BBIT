import { useState } from "react";
import Link from "next/link";
import { FaUser, FaLock, FaEnvelope, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

export default function Login() {
  const [userType, setUserType] = useState("student"); // 'student' or 'faculty'
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { userType, isLogin, formData });
    alert(`${isLogin ? "Login" : "Signup"} successful for ${userType}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4 py-12">
      {/* Back to Home */}
      <Link href="/">
        <button className="fixed top-6 left-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 border border-white/30 flex items-center gap-2 z-50">
          ← Back to Home
        </button>
      </Link>

      <div className="max-w-5xl w-full">
        {/* Main Container */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Side - User Type Selection */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Welcome to BBIT</h1>
                <p className="text-blue-100 text-lg">
                  Select your role to continue
                </p>
              </div>

              {/* User Type Cards */}
              <div className="space-y-4">
                {/* Professional Student Login */}
                <button
                  onClick={() => setUserType("student")}
                  className={`w-full p-6 rounded-2xl transition-all duration-300 text-left ${
                    userType === "student"
                      ? "bg-white text-blue-900 shadow-xl scale-105"
                      : "bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        userType === "student"
                          ? "bg-blue-600 text-white"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      <FaUserGraduate className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        Professional Student
                      </h3>
                      <p
                        className={`text-sm ${
                          userType === "student"
                            ? "text-blue-700"
                            : "text-blue-100"
                        }`}
                      >
                        Access student portal & resources
                      </p>
                    </div>
                  </div>
                </button>

                {/* Faculty Login */}
                <button
                  onClick={() => setUserType("faculty")}
                  className={`w-full p-6 rounded-2xl transition-all duration-300 text-left ${
                    userType === "faculty"
                      ? "bg-white text-blue-900 shadow-xl scale-105"
                      : "bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        userType === "faculty"
                          ? "bg-green-600 text-white"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      <FaChalkboardTeacher className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Faculty</h3>
                      <p
                        className={`text-sm ${
                          userType === "faculty"
                            ? "text-green-700"
                            : "text-blue-100"
                        }`}
                      >
                        Access faculty dashboard & tools
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Features List */}
              <div className="mt-12 space-y-3">
                <div className="flex items-center gap-3 text-blue-100">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Secure Authentication</span>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>24/7 Access to Resources</span>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Real-time Updates</span>
                </div>
              </div>
            </div>

            {/* Right Side - Login/Signup Form */}
            <div className="p-12 bg-white">
              {/* Toggle Login/Signup */}
              <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isLogin
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    !isLogin
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {isLogin ? "Welcome Back!" : "Create Account"}
                </h2>
                <p className="text-gray-600">
                  {isLogin
                    ? `Login to your ${
                        userType === "student" ? "student" : "faculty"
                      } account`
                    : `Sign up as a ${
                        userType === "student" ? "professional student" : "faculty member"
                      }`}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name (only for signup) */}
                {!isLogin && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder={`${
                        userType === "student" ? "student@bbit.edu.in" : "faculty@bbit.edu.in"
                      }`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                {/* Confirm Password (only for signup) */}
                {!isLogin && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                )}

                {/* Remember Me & Forgot Password (only for login) */}
                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">
                        Remember me
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Forgot Password?
                    </a>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {isLogin ? "Login Now" : "Create Account"}
                </button>
              </form>

              {/* Divider */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Social Login */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300">
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700 font-semibold">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300">
                  <img
                    src="https://www.microsoft.com/favicon.ico"
                    alt="Microsoft"
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700 font-semibold">
                    Microsoft
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8">
          <p className="text-white/80">
            By continuing, you agree to BBIT's{" "}
            <a href="#" className="text-yellow-400 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-yellow-400 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
