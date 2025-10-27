"use client";

import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export default function Quote() {
  return (
    <section className="bg-black text-white py-16 px-6 flex justify-center items-center">
      <div className="max-w-3xl text-center relative">
        <FaQuoteLeft className="text-red-600 text-4xl absolute -top-4 left-0 opacity-40" />
        <blockquote className="text-2xl sm:text-3xl font-semibold leading-relaxed text-gray-200 italic">
          আমি বিশ্বাস করি — <br />
          <span className="text-gray-300">যদি উদ্দেশ্য বড় হয়,</span> <br />
          <span className="text-red-500 font-bold">
            পরিশ্রম কখনো বৃথা যায় না।
          </span>
          <br />
          <span className="text-yellow-500">ইনশাআল্লাহ, আমি সফল হবই।</span>
        </blockquote>
        <FaQuoteRight className="text-red-600 text-4xl absolute -bottom-4 right-0 opacity-40" />

        <div className="mt-8 text-lg text-gray-400 font-medium">
          — Abdus Samad
        </div>
      </div>
    </section>
  );
}
