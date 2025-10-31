"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, AlertCircle, LogIn } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, resetPassword } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("সকল ফিল্ড পূরণ করুন");
      return;
    }

    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(getErrorMessage(result.error));
    }

    setLoading(false);
  };

  const getErrorMessage = (error) => {
    if (error.includes("user-not-found")) {
      return "এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট নেই";
    } else if (error.includes("wrong-password")) {
      return "ভুল পাসওয়ার্ড";
    } else if (error.includes("invalid-email")) {
      return "অবৈধ ইমেইল ঠিকানা";
    } else if (error.includes("invalid-credential")) {
      return "ইমেইল অথবা পাসওয়ার্ড ভুল";
    }
    return "লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            একাউন্টে লগিন করুন
          </h1>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                ইমেইল
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full pl-11 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="আপনার পাসওয়ার্ড"
                  className="w-full pl-11 pr-11 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={async () => {
                    // Ask user to provide email if empty
                    if (!formData.email) {
                      alert("পাসওয়ার্ড রিসেট ইমেইল পাঠাতে আপনার ইমেইল দিন");
                      return;
                    }
                    const res = await resetPassword(formData.email);
                    if (res.success) {
                      alert(
                        "রিসেট লিঙ্ক আপনার ইমেইলে পাঠানো হয়েছে — ইমেইল চেক করুন।"
                      );
                    } else {
                      alert("রিসেট ইমেইল পাঠাতে সমস্যা: " + res.error);
                    }
                  }}
                  className="text-sm text-red-500 hover:underline"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>অপেক্ষা করুন...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>লগইন করুন</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              নতুন ব্যবহারকারী?{" "}
              <Link
                href="/register"
                className="text-red-500 hover:text-red-400 font-semibold"
              >
                রেজিস্টার করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
