"use client";
import { CheckCircle, Clock, ArrowRight, Gift, Star } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  Calendar,
  Video,
  Clock3,
  Film,
  ChevronDown,
} from "lucide-react";

// Button Component
const PrimaryCTA = ({
  children,
  href = "#enroll",
  className = "",
  icon = ArrowRight,
}) => {
  const Icon = icon;
  return (
    <a
      href={href}
      className={`bg-white hover:bg-gray-300 text-black font-bold px-8 py-4 rounded-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${className}`}
    >
      <span>{children}</span>
      <Icon className="w-5 h-5" />
    </a>
  );
};

const SecondaryCTA = ({
  children,
  href = "#enroll",
  className = "",
  icon = ArrowRight,
}) => {
  const Icon = icon;
  return (
    <a
      href={href}
      className={`bg-black hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${className}`}
    >
      <span>{children}</span>
      <Icon className="w-5 h-5" />
    </a>
  );
};

// Time Display Box for Countdown
const TimeBox = ({ label, value }) => (
  <div className="bg-gray-900 text-white rounded-md p-4 sm:p-6">
    <div className="text-4xl sm:text-5xl font-extrabold mb-1">{value}</div>
    <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest">
      {label}
    </div>
  </div>
);

// Benefit Item (used in the final section)
const IconBenefit = ({ children }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-md p-4 sm:p-6 hover:border-red-600 transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className="bg-red-600 rounded-full p-2 sm:p-3 shrink-0">
        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <span className="text-lg text-white leading-snug">{children}</span>
    </div>
  </div>
);

// Course Module Row
const ModuleRow = ({ title, value, isTotal }) => (
  <div
    className={`flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 transition-colors ${
      isTotal
        ? "bg-red-600 text-white font-bold text-lg sm:text-xl"
        : "border-b border-gray-200 hover:bg-gray-50"
    }`}
  >
    <span className={isTotal ? "text-lg sm:text-xl" : "text-base sm:text-lg"}>
      {title}
    </span>
    <span
      className={`font-bold ${isTotal ? "text-xl sm:text-2xl" : "text-base sm:text-xl"}`}
    >
      {isTotal ? "= " : "Value= "}
      {value}
    </span>
  </div>
);

// --- Hook for Countdown Logic ---
const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState(
    targetDate.getTime() - new Date().getTime()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate.getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
  };
};

const formatTime = (time) => String(time).padStart(2, "0");

const faqs = [
  {
    q: "ভাইয়া, এই কোর্সটি রেকর্ডিং না লাইভ?",
    a: "১০০% লাইভ কোর্স ভাইয়া I প্রতিটি ক্লাস লাইভে আমি নিজে নিব ",
  },
  {
    q: "ভাইয়া ক্লাস শেষে কি রেকর্ডিং ভিডিও দেওয়া হবে?",
    a: "ক্লাস শেষ করার এক ঘন্টার মধ্যে রেকর্ডিং ভিডিও দেওয়া হবে ইনশা আল্লাহ I",
  },
  {
    q: "ক্লাস শেষে কি প্রশ্ন করার সুযোগ থাকবে ভাইয়া?",
    a: "হ্যাঁ ভাইয়া, আপনার একটি প্রশ্ন আমি রেখে আমি ক্লাস শেষ করব না I",
  },
  {
    q: "ভাইয়া কোর্স শেষ করার পর কি সাপোর্ট পাবো?",
    a: "হ্যাঁ ভাইয়া কোর্স শেষ পরে, প্রতি শুক্রবার একটা করে লাইভ ক্লাস নেওয়া হবে ইনশা আল্লাহ I",
  },
];

// --- MAIN COMPONENT ---

export default function LiveCourse() {
  const targetDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 10);
    date.setHours(23, 59, 59, 999);
    return date;
  }, []);

  const timeLeft = useCountdown(targetDate);

  const courseModules = [
    // ... (data remains the same)
    { title: "Discover the winning Mindset", value: "1000 TK" },
    { title: "Google Ads PPC Campaign", value: "3000 TK" },
    { title: "Fiverr Masterclass", value: "3000 TK" },
    { title: "Google Merchant Center", value: "3000 TK" },
    { title: "Google Shopping Campaign", value: "1000 TK" },
    { title: "Google Pmax Campaign", value: "1000 TK" },
    { title: "Display and YouTube Ads", value: "1000 TK" },
    { title: "Out of Marketplace Masterclass", value: "2000 TK" },
    { title: "Google Ads Live Project", value: "2000 TK" },
    { title: "Client Communication Masterclass", value: "2000 TK" },
    { title: "Full Value", value: "20,000 TK", isTotal: true },
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* 1. Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Profile/Badge Area */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              {/* Image Border with subtle pulse effect */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-500 shadow-xl shadow-yellow-500/50"></div>
              <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-2 border-2 border-black">
                <Star className="w-5 h-5 text-black fill-black" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-6 leading-tight">
            <span className="text-white">
              ৯৫% মানুষ সফল ফ্রিল্যান্সার হওয়ার চেষ্টা করে
            </span>
            <br />
            <span className="text-red-600">কিন্তু সফল হতে পারে না !!</span>
          </h1>

          {/* Subtitle / Callout */}
          <p className="text-center text-xl md:text-2xl text-gray-300 mb-6 font-medium">
            আমার বিগত ৫ বছরের ফ্রিল্যান্সিংএর অভিজ্ঞতা থেকে আপনার জন্য সাজিয়েছি
          </p>

          {/* Course Title Badge - Cleaned up classes */}
          <div className="flex justify-center mb-10">
            <div className="bg-red-700 text-white px-8 py-3 rounded-md text-xl sm:text-3xl font-extrabold shadow-2xl">
              Total Freelancing Package Live Course
            </div>
          </div>

          {/* CTA Buttons - Using reusable component */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryCTA className="text-lg sm:text-xl">
              সম্পূর্ণ কোর্স মডিউল দেখুন
            </PrimaryCTA>
          </div>
        </div>
      </section>

      {/* 2. Why Section (Problem Statement) */}
      <section
        id="problem"
        className="bg-gray-100 text-black py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto">
          {/* Header Bar */}
          <div className="bg-red-700 text-white inline-block px-6 py-3 rounded-t-md font-bold text-xl sm:text-2xl leading-snug mb-0 shadow-lg">
            আপনিও কি ফ্রিল্যান্সিং এর
            <br />এ অবস্থায় আছেন?
          </div>

          <div className="bg-white rounded-b-md rounded-tr-md p-6 sm:p-8 shadow-xl">
            <ul className="space-y-4">
              {/* Added consistent red icon and better spacing */}
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <span className="text-lg text-gray-800">
                  একজন সঠিক মেন্টরের গাইডলাইনের অভাবে ভুগছেন?
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <span className="text-lg text-gray-800">
                  মনে অনেক প্রশ্ন থাকে কিন্তু উত্তর খুঁজে পান না?
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <span className="text-lg text-gray-800">
                  ফ্রিল্যান্সিং টা আসলে কিভাবে শিখবেন , কোন স্কিল দিয়ে শুরু
                  করবেন বুঝতে পারছেন না?
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <span className="text-lg text-gray-800">
                  নিজে নিজে চেষ্টা করছেন কিন্তু বেশি দূর এগোতে পারছেন না?
                </span>
              </li>
            </ul>

            <div className="mt-8 text-center">
              <SecondaryCTA>আমার পরামর্শ গ্রহণ করুন</SecondaryCTA>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Success Rate Section (The dramatic callout) */}
      <section className="bg-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-lg mb-2">এটা কেবল আপনার না</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="text-white">বাংলাদেশের প্রায়</span>
          </h2>
          <div className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-red-600 mb-4 animate-pulse">
            ৯৯%
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
            নতুন ফ্রিল্যান্সারদের গল্প
          </p>
          <PrimaryCTA className="text-xl sm:text-2xl px-12 py-5">
            Get The Solution
          </PrimaryCTA>
        </div>
      </section>

      {/* 4. Course Modules Section (Value breakdown) */}
      <section className="bg-linear-to-b from-gray-900 to-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="border-4 border-red-800 rounded-md p-6 sm:p-8 bg-black/50 backdrop-blur-sm shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="bg-red-600 text-white inline-block px-6 sm:px-8 py-3 rounded-md text-xl sm:text-2xl font-extrabold mb-6 shadow-xl">
                এক পেমেন্টে পাচ্ছেন ১০টি সম্পূর্ণ কোর্স
              </div>
            </div>

            {/* Modules List - Using ModuleRow component */}
            <div className="bg-white text-black rounded-md overflow-hidden shadow-2xl mb-8">
              {courseModules.map((module, index) => (
                <ModuleRow key={index} {...module} />
              ))}
            </div>

            {/* Pricing Callout */}
            <div className="text-center mb-6">
              <p className="text-gray-300 text-lg mb-2">
                এই প্যাকেজের সর্বমোট মূল্য:{" "}
                <span className="line-through text-red-500 font-bold">
                  ২০,০০০ টাকা!
                </span>
              </p>
              <p className="text-gray-300 text-lg mb-4">
                কিন্তু প্রমোশনাল অফারে আপনি পাচ্ছেন বিশাল ছাড়।
              </p>

              <div className="text-5xl sm:text-6xl font-extrabold text-yellow-500 my-6">
                মাত্র ৩,০০০ টাকা!
              </div>

              <PrimaryCTA className="text-xl sm:text-2xl px-12 py-5">
                <span>এখনই আপনার সিট নিশ্চিত করুন</span>
              </PrimaryCTA>

              <p className="text-gray-400 text-sm mt-3 font-semibold">
                (সরাসরি পেমেন্টের জন্য নিচের নম্বরগুলো দেখুন)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Countdown Timer Section */}
      <section className="bg-white text-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Schedule and Deadline */}
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-10 border-b pb-6 border-gray-300">
            <div className="mb-6 sm:mb-0 sm:text-left">
              <h3 className="text-xl sm:text-2xl font-extrabold mb-2 flex items-center gap-2">
                <Clock className="w-6 h-6 text-red-600" />
                কোর্স টাইম:
              </h3>
              <p className="text-lg font-bold text-gray-800">
                রাত ১০ টা ৩০ মিনিটে
              </p>
              <p className="text-lg text-gray-600">প্রতি শনি এবং বুধবারে</p>
            </div>
            <div className="text-center sm:text-right">
              <h3 className="text-xl sm:text-2xl font-extrabold mb-2 text-red-600">
                ডেডলাইন:
              </h3>
              <div className="text-5xl sm:text-6xl font-extrabold text-red-600">
                {targetDate.toLocaleString("bn-BD", {
                  day: "numeric",
                  month: "long",
                })}
              </div>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-red-700 mb-6">
            অফারটি শেষ হতে আর বাকি!
          </h3>

          {/* Countdown Grid - Using TimeBox component */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-10">
            <TimeBox label="দিন" value={formatTime(timeLeft.days)} />
            <TimeBox label="ঘন্টা" value={formatTime(timeLeft.hours)} />
            <TimeBox label="মিনিট" value={formatTime(timeLeft.minutes)} />
            <TimeBox label="সেকেন্ড" value={formatTime(timeLeft.seconds)} />
          </div>

          <PrimaryCTA className="text-xl sm:text-2xl px-10 py-5">
            Grab The Chance
          </PrimaryCTA>
        </div>
      </section>

      {/* Course Summary Section */}
      <section className="py-16 px-4 bg-black text-center text-white">
        <h2 className="inline-block text-2xl md:text-3xl font-bold bg-white text-black px-8 py-3 rounded-md">
          COURSE SUMMARY
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 bg-gray-900/60 rounded-md p-10 shadow-xl border border-gray-800">
          <div className="flex flex-col items-center space-y-2">
            <BookOpen className="text-red-600 w-10 h-10" />
            <h3 className="text-2xl font-bold text-red-600">50+</h3>
            <p className="text-gray-300 text-sm">Lessons</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Calendar className="text-red-600 w-10 h-10" />
            <h3 className="text-lg font-semibold">Validity</h3>
            <p className="text-red-600 text-sm">Unlimited</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Video className="text-red-600 w-10 h-10" />
            <h3 className="text-lg font-semibold">Live Course</h3>
            <p className="text-red-600 text-sm">Type</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Clock3 className="text-red-600 w-10 h-10" />
            <h3 className="text-lg font-semibold">70 Hours +</h3>
            <p className="text-red-600 text-sm">Duration</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Film className="text-red-600 w-10 h-10" />
            <h3 className="text-lg font-semibold">Get Record Video</h3>
            <p className="text-red-600 text-sm">Within 24h</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-black text-center text-white">
        <h2 className="text-2xl md:text-4xl font-bold text-red-700 mb-10">
          লাইভ কোর্স নিয়ে আপনাদের কমন কিছু প্রশ্নের উত্তর:
        </h2>

        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((item, i) => (
            <details
              key={i}
              className="group bg-white rounded-md border border-gray-800 overflow-hidden text-black"
            >
              <summary className="flex justify-between items-center cursor-pointer px-6 py-4 text-left font-semibold text-lg transition-all">
                <span>{item.q}</span>
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <div className="px-6 pb-4 text-gray-800">{item.a}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
